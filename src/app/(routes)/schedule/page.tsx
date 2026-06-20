"use client";

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
      fetch("http://localhost:5000/api/trainers/me", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setTrainerProfileId(data._id))
        .catch(console.error);
    }
  }, [user]);

  if (!user) return null;

  return (
    <SchedulePage userRole={user.role} trainerProfileId={trainerProfileId} />
  );
}
