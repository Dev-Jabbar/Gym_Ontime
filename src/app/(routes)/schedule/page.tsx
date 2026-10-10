"use client";

import { getApiUrl } from "@/lib/backend";
import { useState, useEffect } from "react";
import { SchedulePage } from "@/features/schedule";
import { useUser } from "@/hooks/useUser";

export default function Page() {
  const user = useUser();
  const [trainerProfileId, setTrainerProfileId] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (user?.role === "trainer") {
      fetch(`${getApiUrl()}/trainers/me`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch trainer profile");
          return res.json();
        })
        .then((data) => setTrainerProfileId(data._id))
        .catch(console.error);
    }
  }, [user]);

  if (!user) return null;

  return (
    <SchedulePage userRole={user.role} trainerProfileId={trainerProfileId} />
  );
}
