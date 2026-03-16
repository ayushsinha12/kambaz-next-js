"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const dispatch = useDispatch();

  const removeAssignment = (assignmentId: string) => {
    const ok = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (!ok) return;
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: 400 }}>
          <FormControl placeholder="Search..." />
        </InputGroup>

        <div className="d-flex gap-2">
          <Button variant="secondary">+ Group</Button>
          <Link
            href={`/courses/${cid}/assignments/new`}
            className="btn btn-danger"
          >
            + Assignment
          </Link>
        </div>
      </div>

      <ListGroup className="rounded-0">
        {assignments
          .filter((a: any) => a.course === cid)
          .map((a: any) => (
            <ListGroupItem
              key={a._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <Link
                  href={`/courses/${cid}/assignments/${a._id}`}
                  className="text-decoration-none"
                >
                  {a.title}
                </Link>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="text-muted small">{a._id}</div>
                <Button
                  variant="danger"
                  onClick={() => removeAssignment(a._id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}