"use client";

import { ProfilePage } from "@/features/profile";
import { useUser } from "@/hooks/useUser";

export default function Page() {
  const user = useUser();
  if (!user) return null;
  return <ProfilePage />;
}
