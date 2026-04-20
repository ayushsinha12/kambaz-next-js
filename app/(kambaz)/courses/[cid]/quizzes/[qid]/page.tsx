"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../client";

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function QuizDetails() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [quiz, setQuiz] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
            const last = await client.findLastAttempt(qid);
            setLastAttempt(last);
            const all = await client.findAttempts(qid);
            setAttempts(all || []);
          } catch {}
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, [qid, isStudent]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  const totalPoints = quiz.questions?.reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0
  ) ?? 0;

  const attemptsUsed = attempts.length;
  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const canTake = isStudent && quiz.published && attemptsUsed < maxAttempts;

  const getCorrectAnswer = (question: any, answer: any): boolean => {
    if (question.type === "MULTIPLE_CHOICE") {
      const correct = question.choices?.find((c: any) => c.isCorrect);
      return correct?._id === answer;
    }
    if (question.type === "TRUE_FALSE") {
      return String(answer) === String(question.correctAnswer);
    }
    if (question.type === "FILL_IN_BLANK") {
      return question.possibleAnswers?.some(
        (a: string) => a.toLowerCase() === String(answer).toLowerCase()
      );
    }
    return false;
  };

  return (
    <div id="wd-quiz-details" className="p-4">
      {/* Faculty action buttons */}
      {isFaculty && (
        <div className="d-flex justify-content-end gap-2 mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
          >
            Preview
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            ✎ Edit
          </button>
        </div>
      )}

      <h3 className="mb-3">{quiz.title}</h3>

      {/* Student: last attempt result */}
      {isStudent && lastAttempt && (
        <div className="alert alert-info mb-4">
          <strong>Your last score: {lastAttempt.score} / {totalPoints} pts</strong>
          <span className="ms-3 text-muted small">
            (Attempt {lastAttempt.attemptNumber} of {maxAttempts})
          </span>
        </div>
      )}

      {/* Student: last attempt answers */}
      {isStudent && lastAttempt && quiz.questions && (
        <div className="mb-4">
          <h5>Your Last Attempt Answers</h5>
          {quiz.questions.map((q: any, idx: number) => {
            const studentAnswer = lastAttempt.answers?.[q._id];
            const correct = getCorrectAnswer(q, studentAnswer);
            return (
              <div
                key={q._id}
                className={`border rounded p-3 mb-2 ${
                  correct ? "border-success bg-success bg-opacity-10" : "border-danger bg-danger bg-opacity-10"
                }`}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>Q{idx + 1}:</strong> {q.question}
                    <div className="mt-1 small">
                      <span className="me-2">
                        <strong>Your answer:</strong>{" "}
                        {q.type === "MULTIPLE_CHOICE"
                          ? q.choices?.find((c: any) => c._id === studentAnswer)?.text || "—"
                          : q.type === "TRUE_FALSE"
                          ? studentAnswer === "true" || studentAnswer === true ? "True" : "False"
                          : studentAnswer || "—"}
                      </span>
                      {!correct && (
                        <span className="text-success">
                          <strong>Correct answer:</strong>{" "}
                          {q.type === "MULTIPLE_CHOICE"
                            ? q.choices?.find((c: any) => c.isCorrect)?.text
                            : q.type === "TRUE_FALSE"
                            ? q.correctAnswer ? "True" : "False"
                            : q.possibleAnswers?.[0]}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`badge ${correct ? "bg-success" : "bg-danger"}`}>
                    {correct ? `+${q.points} pts` : "0 pts"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Student: take quiz / retake */}
      {isStudent && (
        <div className="mb-4">
          {canTake ? (
            <button
              className="btn btn-danger btn-lg"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
            >
              {lastAttempt ? "Retake Quiz" : "Start Quiz"}
            </button>
          ) : attemptsUsed >= maxAttempts ? (
            <div className="text-muted">
              You have used all {maxAttempts} attempt(s) for this quiz.
            </div>
          ) : !quiz.published ? (
            <div className="text-muted">This quiz is not yet available.</div>
          ) : null}
          {attemptsUsed > 0 && (
            <div className="text-muted small mt-2">
              Attempts used: {attemptsUsed} / {maxAttempts}
            </div>
          )}
        </div>
      )}

      {/* Quiz properties table */}
      <table className="table table-bordered" style={{ maxWidth: 600 }}>
        <tbody>
          <tr>
            <td className="text-end fw-semibold" style={{ width: 220 }}>Quiz Type</td>
            <td>
              {quiz.quizType === "GRADED_QUIZ" ? "Graded Quiz" :
               quiz.quizType === "PRACTICE_QUIZ" ? "Practice Quiz" :
               quiz.quizType === "GRADED_SURVEY" ? "Graded Survey" : "Ungraded Survey"}
            </td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Points</td>
            <td>{totalPoints}</td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Time Limit</td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className="text-end fw-semibold">How Many Attempts</td>
              <td>{quiz.howManyAttempts}</td>
            </tr>
          )}
          <tr>
            <td className="text-end fw-semibold">View Responses</td>
            <td>Always</td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Show Correct Answers</td>
            <td>
              {quiz.showCorrectAnswers === "immediately"
                ? "Immediately"
                : quiz.showCorrectAnswers || "—"}
            </td>
          </tr>
          {quiz.accessCode && (
            <tr>
              <td className="text-end fw-semibold">Access Code</td>
              <td>{quiz.accessCode}</td>
            </tr>
          )}
          <tr>
            <td className="text-end fw-semibold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-semibold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      {/* Dates table */}
      <table className="table table-bordered mt-3" style={{ maxWidth: 600 }}>
        <thead className="table-light">
          <tr>
            <th>Due</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}