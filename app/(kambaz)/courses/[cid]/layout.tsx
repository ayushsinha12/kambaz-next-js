import type { ReactNode } from "react";
import CourseNavigation from "./navigation";

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  // You don't have to use cid yet, but this keeps types correct in Next 16
  await params;

  return (
    <div className="row">
      <div className="col-2">
        <CourseNavigation />
      </div>
      <div className="col-10">{children}</div>
    </div>
  );
}