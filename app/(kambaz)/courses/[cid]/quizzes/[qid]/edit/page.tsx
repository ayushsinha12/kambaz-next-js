"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { updateQuiz as updateQuizAction } from "../../reducer";
import * as client from "../../client";

/* ─────────────────────────── Types ─────────────────────────── */
type Choice = { _id: string; text: string; isCorrect: boolean };
type Question = {
  _id: string;
  title: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  points: number;
  question: string;
  choices?: Choice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
};

/* ──────────────────── Question Editor Component ──────────────── */
function QuestionEditor({
  question,
  onSave,
  onCancel,
}: {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<Question>({ ...question });

  const setType = (type: Question["type"]) => {
    const base = { ...q, type };
    if (type === "MULTIPLE_CHOICE") {
      base.choices = base.choices?.length
        ? base.choices
        : [
            { _id: uuidv4(), text: "", isCorrect: true },
            { _id: uuidv4(), text: "", isCorrect: false },
          ];
      delete (base as any).correctAnswer;
      delete (base as any).possibleAnswers;
    } else if (type === "TRUE_FALSE") {
      base.correctAnswer =
        base.correctAnswer !== undefined ? base.correctAnswer : true;
      delete (base as any).choices;
      delete (base as any).possibleAnswers;
    } else if (type === "FILL_IN_BLANK") {
      base.possibleAnswers = base.possibleAnswers?.length
        ? base.possibleAnswers
        : [""];
      delete (base as any).choices;
      delete (base as any).correctAnswer;
    }
    setQ(base);
  };

  const addChoice = () => {
    setQ({
      ...q,
      choices: [...(q.choices || []), { _id: uuidv4(), text: "", isCorrect: false }],
    });
  };

  const removeChoice = (id: string) => {
    setQ({ ...q, choices: (q.choices || []).filter((c) => c._id !== id) });
  };

  const setCorrectChoice = (id: string) => {
    setQ({
      ...q,
      choices: (q.choices || []).map((c) => ({ ...c, isCorrect: c._id === id })),
    });
  };

  const addPossibleAnswer = () => {
    setQ({ ...q, possibleAnswers: [...(q.possibleAnswers || []), ""] });
  };

  const removePossibleAnswer = (idx: number) => {
    const arr = [...(q.possibleAnswers || [])];
    arr.splice(idx, 1);
    setQ({ ...q, possibleAnswers: arr });
  };

  return (
    <div className="border rounded p-3 mb-3 bg-light">
      <div className="row g-2 mb-3 align-items-center">
        <div className="col-auto">
          <input
            className="form-control"
            placeholder="Question Title"
            value={q.title}
            onChange={(e) => setQ({ ...q, title: e.target.value })}
            style={{ width: 180 }}
          />
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={q.type}
            onChange={(e) => setType(e.target.value as Question["type"])}
            style={{ width: 200 }}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_BLANK">Fill in the Blank</option>
          </select>
        </div>
        <div className="col-auto d-flex align-items-center gap-1">
          <label className="mb-0 small">pts:</label>
          <input
            className="form-control"
            type="number"
            min={0}
            value={q.points}
            onChange={(e) => setQ({ ...q, points: Number(e.target.value) })}
            style={{ width: 70 }}
          />
        </div>
      </div>

      {/* Question text */}
      <div className="mb-3">
        <label className="form-label fw-semibold small">Question:</label>
        <textarea
          className="form-control"
          rows={3}
          value={q.question}
          onChange={(e) => setQ({ ...q, question: e.target.value })}
          placeholder="Enter your question text here..."
        />
      </div>

      {/* Multiple choice */}
      {q.type === "MULTIPLE_CHOICE" && (
        <div className="mb-3">
          <label className="form-label fw-semibold small">Answers:</label>
          {(q.choices || []).map((choice) => (
            <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
              <input
                type="radio"
                name={`correct-${q._id}`}
                checked={choice.isCorrect}
                onChange={() => setCorrectChoice(choice._id)}
                title="Mark as correct answer"
              />
              <input
                className="form-control"
                value={choice.text}
                onChange={(e) =>
                  setQ({
                    ...q,
                    choices: (q.choices || []).map((c) =>
                      c._id === choice._id ? { ...c, text: e.target.value } : c
                    ),
                  })
                }
                placeholder={choice.isCorrect ? "Correct Answer" : "Possible Answer"}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeChoice(choice._id)}
                disabled={(q.choices || []).length <= 2}
              >
                🗑
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-link p-0"
            onClick={addChoice}
          >
            + Add Another Answer
          </button>
        </div>
      )}

      {/* True/False */}
      {q.type === "TRUE_FALSE" && (
        <div className="mb-3">
          <label className="form-label fw-semibold small">Correct Answer:</label>
          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`tf-${q._id}`}
                id={`tf-true-${q._id}`}
                checked={q.correctAnswer === true}
                onChange={() => setQ({ ...q, correctAnswer: true })}
              />
              <label className="form-check-label" htmlFor={`tf-true-${q._id}`}>
                True
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`tf-${q._id}`}
                id={`tf-false-${q._id}`}
                checked={q.correctAnswer === false}
                onChange={() => setQ({ ...q, correctAnswer: false })}
              />
              <label className="form-check-label" htmlFor={`tf-false-${q._id}`}>
                False
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Fill in the blank */}
      {q.type === "FILL_IN_BLANK" && (
        <div className="mb-3">
          <label className="form-label fw-semibold small">
            Possible Correct Answers (case insensitive):
          </label>
          {(q.possibleAnswers || []).map((ans, idx) => (
            <div key={idx} className="d-flex align-items-center gap-2 mb-2">
              <input
                className="form-control"
                value={ans}
                onChange={(e) => {
                  const arr = [...(q.possibleAnswers || [])];
                  arr[idx] = e.target.value;
                  setQ({ ...q, possibleAnswers: arr });
                }}
                placeholder="Possible Answer"
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => removePossibleAnswer(idx)}
                disabled={(q.possibleAnswers || []).length <= 1}
              >
                🗑
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-link p-0"
            onClick={addPossibleAnswer}
          >
            + Add Another Answer
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="d-flex gap-2 mt-2">
        <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onSave(q)}
        >
          Update Question
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── Question List Item ──────────────────── */
function QuestionListItem({
  question,
  index,
  onEdit,
  onDelete,
}: {
  question: Question;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const typeLabel =
    question.type === "MULTIPLE_CHOICE"
      ? "Multiple Choice"
      : question.type === "TRUE_FALSE"
      ? "True/False"
      : "Fill in the Blank";

  return (
    <div className="border rounded p-3 mb-2 d-flex justify-content-between align-items-start">
      <div>
        <span className="fw-semibold me-2">Q{index + 1}:</span>
        <span className="me-2">{question.title || "(Untitled)"}</span>
        <span className="badge bg-secondary me-2">{typeLabel}</span>
        <span className="small text-muted">{question.points} pts</span>
        {question.question && (
          <div className="small text-muted mt-1">{question.question}</div>
        )}
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-secondary" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
          🗑
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── Main Editor ───────────────────────── */
export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");
  const [editingQIdx, setEditingQIdx] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question | null>(null);

  useEffect(() => {
    client
      .findQuizById(qid)
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [qid]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  const totalPoints = (quiz.questions || []).reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0
  );

  /* ── Save handlers ── */
  const handleSave = async () => {
    try {
      const updated = await client.updateQuiz({ ...quiz, points: totalPoints });
      dispatch(updateQuizAction(updated));
      router.push(`/courses/${cid}/quizzes/${qid}`);
    } catch {}
  };

  const handleSaveAndPublish = async () => {
    try {
      const updated = await client.updateQuiz({
        ...quiz,
        points: totalPoints,
        published: true,
      });
      dispatch(updateQuizAction(updated));
      router.push(`/courses/${cid}/quizzes`);
    } catch {}
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  /* ── Question handlers ── */
  const handleAddQuestion = () => {
    const q: Question = {
      _id: uuidv4(),
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: [
        { _id: uuidv4(), text: "", isCorrect: true },
        { _id: uuidv4(), text: "", isCorrect: false },
      ],
    };
    setNewQuestion(q);
    setEditingQIdx(null);
  };

  const handleSaveNewQuestion = (q: Question) => {
    setQuiz({ ...quiz, questions: [...(quiz.questions || []), q] });
    setNewQuestion(null);
  };

  const handleSaveEditedQuestion = (idx: number, q: Question) => {
    const updated = [...(quiz.questions || [])];
    updated[idx] = q;
    setQuiz({ ...quiz, questions: updated });
    setEditingQIdx(null);
  };

  const handleDeleteQuestion = (idx: number) => {
    const updated = [...(quiz.questions || [])];
    updated.splice(idx, 1);
    setQuiz({ ...quiz, questions: updated });
    if (editingQIdx === idx) setEditingQIdx(null);
  };

  /* ─────────────────────── Render ─────────────────────────── */
  return (
    <div id="wd-quiz-editor" className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small">Points {totalPoints}</span>
        <div className="d-flex align-items-center gap-2">
          <span
            className={`badge ${quiz.published ? "bg-success" : "bg-secondary"}`}
          >
            {quiz.published ? "Published" : "Not Published"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {/* ── Details Tab ── */}
      {activeTab === "details" && (
        <div>
          {/* Title */}
          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              placeholder="Quiz Title"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Quiz Instructions</label>
            <textarea
              className="form-control"
              rows={5}
              value={quiz.description || ""}
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
              placeholder="Enter quiz instructions..."
            />
          </div>

          <div className="row">
            {/* Left column */}
            <div className="col-md-6">
              {/* Quiz Type */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-5 col-form-label text-end">
                  Quiz Type
                </label>
                <div className="col-sm-7">
                  <select
                    className="form-select"
                    value={quiz.quizType}
                    onChange={(e) =>
                      setQuiz({ ...quiz, quizType: e.target.value })
                    }
                  >
                    <option value="GRADED_QUIZ">Graded Quiz</option>
                    <option value="PRACTICE_QUIZ">Practice Quiz</option>
                    <option value="GRADED_SURVEY">Graded Survey</option>
                    <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                  </select>
                </div>
              </div>

              {/* Assignment Group */}
              <div className="mb-3 row align-items-center">
                <label className="col-sm-5 col-form-label text-end">
                  Assignment Group
                </label>
                <div className="col-sm-7">
                  <select
                    className="form-select"
                    value={quiz.assignmentGroup}
                    onChange={(e) =>
                      setQuiz({ ...quiz, assignmentGroup: e.target.value })
                    }
                  >
                    <option value="QUIZZES">QUIZZES</option>
                    <option value="EXAMS">EXAMS</option>
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="PROJECT">PROJECT</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right column — Options */}
            <div className="col-md-6">
              <div className="border rounded p-3">
                <div className="fw-semibold mb-2">Options</div>

                {/* Shuffle Answers */}
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="shuffle"
                    checked={quiz.shuffleAnswers}
                    onChange={(e) =>
                      setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                    }
                  />
                  <label className="form-check-label" htmlFor="shuffle">
                    Shuffle Answers
                  </label>
                </div>

                {/* Time Limit */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="timeLimit"
                    checked={!!quiz.timeLimit}
                    onChange={(e) =>
                      setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })
                    }
                  />
                  <label className="form-check-label" htmlFor="timeLimit">
                    Time Limit
                  </label>
                  {!!quiz.timeLimit && (
                    <>
                      <input
                        className="form-control form-control-sm"
                        type="number"
                        min={1}
                        value={quiz.timeLimit}
                        onChange={(e) =>
                          setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
                        }
                        style={{ width: 70 }}
                      />
                      <span className="small">Minutes</span>
                    </>
                  )}
                </div>

                {/* Multiple Attempts */}
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="multipleAttempts"
                    checked={quiz.multipleAttempts}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        multipleAttempts: e.target.checked,
                        howManyAttempts: e.target.checked ? quiz.howManyAttempts || 2 : 1,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="multipleAttempts">
                    Allow Multiple Attempts
                  </label>
                </div>
                {quiz.multipleAttempts && (
                  <div className="d-flex align-items-center gap-2 mb-2 ps-4">
                    <label className="form-label mb-0 small">How Many Attempts:</label>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      min={1}
                      value={quiz.howManyAttempts}
                      onChange={(e) =>
                        setQuiz({ ...quiz, howManyAttempts: Number(e.target.value) })
                      }
                      style={{ width: 70 }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          
          <div className="mt-3">
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label text-end small">
                Show Correct Answers
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  value={quiz.showCorrectAnswers}
                  onChange={(e) =>
                    setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                  }
                >
                  <option value="immediately">Immediately</option>
                  <option value="after_due">After Due Date</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label text-end small">
                Access Code
              </label>
              <div className="col-sm-4">
                <input
                  className="form-control"
                  value={quiz.accessCode || ""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, accessCode: e.target.value })
                  }
                  placeholder="Leave blank for no access code"
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label text-end small">
                One Question at a Time
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  value={quiz.oneQuestionAtATime ? "yes" : "no"}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      oneQuestionAtATime: e.target.value === "yes",
                    })
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label text-end small">
                Webcam Required
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  value={quiz.webcamRequired ? "yes" : "no"}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      webcamRequired: e.target.value === "yes",
                    })
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label text-end small">
                Lock Questions After Answering
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  value={quiz.lockQuestionsAfterAnswering ? "yes" : "no"}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      lockQuestionsAfterAnswering: e.target.value === "yes",
                    })
                  }
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border rounded p-3 mt-3" style={{ maxWidth: 500 }}>
            <div className="fw-semibold mb-2">Assign</div>
            <div className="mb-3">
              <label className="form-label small">Due</label>
              <input
                className="form-control"
                type="date"
                value={quiz.dueDate || ""}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
              />
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label small">Available from</label>
                <input
                  className="form-control"
                  type="date"
                  value={quiz.availableDate || ""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableDate: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label className="form-label small">Until</label>
                <input
                  className="form-control"
                  type="date"
                  value={quiz.untilDate || ""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, untilDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <div>
          <div className="d-flex justify-content-end mb-3 align-items-center">
            <span className="me-auto text-muted small">
              Points: {totalPoints}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleAddQuestion}
            >
              + New Question
            </button>
          </div>

          {newQuestion && (
            <QuestionEditor
              question={newQuestion}
              onSave={handleSaveNewQuestion}
              onCancel={() => setNewQuestion(null)}
            />
          )}

          {(quiz.questions || []).length === 0 && !newQuestion && (
            <div className="text-center text-muted p-4 border rounded">
              No questions yet. Click <strong>+ New Question</strong> to add one.
            </div>
          )}

          {(quiz.questions || []).map((q: Question, idx: number) =>
            editingQIdx === idx ? (
              <QuestionEditor
                key={q._id}
                question={q}
                onSave={(updated) => handleSaveEditedQuestion(idx, updated)}
                onCancel={() => setEditingQIdx(null)}
              />
            ) : (
              <QuestionListItem
                key={q._id}
                question={q}
                index={idx}
                onEdit={() => setEditingQIdx(idx)}
                onDelete={() => handleDeleteQuestion(idx)}
              />
            )
          )}
        </div>
      )}

      <hr />
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-light" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-secondary" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-danger" onClick={handleSaveAndPublish}>
          Save &amp; Publish
        </button>
      </div>
    </div>
  );
}