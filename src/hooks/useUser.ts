"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

// Returns the current User (or null). It reads from the shared Zustand store
// and fetches /users/me only once per app load, not on every page navigation.
export function useUser() {
  const user = useUserStore((state) => state.user);
  const hasFetched = useUserStore((state) => state.hasFetched);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (!hasFetched) {
      fetchUser();
    }
  }, [hasFetched, fetchUser]);

  return user;
}
