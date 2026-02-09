// app/(kambaz)/courses/[cid]/assignments/[aid]/page.tsx
import Link from "next/link";
import { Button, Col, Form, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignment-editor" className="p-3">
      <Form>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl className="mb-3" defaultValue="A1" />

        <FormControl
          as="textarea"
          className="mb-3"
          style={{ height: "180px" }}
          defaultValue={
`The assignment is available online
Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`
          }
        />

        <Row className="mb-3 align-items-center">
          <Col sm={3}>
            <FormLabel className="mb-0">Points</FormLabel>
          </Col>
          <Col sm={9}>
            <FormControl type="number" defaultValue={100} />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col sm={3}>
            <FormLabel className="mb-0">Assignment Group</FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect>
              <option value="ASSIGNMENTS" defaultChecked>
                ASSIGNMENTS
              </option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="PROJECTS">PROJECTS</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col sm={3}>
            <FormLabel className="mb-0">Display Grade as</FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect>
              <option value="PERCENTAGE" defaultChecked>
                Percentage
              </option>
              <option value="POINTS">Points</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <Col sm={3}>
            <FormLabel className="mb-0">Submission Type</FormLabel>
          </Col>
          <Col sm={9}>
            <FormSelect>
              <option value="ONLINE" defaultChecked>
                Online
              </option>
              <option value="ON_PAPER">On Paper</option>
            </FormSelect>
          </Col>
        </Row>

        <div className="border p-3 mb-3">
          <FormLabel className="fw-bold">Online Entry Options</FormLabel>

          <div>
            <input type="checkbox" className="me-2" />
            <label>Text Entry</label>
          </div>

          <div>
            <input type="checkbox" className="me-2" defaultChecked />
            <label>Website URL</label>
          </div>

          <div>
            <input type="checkbox" className="me-2" />
            <label>Media Recordings</label>
          </div>

          <div>
            <input type="checkbox" className="me-2" />
            <label>Student Annotation</label>
          </div>

          <div>
            <input type="checkbox" className="me-2" />
            <label>File Uploads</label>
          </div>
        </div>

        <div className="border p-3 mb-3">
          <Row className="mb-3 align-items-center">
            <Col sm={3}>
              <FormLabel className="mb-0">Assign</FormLabel>
            </Col>
            <Col sm={9}>
              <FormLabel>Assign to</FormLabel>
              <FormControl defaultValue="Everyone" className="mb-2" />

              <FormLabel>Due</FormLabel>
              <FormControl type="date" className="mb-2" defaultValue="2024-05-13" />

              <Row>
                <Col>
                  <FormLabel>Available from</FormLabel>
                  <FormControl type="date" defaultValue="2024-05-06" />
                </Col>
                <Col>
                  <FormLabel>Until</FormLabel>
                  <FormControl type="date" defaultValue="2024-05-13" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Link href=".." className="btn btn-light">
            Cancel
          </Link>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}