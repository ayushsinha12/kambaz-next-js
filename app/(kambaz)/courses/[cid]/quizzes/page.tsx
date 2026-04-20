"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import { RootState } from "../../../store";
import {
  setQuizzes,
  deleteQuiz as deleteQuizAction,
  updateQuiz,
  addQuiz,
} from "./reducer";
import * as client from "./client";

function getAvailabilityStatus(quiz: any): string {
  const now = new Date();
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  if (until && now > until) return "Closed";
  if (available && now < available) {
    return `Not available until ${available.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })}`;
  }
  return "Available";
}

function formatDueDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number | null>>({});

  const role = ((currentUser as any)?.role || "").toUpperCase();
  const isFaculty = role === "FACULTY" || role === "ADMIN";
  const isStudent = role === "STUDENT" || role === "USER";

  const courseQuizzes = quizzes.filter((q: any) => q.course === cid);

  useEffect(() => {
    client
      .findQuizzesForCourse(cid)
      .then((data) => dispatch(setQuizzes(data)))
      .catch(() => {});
  }, [cid]);

  useEffect(() => {
    if (!isStudent || courseQuizzes.length === 0) return;
    courseQuizzes.forEach(async (quiz: any) => {
      try {
        const attempt = await client.findLastAttempt(quiz._id);
        if (attempt) {
          setScores((prev) => ({ ...prev, [quiz._id]: attempt.score }));
        }
      } catch {}
    });
  }, [courseQuizzes.length, isStudent]);

  const handleAddQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(cid, { course: cid });
      dispatch(addQuiz(newQuiz));
      router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
    } catch {}
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuizAction(quizId));
    } catch {}
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    try {
      await client.updateQuiz(updated);
      dispatch(updateQuiz(updated));
    } catch {}
  };

  return (
    <div id="wd-quizzes" className="p-3">
      {/* Top controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          className="form-control"
          style={{ maxWidth: 300 }}
          placeholder="Search for Quiz"
        />
        {isFaculty && (
          <div className="d-flex gap-2">
            <button className="btn btn-danger" onClick={handleAddQuiz}>
              + Quiz
            </button>
            <button className="btn btn-secondary">
              <BsThreeDotsVertical />
            </button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {courseQuizzes.length === 0 && (
        <div className="text-center p-5 text-muted border rounded">
          <p className="mb-1">No quizzes yet.</p>
          {isFaculty && (
            <p className="mb-0">
              Click <strong>+ Quiz</strong> above to add a new quiz.
            </p>
          )}
        </div>
      )}

      {/* Quiz list */}
      {courseQuizzes.length > 0 && (
        <div className="border rounded">
          {/* Group header */}
          <div className="bg-light p-3 fw-bold border-bottom d-flex align-items-center">
            <span className="me-2">&#9660;</span> Assignment Quizzes
          </div>

          {courseQuizzes.map((quiz: any) => {
            const availability = getAvailabilityStatus(quiz);
            return (
              <div
                key={quiz._id}
                className="d-flex align-items-start border-bottom p-3 position-relative"
                style={{ borderLeft: "4px solid #28a745" }}
              >
                {/* Publish toggle icon */}
                <div className="me-3 mt-1">
                  <span
                    style={{ cursor: isFaculty ? "pointer" : "default" }}
                    onClick={() => isFaculty && handleTogglePublish(quiz)}
                    title={
                      quiz.published
                        ? "Published — click to unpublish"
                        : "Unpublished — click to publish"
                    }
                  >
                    {quiz.published ? (
                      <FaCheckCircle className="text-success fs-5" />
                    ) : (
                      <FaBan className="text-secondary fs-5" />
                    )}
                  </span>
                </div>

                {/* Quiz info */}
                <div className="flex-fill">
                  <Link
                    href={`/courses/${cid}/quizzes/${quiz._id}`}
                    className="fw-bold text-decoration-none text-dark"
                  >
                    {quiz.title}
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="me-1">
                      <strong>
                        {availability === "Available" ? (
                          <span className="text-success">Available</span>
                        ) : availability === "Closed" ? (
                          <span className="text-danger">Closed</span>
                        ) : (
                          <span>{availability}</span>
                        )}
                      </strong>
                    </span>
                    {quiz.dueDate && (
                      <span className="me-1">
                        {" "}| <strong>Due</strong> {formatDueDate(quiz.dueDate)}
                      </span>
                    )}
                    <span className="me-1"> | {quiz.points} pts</span>
                    <span> | {quiz.questions?.length || 0} Questions</span>
                    {isStudent && scores[quiz._id] !== undefined && scores[quiz._id] !== null && (
                      <span className="ms-2 text-primary">
                        {" "}| <strong>Score: {scores[quiz._id]}/{quiz.points}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Faculty context menu */}
                {isFaculty && (
                  <div className="d-flex align-items-center ms-2">
                    <div className="position-relative">
                      <button
                        className="btn btn-sm btn-light border"
                        onClick={() =>
                          setOpenMenu(openMenu === quiz._id ? null : quiz._id)
                        }
                      >
                        <BsThreeDotsVertical />
                      </button>
                      {openMenu === quiz._id && (
                        <div
                          className="position-absolute end-0 bg-white border rounded shadow-sm"
                          style={{ zIndex: 1000, minWidth: 140 }}
                        >
                          <button
                            className="dropdown-item py-2"
                            onClick={() => {
                              setOpenMenu(null);
                              router.push(
                                `/courses/${cid}/quizzes/${quiz._id}/edit`
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="dropdown-item py-2"
                            onClick={() => {
                              setOpenMenu(null);
                              handleDeleteQuiz(quiz._id);
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="dropdown-item py-2"
                            onClick={() => {
                              setOpenMenu(null);
                              handleTogglePublish(quiz);
                            }}
                          >
                            {quiz.published ? "Unpublish" : "Publish"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}