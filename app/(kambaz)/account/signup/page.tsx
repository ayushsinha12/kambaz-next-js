"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/account/signin");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Sign up failed. Is the server running?");
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>

      <FormControl
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2"
        placeholder="username"
        id="wd-username"
      />

      <FormControl
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />

      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
        id="wd-signup-btn"
      >
        Sign up
      </button>
      <br />

      {error && <div className="alert alert-danger py-2">{error}</div>}
      <Link href="/account/signin" className="wd-signin-link" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}