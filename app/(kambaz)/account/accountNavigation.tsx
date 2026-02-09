// app/(kambaz)/account/AccountNavigation.tsx
import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/account/signin"
        id="wd-account-signin-link"
        className="list-group-item active border-0"
      >
        Signin
      </Link>

      <Link
        href="/account/signup"
        id="wd-account-signup-link"
        className="list-group-item text-danger border-0"
      >
        Signup
      </Link>

      <Link
        href="/account/profile"
        id="wd-account-profile-link"
        className="list-group-item text-danger border-0"
      >
        Profile
      </Link>

      <div className="mt-3">
        <Link
          href="/dashboard"
          id="wd-account-dashboard-link"
          className="btn btn-dark w-100"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}