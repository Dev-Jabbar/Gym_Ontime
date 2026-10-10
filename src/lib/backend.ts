// Which backend the app talks to is chosen at runtime (see BackendGate),
// so every request builds its URL with getApiUrl() at call time instead of
// reading the build-time NEXT_PUBLIC_API_URL directly.

export type BackendId = "express" | "nest";

// NEXT_PUBLIC_* vars must be referenced literally for Next to inline them.
export const BACKENDS: Record<BackendId, { label: string; url: string }> = {
  express: {
    label: "Express",
    url: process.env.NEXT_PUBLIC_EXPRESS_API_URL ?? "http://localhost:5000/api",
  },
  nest: {
    label: "NestJS",
    url: process.env.NEXT_PUBLIC_NEST_API_URL ?? "http://localhost:3001/api",
  },
};

// sessionStorage: the choice lasts for this browser tab/session, so every
// fresh visit asks again, but a page refresh doesn't.
const STORAGE_KEY = "gym_backend";

export function getBackend(): BackendId | null {
  if (typeof window === "undefined") return null;
  const value = window.sessionStorage.getItem(STORAGE_KEY);
  return value === "express" || value === "nest" ? value : null;
}

export function setBackend(id: BackendId) {
  window.sessionStorage.setItem(STORAGE_KEY, id);
}

export function clearBackend() {
  window.sessionStorage.removeItem(STORAGE_KEY);
}

// Falls back to the original NEXT_PUBLIC_API_URL when nothing has been
// chosen yet (e.g. server-side rendering), so nothing breaks.
export function getApiUrl(): string {
  const chosen = getBackend();
  if (chosen) return BACKENDS[chosen].url;
  return process.env.NEXT_PUBLIC_API_URL ?? BACKENDS.express.url;
}
