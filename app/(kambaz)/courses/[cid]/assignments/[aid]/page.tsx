
  export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <br />
        <input id="wd-name" defaultValue="A1 - ENV + HTML" />
        <br />
        <br />
  
        <textarea id="wd-description" cols={50} rows={10}>
          The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing
          page should include the following:
          - Your full name and section
          - Links to each of the lab assignments
          - Link to the Kanbas application
          - Links to all relevant source code repositories
          The Kanbas application should include a link to navigate back to the landing page.
        </textarea>
  
        <br />
        <br />
  
        <table>
          <tbody>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
              </td>
              <td>
                <input id="wd-points" defaultValue={100} />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
              </td>
              <td>
                <select id="wd-group">
                  <option value="ASSIGNMENTS" selected>
                    ASSIGNMENTS
                  </option>
                </select>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-display-grade">Display Grade as</label>
              </td>
              <td>
                <select id="wd-display-grade">
                  <option value="PERCENTAGE" selected>
                    Percentage
                  </option>
                </select>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
              </td>
              <td>
                <select id="wd-submission-type">
                  <option value="ONLINE" selected>
                    Online
                  </option>
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
                  <input id="wd-website-url" type="checkbox" /> Website URL
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
                <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-available-from">Available from</label>
              </td>
              <td>
                <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-available-until">Until</label>
              </td>
              <td>
                <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
              </td>
            </tr>
  
            <tr>
              <td></td>
              <td>
                <button>Cancel</button> <button>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }