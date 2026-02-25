import type { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import * as db from "../../database";
import CourseNavigation from "./navigation";
import Breadcrumb from "./breadcrumb";

type Course = {
  id: string;
  name: string;
};

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

  const course = db.courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name}
        <br />
        <Breadcrumb course={course} />
      </h2>

      <div className="row">
        <div className="col-2">
          <CourseNavigation cid={cid} />
        </div>
        <div className="col-10">{children}</div>
      </div>
    </div>
  );
}