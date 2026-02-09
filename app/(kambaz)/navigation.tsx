"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const linkBase =
    "text-decoration-none d-flex flex-column align-items-center justify-content-center";
  const itemBase = "border-0 text-center bg-black";
  const activeItem = "bg-white";
  const inactiveItem = "bg-black";
  const activeText = "text-danger";
  const inactiveText = "text-white";

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem
        className={`${itemBase} ${isActive("/account") ? activeItem : inactiveItem}`}
      >
        <Link
          href="/account"
          id="wd-account-link"
          className={`${linkBase} ${inactiveText}`}
        >
          <FaRegCircleUser className="fs-1 text-white" />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`${itemBase} ${isActive("/dashboard") ? activeItem : inactiveItem}`}
      >
        <Link
          href="/dashboard"
          id="wd-dashboard-link"
          className={`${linkBase} ${isActive("/dashboard") ? activeText : inactiveText}`}
        >
          <AiOutlineDashboard
            className={`fs-1 ${isActive("/dashboard") ? "text-danger" : "text-white"}`}
          />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`${itemBase} ${isActive("/courses") ? activeItem : inactiveItem}`}
      >
        <Link
          href="/courses"
          id="wd-course-link"
          className={`${linkBase} ${isActive("/courses") ? activeText : inactiveText}`}
        >
          <LiaBookSolid
            className={`fs-1 ${isActive("/courses") ? "text-danger" : "text-white"}`}
          />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`${itemBase} ${isActive("/calendar") ? activeItem : inactiveItem}`}
      >
        <Link
          href="/calendar"
          id="wd-calendar-link"
          className={`${linkBase} ${isActive("/calendar") ? activeText : inactiveText}`}
        >
          <IoCalendarOutline
            className={`fs-1 ${isActive("/calendar") ? "text-danger" : "text-white"}`}
          />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`${itemBase} ${isActive("/inbox") ? activeItem : inactiveItem}`}
      >
        <Link
          href="/inbox"
          id="wd-inbox-link"
          className={`${linkBase} ${isActive("/inbox") ? activeText : inactiveText}`}
        >
          <FaInbox
            className={`fs-1 ${isActive("/inbox") ? "text-danger" : "text-white"}`}
          />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`${itemBase} ${isActive("/labs") ? activeItem : inactiveItem}`}
      >
        <Link
          href="/labs"
          id="wd-labs-link"
          className={`${linkBase} ${isActive("/labs") ? activeText : inactiveText}`}
        >
          <LiaCogSolid
            className={`fs-1 ${isActive("/labs") ? "text-danger" : "text-white"}`}
          />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}