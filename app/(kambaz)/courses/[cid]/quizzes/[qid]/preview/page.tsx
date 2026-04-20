"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

type Question = {
  _id: string;
  title: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  points: number;
  question: string;
  choices?: { _id: string; text: string; isCorrect: boolean }[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
};

function isCorrectAnswer(question: Question, answer: any): boolean {
  if (!answer && answer !== false) return false;
  if (question.type === "MULTIPLE_CHOICE") {
    const correct = question.choices?.find((c) => c.isCorrect);
    return correct?._id === answer;
  }
  if (question.type === "TRUE_FALSE") {
    return String(answer) === String(question.correctAnswer);
  }
  if (question.type === "FILL_IN_BLANK") {
    return question.possibleAnswers?.some(
      (a) => a.toLowerCase() === String(answer).toLowerCase()
    ) ?? false;
  }
  return false;
}

function computeScore(questions: Question[], answers: Record<string, any>): number {
  return questions.reduce((sum, q) => {
    return sum + (isCorrectAnswer(q, answers[q._id]) ? q.points : 0);
  }, 0);
}

/* ──────────────────── Single Question Renderer ──────────────── */
function QuestionCard({
  question,
  index,
  answer,
  onChange,
  showResult,
  locked,
}: {
  question: Question;
  index: number;
  answer: any;
  onChange: (val: any) => void;
  showResult: boolean;
  locked: boolean;
}) {
  const correct = showResult ? isCorrectAnswer(question, answer) : null;

  return (
    <div
      className={`border rounded p-4 mb-3 ${
        showResult
          ? correct
            ? "border-success bg-success bg-opacity-10"
            : "border-danger bg-danger bg-opacity-10"
          : ""
      }`}
    >
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <input
            type="checkbox"
            className="me-2"
            readOnly
            style={{ visibility: "hidden" }}
          />
          <strong>Question {index + 1}</strong>
        </div>
        <span className="text-muted small">{question.points} pts</span>
      </div>

      <p className="mb-3">{question.question}</p>

      {/* Multiple Choice */}
      {question.type === "MULTIPLE_CHOICE" && (
        <div>
          {(question.choices || []).map((choice) => {
            const selected = answer === choice._id;
            const isRight = choice.isCorrect;
            return (
              <div key={choice._id} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`q-${question._id}`}
                  id={`choice-${choice._id}`}
                  value={choice._id}
                  checked={selected}
                  onChange={() => !locked && onChange(choice._id)}
                  disabled={locked}
                />
                <label
                  className={`form-check-label ${
                    showResult && isRight
                      ? "text-success fw-bold"
                      : showResult && selected && !isRight
                      ? "text-danger"
                      : ""
                  }`}
                  htmlFor={`choice-${choice._id}`}
                >
                  {choice.text}
                  {showResult && isRight && " ✓"}
                </label>
              </div>
            );
          })}
        </div>
      )}

      {/* True/False */}
      {question.type === "TRUE_FALSE" && (
        <div>
          {["true", "false"].map((val) => {
            const selected = String(answer) === val;
            const isRight = String(question.correctAnswer) === val;
            return (
              <div key={val} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`q-${question._id}`}
                  id={`${question._id}-${val}`}
                  value={val}
                  checked={selected}
                  onChange={() => !locked && onChange(val)}
                  disabled={locked}
                />
                <label
                  className={`form-check-label ${
                    showResult && isRight
                      ? "text-success fw-bold"
                      : showResult && selected && !isRight
                      ? "text-danger"
                      : ""
                  }`}
                  htmlFor={`${question._id}-${val}`}
                >
                  {val === "true" ? "True" : "False"}
                  {showResult && isRight && " ✓"}
                </label>
              </div>
            );
          })}
        </div>
      )}

      {/* Fill in the Blank */}
      {question.type === "FILL_IN_BLANK" && (
        <div>
          <input
            className={`form-control ${
              showResult
                ? correct
                  ? "is-valid"
                  : "is-invalid"
                : ""
            }`}
            type="text"
            value={answer || ""}
            onChange={(e) => !locked && onChange(e.target.value)}
            disabled={locked}
            placeholder="Type your answer here..."
            style={{ maxWidth: 300 }}
          />
          {showResult && !correct && (
            <div className="text-success small mt-1">
              Correct answer: {question.possibleAnswers?.[0]}
            </div>
          )}
        </div>
      )}

      {/* Result badge */}
      {showResult && (
        <div className="mt-2">
          <span className={`badge ${correct ? "bg-success" : "bg-danger"}`}>
            {correct ? `+${question.points} pts` : "0 pts"}
          </span>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Main Page ────────────────────────── */
export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>(null);

  const role = ((currentUser as any)?.role || "").toUpperCase();
  const isFaculty = role === "FACULTY" || role === "ADMIN";
  const isStudent = role === "STUDENT" || role === "USER";

  useEffect(() => {
    const load = async () => {
      try {
        const q = await client.findQuizById(qid);
        setQuiz(q);
        if (isStudent) {
          try {
            const all = await client.findAttempts(qid);
            setAttempts(all || []);
            const last = await client.findLastAttempt(qid);
            setLastAttempt(last);
          } catch {}
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, [qid, isStudent]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  const questions: Question[] = quiz.questions || [];
  const totalPoints = questions.reduce((s: number, q: Question) => s + q.points, 0);
  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const attemptsUsed = attempts.length;
  const canTake = isStudent && attemptsUsed < maxAttempts;
  const oneAtATime = quiz.oneQuestionAtATime;

  /* ── If student already exhausted attempts, show last attempt results ── */
  if (isStudent && !canTake && lastAttempt) {
    return (
      <div className="p-4">
        <div className="alert alert-warning mb-3">
          You have used all {maxAttempts} attempt(s). Showing your last attempt.
        </div>
        <h4 className="mb-1">{quiz.title}</h4>
        <div className="mb-3 text-muted small">
          Submitted: {new Date(lastAttempt.submittedAt).toLocaleString()}
        </div>
        <div className="alert alert-info">
          <strong>Score: {lastAttempt.score} / {totalPoints} pts</strong>
        </div>
        {questions.map((q, idx) => (
          <QuestionCard
            key={q._id}
            question={q}
            index={idx}
            answer={lastAttempt.answers?.[q._id]}
            onChange={() => {}}
            showResult={true}
            locked={true}
          />
        ))}
        <button
          className="btn btn-secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
        >
          Back to Quiz Details
        </button>
      </div>
    );
  }

  /* ── After submission ── */
  if (submitted) {
    return (
      <div className="p-4">
        {isFaculty && (
          <div className="alert alert-info mb-3">
            This is a preview. Faculty answers are not saved.
          </div>
        )}
        <h4 className="mb-1">{quiz.title}</h4>
        <div className="alert alert-success mb-3">
          <strong>
            Score: {score} / {totalPoints} pts
          </strong>
          <span className="ms-3 text-muted small">
            ({Math.round((score / (totalPoints || 1)) * 100)}%)
          </span>
        </div>

        <h5 className="mb-3">Review Your Answers</h5>
        {questions.map((q, idx) => (
          <QuestionCard
            key={q._id}
            question={q}
            index={idx}
            answer={answers[q._id]}
            onChange={() => {}}
            showResult={true}
            locked={true}
          />
        ))}

        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Back to Quiz Details
          </button>
          {isFaculty && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
            >
              Keep Editing This Quiz
            </button>
          )}
          {isStudent && canTake && (
            <button
              className="btn btn-danger"
              onClick={() => {
                setAnswers({});
                setCurrentQIdx(0);
                setSubmitted(false);
              }}
            >
              Retake Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Handle submit ── */
  const handleSubmit = async () => {
    const finalScore = computeScore(questions, answers);
    setScore(finalScore);

    if (isStudent) {
      try {
        const attempt = await client.submitAttempt(qid, {
          answers,
          score: finalScore,
        });
        setAttempts((prev) => [...prev, attempt]);
        setLastAttempt(attempt);
      } catch {}
    }
    setSubmitted(true);
  };

  const setAnswer = (qid: string, val: any) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  /* ── One at a time rendering ── */
  if (oneAtATime && questions.length > 0) {
    const q = questions[currentQIdx];
    const isLast = currentQIdx === questions.length - 1;
    return (
      <div className="p-4">
        {isFaculty && (
          <div className="alert alert-warning small mb-3">
            This is a preview of the published version of the quiz.
          </div>
        )}
        {isStudent && lastAttempt && (
          <div className="alert alert-info small mb-3">
            Attempt {attemptsUsed + 1} of {maxAttempts}
          </div>
        )}
        <h4 className="mb-3">{quiz.title}</h4>
        {quiz.description && (
          <div className="mb-3 text-muted small">{quiz.description}</div>
        )}

        <QuestionCard
          question={q}
          index={currentQIdx}
          answer={answers[q._id]}
          onChange={(val) => setAnswer(q._id, val)}
          showResult={false}
          locked={false}
        />

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            {currentQIdx > 0 && (
              <button
                className="btn btn-secondary me-2"
                onClick={() => setCurrentQIdx((i) => i - 1)}
              >
                ← Back
              </button>
            )}
          </div>
          <span className="text-muted small">
            Question {currentQIdx + 1} of {questions.length}
          </span>
          <div>
            {!isLast && (
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentQIdx((i) => i + 1)}
              >
                Next →
              </button>
            )}
            {isLast && (
              <button className="btn btn-danger" onClick={handleSubmit}>
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 text-muted small border-top pt-3">
          Quiz saved at {new Date().toLocaleTimeString()}
        </div>

        {isFaculty && (
          <div className="mt-2">
            <button
              className="btn btn-sm btn-link text-muted"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
            >
              ✎ Keep Editing This Quiz
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ── All questions at once ── */
  return (
    <div className="p-4">
      {isFaculty && (
        <div className="alert alert-warning small mb-3">
          This is a preview of the published version of the quiz.
        </div>
      )}
      {isStudent && attemptsUsed > 0 && (
        <div className="alert alert-info small mb-3">
          Attempt {attemptsUsed + 1} of {maxAttempts}
        </div>
      )}

      <h4 className="mb-1">{quiz.title}</h4>
      {quiz.description && (
        <div className="mb-3 text-muted small">{quiz.description}</div>
      )}

      {questions.length === 0 && (
        <div className="text-muted border rounded p-3">
          This quiz has no questions yet.
        </div>
      )}

      {questions.map((q, idx) => (
        <QuestionCard
          key={q._id}
          question={q}
          index={idx}
          answer={answers[q._id]}
          onChange={(val) => setAnswer(q._id, val)}
          showResult={false}
          locked={false}
        />
      ))}

      {questions.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
          <span className="text-muted small">
            Quiz saved at {new Date().toLocaleTimeString()}
          </span>
          <button className="btn btn-danger" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      )}

      {isFaculty && (
        <div className="mt-3">
          <button
            className="btn btn-sm btn-link text-muted"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            Keep Editing This Quiz
          </button>
        </div>
      )}
    </div>
  );
}