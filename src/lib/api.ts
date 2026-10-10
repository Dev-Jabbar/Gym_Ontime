// src/lib/api.ts
//
// ⚠️ LEGACY / NOT CURRENTLY USED IN PRODUCTION
// This client authenticates via a Bearer token pulled from localStorage.
// The live app now authenticates via an HTTP-only cookie set by the
// backend on login (see the auth middleware on the backend, and
// `useUserStore` for how the current user is actually tracked on the
// frontend). Kept around from an earlier auth approach; not wired into
// any active page. Safe to delete once confirmed unused everywhere,
// but left in place for now rather than removed mid-way through other
// work.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Reads the JWT from localStorage. Guarded for SSR — `localStorage`
 * doesn't exist during Next.js server-side rendering, only once the
 * component has mounted in the browser.
 */
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("gym_token");
  }
  return null;
};

/**
 * Shared request wrapper for this (unused) API client: attaches the
 * bearer token if one exists, and normalizes error handling so callers
 * don't each need their own try/catch + response.ok check.
 *
 * Deliberately throws on a 401 rather than redirecting from here —
 * this module doesn't know what page it's being called from, so
 * navigation decisions are left to whatever calls it.
 */
async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Merge in any caller-supplied headers before adding auth, so a
  // caller can't accidentally clobber the Authorization header below.
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers[key] = value as string;
    });
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Session has expired or was revoked — clear the stale local
    // credentials so a later request doesn't keep sending a dead
    // token, then let the caller decide what to do next.
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("gym_token");
        localStorage.removeItem("gym_user");
      }

      throw new Error("UNAUTHORIZED");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return data;
  } catch (error) {
    // Re-throw anything we already understand (including the
    // UNAUTHORIZED case above); anything else is assumed to be a
    // network failure (fetch itself throwing, e.g. offline/DNS/CORS)
    // rather than an API error, so it gets a friendlier message.
    if (error instanceof Error) throw error;

    throw new Error(
      "Network error. Please check your connection and try again.",
    );
  }
}

/**
 * Thin, typed wrappers around each endpoint this client knows about.
 * Kept intentionally simple — no caching, no retries — since this
 * whole module is legacy (see the note at the top of the file).
 */
export const api = {
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "trainer" | "member";
  }) =>
    apiRequest("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials: { email: string; password: string }) =>
    apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getAllUsers: () => apiRequest("/users"),

  getUserById: (id: string) => apiRequest(`/users/${id}`),

  updateUser: (
    id: string,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      role: "admin" | "trainer" | "member";
    }>,
  ) =>
    apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteUser: (id: string) =>
    apiRequest(`/users/${id}`, {
      method: "DELETE",
    }),
};

export { getToken };
