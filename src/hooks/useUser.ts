"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

// Same signature as before (returns User | null) so every existing
// call site — LayoutWrapper, admin route guards, etc. — keeps working
// unchanged. The difference is purely internal: this used to fetch
// /users/me on every mount (i.e. every page navigation, since
// LayoutWrapper wraps every route); now it reads from a shared store
// and only fetches once per app load.
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
