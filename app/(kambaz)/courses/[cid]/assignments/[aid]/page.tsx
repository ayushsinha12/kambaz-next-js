"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const existingAssignment = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState<any>(
    aid === "new"
      ? {
          _id: "0",
          course: cid,
          title: "",
          description: "",
          points: 100,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
        }
      : existingAssignment || {
          _id: "0",
          course: cid,
          title: "",
          description: "",
          points: 100,
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
        }
  );

  if (aid !== "new" && !existingAssignment) {
    return <div id="wd-assignments-editor">Assignment not found</div>;
  }

  const saveAssignment = () => {
    if (aid === "new") {
      dispatch(
        addAssignment({
          ...assignment,
          course: cid,
        })
      );
    } else {
      dispatch(
        updateAssignment({
          ...assignment,
          course: cid,
        })
      );
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const cancelAssignment = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input
        id="wd-name"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <br />
      <br />

      <textarea
        id="wd-description"
        cols={50}
        rows={10}
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
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
              <input
                id="wd-points"
                value={assignment.points}
                onChange={(e) =>
                  setAssignment({ ...assignment, points: e.target.value })
                }
              />
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
              <input
                id="wd-due-date"
                type="date"
                value={assignment.dueDate}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
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
                value={assignment.availableFrom}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    availableFrom: e.target.value,
                  })
                }
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
                value={assignment.availableUntil}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    availableUntil: e.target.value,
                  })
                }
              />
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <button
                onClick={cancelAssignment}
                className="btn btn-light me-2"
              >
                Cancel
              </button>

              <button
                onClick={saveAssignment}
                className="btn btn-danger"
              >
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}