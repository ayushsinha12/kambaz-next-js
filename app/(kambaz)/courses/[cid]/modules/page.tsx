"use client";

import { useParams } from "next/navigation";
import * as db from "../../../database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./moduleControlButtons";
import LessonControlButtons from "./lessonControlButtons";

type Lesson = { _id?: string; name: string };
type Module = {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
};

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules = db.modules as Module[];

  return (
    <ListGroup id="wd-modules" className="rounded-0">
      {modules
        .filter((module) => module.course === cid)
        .map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.name}
              <ModuleControlButtons />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson, idx) => (
                  <ListGroupItem
                    key={lesson._id ?? `${module._id}-${idx}`}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
}