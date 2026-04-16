"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./table/page";
import * as client from "../../client";

export default function People() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams<{ cid: string }>();

  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}