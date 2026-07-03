import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "member";
  avatar: string | null;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  // Tracks whether we've attempted a fetch yet, so we only ever call
  // /users/me once per app load instead of once per page navigation.
  hasFetched: boolean;

  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: true,
  hasFetched: false,

  fetchUser: async () => {
    // Guard against duplicate fetches — e.g. if two components mount
    // around the same time and both call this before the first
    // request resolves.
    if (get().hasFetched) return;
    set({ hasFetched: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();
      set({ user: data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user, loading: false, hasFetched: true }),

  // Called on logout so the next login doesn't show stale data, and so
  // a future fetchUser() call is allowed to run again.
  clearUser: () => set({ user: null, loading: false, hasFetched: false }),
}));
