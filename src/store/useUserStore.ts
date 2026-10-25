import { getApiUrl } from "@/lib/backend";
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
  // Tracks whether a fetch has been attempted, so /users/me is called once
  // per app load instead of once per page navigation.
  hasFetched: boolean;

  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
  // Patches only the avatar on the cached user. Used right after an upload
  // succeeds, so the Header (and anything else reading the store) updates
  // immediately instead of showing stale data until the next reload.
  updateAvatar: (avatar: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: true,
  hasFetched: false,

  fetchUser: async () => {
    // Guard against duplicate fetches, for example when two components mount
    // at the same time and both call this before the first request resolves.
    if (get().hasFetched) return;
    set({ hasFetched: true });

    try {
      const res = await fetch(`${getApiUrl()}/users/me`, {
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

  // Called on logout so the next login does not show stale data and a later
  // fetchUser() is allowed to run again.
  //
  // `loading` is set to true, not false: a fresh fetch is about to happen
  // (login navigates immediately after calling this). If it were false, a
  // component reading the store before the fetch resolved would see
  // { user: null, loading: false } and wrongly conclude "not logged in",
  // which made the login page bounce back to /login.
  clearUser: () => set({ user: null, loading: true, hasFetched: false }),

  updateAvatar: (avatar) => {
    const currentUser = get().user;
    if (!currentUser) return;
    set({ user: { ...currentUser, avatar } });
  },
}));
