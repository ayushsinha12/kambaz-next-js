import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />

      <FormControl
        id="wd-password"
        type="password"
        placeholder="password"
        className="mb-2"
      />

      <FormControl
        id="wd-password-verify"
        type="password"
        placeholder="verify password"
        className="mb-2"
      />

      <Link
        id="wd-signup-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>

      <Link id="wd-signin-link" href="/account/signin">
        Sign in
      </Link>
    </div>
  );
}