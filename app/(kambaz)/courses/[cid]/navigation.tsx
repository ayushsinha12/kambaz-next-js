"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const hrefFor = (label: string) => {
    const base = `/courses/${cid}`;
    if (label === "Home") return `${base}/home`;
    if (label === "People") return `${base}/people/table`; // matches your folder: people/table
    return `${base}/${label.toLowerCase()}`;
  };

  const isActive = (label: string) => {
    const href = hrefFor(label);
    return pathname === href;
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => (
        <Link
          key={label}
          href={hrefFor(label)}
          id={`wd-course-${label.toLowerCase()}-link`}
          className={`list-group-item border-0 ${
            isActive(label) ? "active" : "text-danger"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}