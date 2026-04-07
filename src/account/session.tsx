"use client";

import * as client from "../../app/(kambaz)/account/client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "../../app/(kambaz)/account/reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      console.error(err);
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return null;
  }

  return <>{children}</>;
}