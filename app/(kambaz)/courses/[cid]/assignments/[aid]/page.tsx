"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignment = db.assignments.find(
    (a) => a._id === aid && a.course === cid
  );

  if (!assignment) {
    return <div id="wd-assignments-editor">Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" defaultValue={assignment.title} />
      <br />
      <br />

      <textarea
        id="wd-description"
        cols={50}
        rows={10}
        defaultValue={assignment.description}
      />
      <br />
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={assignment.points} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label>Online Entry Options</label>
            </td>
            <td>
              <label htmlFor="wd-text-entry">
                <input id="wd-text-entry" type="checkbox" /> Text Entry
              </label>
              <br />
              <label htmlFor="wd-website-url">
                <input id="wd-website-url" type="checkbox" defaultChecked /> Website URL
              </label>
              <br />
              <label htmlFor="wd-media-recordings">
                <input id="wd-media-recordings" type="checkbox" /> Media Recordings
              </label>
              <br />
              <label htmlFor="wd-student-annotation">
                <input id="wd-student-annotation" type="checkbox" /> Student Annotation
              </label>
              <br />
              <label htmlFor="wd-file-uploads">
                <input id="wd-file-uploads" type="checkbox" /> File Uploads
              </label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue={assignment.dueDate} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input
                id="wd-available-from"
                type="date"
                defaultValue={assignment.availableFrom}
              />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input
                id="wd-available-until"
                type="date"
                defaultValue={assignment.availableUntil}
              />
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <Link
                href={`/courses/${cid}/assignments`}
                className="btn btn-light me-2"
              >
              Cancel
              </Link>

              <Link
                href={`/courses/${cid}/assignments`}
                className="btn btn-danger"
              >
                Save
              </Link>
            </td>
          </tr>


        </tbody>
      </table>
    </div>
  );
}