"use client";

import { useEffect, useState } from "react";
import { DashboardPage } from "@/features/dashboard";
import { useUser } from "@/hooks/useUser";

export default function Dashboard() {
  const [userRole, setUserRole] = useState<
    "admin" | "trainer" | "member" | null
  >(null);
  const user = useUser();
  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user]);

  if (!userRole) return null;

  return <DashboardPage userRole={userRole} />;
}
