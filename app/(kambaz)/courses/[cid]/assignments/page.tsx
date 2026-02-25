"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ maxWidth: 400 }}>
          <FormControl placeholder="Search..." />
        </InputGroup>

        <div className="d-flex gap-2">
          <Button variant="secondary">+ Group</Button>
          <Button variant="danger">+ Assignment</Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        {assignments
          .filter((a) => a.course === cid)
          .map((a) => (
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
              <div className="text-muted small">{a._id}</div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}