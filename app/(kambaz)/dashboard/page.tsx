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
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addNewCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import { useState } from "react";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const course = {
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  };

  const isAdmin = (currentUser as any)?.role === "ADMIN";

  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    const user = currentUser as any;
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === user._id &&
        enrollment.course === courseId
    );
  };

  const visibleCourses = currentUser
    ? isAdmin || showAllCourses
      ? courses
      : courses.filter((course: any) => isEnrolled(course._id))
    : [];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})

        <button
          className="btn btn-primary float-end ms-2"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>

        {isAdmin && (
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => dispatch(addNewCourse(course))}
          >
            Add
          </button>
        )}
      </h2>

      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                </Link>

                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </CardTitle>

                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </CardText>

                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      href={`/courses/${course._id}/home`}
                      className="text-decoration-none"
                    >
                      <Button variant="primary">Go</Button>
                    </Link>

                    {isEnrolled(course._id) ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (!currentUser) return;
                          dispatch(
                            unenroll({
                              user: (currentUser as any)._id,
                              course: course._id,
                            })
                          );
                        }}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          if (!currentUser) return;
                          dispatch(
                            enroll({
                              user: (currentUser as any)._id,
                              course: course._id,
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