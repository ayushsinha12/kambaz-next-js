"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../store";

type AccountUser = {
  role?: string;
};

export default function AccountNavigation() {
  const { currentUser }: { currentUser: AccountUser | null } = useSelector(
    (state: RootState) =>
      state.accountReducer as { currentUser: AccountUser | null }
  );
  const pathname = usePathname();

  const links = currentUser ? ["profile"] : ["signin", "signup"];

  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/account/${link}`}
            active={pathname.endsWith(link)}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      {currentUser?.role === "ADMIN" && (
        <NavItem>
          <NavLink
            as={Link}
            href="/account/users"
            active={pathname.endsWith("users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}