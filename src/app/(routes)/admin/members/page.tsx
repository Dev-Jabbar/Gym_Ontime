"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";
import { AdminMembersPage } from "@/features/admin";

export default function Page() {
  const user = useUser();
  const loading = useUserStore((state) => state.loading);
  const router = useRouter();

  useEffect(() => {
    // Wait until the store is done fetching — only then can we tell
    // "not logged in" apart from "still checking".
    if (loading) return;

    if (!user) {
      // Not authenticated at all -> send to login instead of leaving
      // them on a blank page.
      router.push("/login");
    } else if (user.role !== "admin") {
      // Logged in, but wrong role -> send to their own dashboard.
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") return null;

  return <AdminMembersPage />;
}
