"use client";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../courses/reducer";
import { enroll, unenroll, setEnrollments } from "../enrollments/reducer";
import { RootState } from "../store";
import { useState, useEffect } from "react";
import * as client from "../courses/client";
import * as enrollmentsClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const role = ((currentUser as any)?.role || "").toString().toUpperCase();
  const isFaculty = role === "FACULTY" || role === "ADMIN";

  const fetchCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      if (!currentUser) return;
      const enrollments =
        await enrollmentsClient.findEnrollmentsForUser("current");
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((course: any) => course._id !== courseId))
    );
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) return course;
          else return c;
        })
      )
    );
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === (currentUser as any)._id &&
        enrollment.course === courseId
    );
  };

  const visibleCourses = currentUser
    ? isFaculty || showAllCourses
      ? courses
      : courses.filter((c: any) => isEnrolled(c._id))
    : [];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
            >
              Update
            </button>
          </h5>

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            className="mb-2"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})

        <button
          className="btn btn-primary float-end ms-2"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
      </h2>

      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((courseItem: any) => (
            <Col
              key={courseItem._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${courseItem._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={courseItem.image || "/images/reactjs.jpg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                </Link>

                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {courseItem.name}
                  </CardTitle>

                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {courseItem.description}
                  </CardText>

                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      href={`/courses/${courseItem._id}/home`}
                      className="text-decoration-none"
                    >
                      <Button variant="primary">Go</Button>
                    </Link>

                    {isFaculty ? (
                      <div className="d-flex gap-2">
                        <button
                          id="wd-edit-course-click"
                          className="btn btn-warning"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(courseItem);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(courseItem._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : isEnrolled(courseItem._id) ? (
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          if (!currentUser) return;
                          await client.unenrollFromCourse(
                            "current",
                            courseItem._id
                          );
                          dispatch(
                            unenroll({
                              user: (currentUser as any)._id,
                              course: courseItem._id,
                            })
                          );
                        }}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={async () => {
                          if (!currentUser) return;
                          await client.enrollIntoCourse(
                            "current",
                            courseItem._id
                          );
                          dispatch(
                            enroll({
                              user: (currentUser as any)._id,
                              course: courseItem._id,
                              _id: `${(currentUser as any)._id}-${courseItem._id}`,
                            })
                          );
                        }}
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}