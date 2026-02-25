import "./classes.css";

export default function Classes() {
  const color = "blue";
  const dangerous = true;

  return (
    <div id="wd-classes">
      <h2>Classes</h2>

      {/* Static examples */}
      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>

      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background
      </div>

      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background
      </div>

      <hr />

      {/* Dynamic background using color constant */}
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>

      {/* Conditional background using dangerous constant */}
      <div
        className={`${
          dangerous ? "wd-bg-red" : "wd-bg-green"
        } wd-fg-black wd-padding-10px`}
      >
        Dangerous background
      </div>
    </div>
  );
}