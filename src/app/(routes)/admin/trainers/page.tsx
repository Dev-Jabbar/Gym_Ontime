"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";
import { AdminTrainersPage } from "@/features/admin";

export default function Page() {
  const user = useUser();
  const loading = useUserStore((state) => state.loading);
  const router = useRouter();

  useEffect(() => {
    // Wait for the store to finish fetching; only then can "not logged in" be
    // told apart from "still checking".
    if (loading) return;

    if (!user) {
      // Not authenticated: send to login instead of leaving a blank page.
      router.push("/login");
    } else if (user.role !== "admin") {
      // Logged in with the wrong role: send to the user's own dashboard.
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") return null;

  return <AdminTrainersPage />;
}
