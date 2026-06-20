"use client";

import { useUser } from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";
import { MembersPage } from "@/features/members";

export default function Page() {
  const user = useUser();
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  if (!user) return null;

  return <MembersPage userRole={user.role} classId={classId} />;
}
