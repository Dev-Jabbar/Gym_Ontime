// src/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Get JWT token from localStorage (browser only)
 */
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("gym_token");
  }
  return null;
};

/**
 * Generic API request handler
 * - attaches token automatically
 * - throws UNAUTHORIZED instead of redirecting
 */
async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Merge headers
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers[key] = value as string;
    });
  }

  // Attach token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // 🚨 IMPORTANT: only THROW error
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
    if (error instanceof Error) throw error;

    throw new Error(
      "Network error. Please check your connection and try again.",
    );
  }
}

/**
 * API FUNCTIONS
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
