import ModulesControls from "./modulesControls";
import ModuleControlButtons from "./moduleControlButtons";
import LessonControlButtons from "./lessonControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">

        {/* Week 1 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <ModuleControlButtons />
            Week 1
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <LessonControlButtons />
              LEARNING OBJECTIVES
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <LessonControlButtons />
              Introduction to the course
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <LessonControlButtons />
              Learn what is Web Development
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        {/* Week 2 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <ModuleControlButtons />
            Week 2
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <LessonControlButtons />
              LESSON 1
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <LessonControlButtons />
              LESSON 2
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        {/* Week 3 */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <ModuleControlButtons />
            Week 3
          </div>
        </ListGroupItem>

      </ListGroup>
    </div>
  );
}