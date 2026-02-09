import type { ReactNode } from "react";
import CourseNavigation from "./navigation";

export default function CourseLayout({
  children,
}: {
  children: ReactNode;
  params?: Promise<{ cid: string }>;
}) {
  return (
    <div className="row">
      <div className="col-2">
        <CourseNavigation />
      </div>
      <div className="col-10">{children}</div>
    </div>
  );
}