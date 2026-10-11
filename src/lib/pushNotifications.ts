// Web push (Firebase Cloud Messaging). Only the NestJS backend has the
// device-token routes, so everything here is a no-op on Express.
//
// The `firebase` package is imported dynamically so it is only downloaded
// when push is actually used.

import { getApiUrl, getBackend } from "@/lib/backend";

const TOKEN_KEY = "gym_push_token";
export const PUSH_DISMISSED_KEY = "gym_push_dismissed";

// NEXT_PUBLIC_* vars must be referenced literally for Next to inline them.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};
const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?? "";

export type PushResult =
  | "granted"
  | "denied"
  | "default"
  | "unavailable"
  | "error";

function isConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId &&
    vapidKey,
  );
}

function isSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "Notification" in window &&
    "PushManager" in window
  );
}

// True only on the NestJS backend, in a browser that supports push, with the
// Firebase env vars set.
export function pushAvailable(): boolean {
  return getBackend() === "nest" && isSupported() && isConfigured();
}

let foregroundListening = false;

// Asks for permission if needed (call from a click for best results), gets
// an FCM token and registers it with the backend. Never throws.
export async function enablePush(): Promise<PushResult> {
  if (!pushAvailable()) return "unavailable";

  try {
    const permission =
      Notification.permission === "default"
        ? await Notification.requestPermission()
        : Notification.permission;
    if (permission !== "granted") return permission;

    const [{ initializeApp, getApps, getApp }, messagingSdk] =
      await Promise.all([import("firebase/app"), import("firebase/messaging")]);
    const { getMessaging, getToken, onMessage } = messagingSdk;

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

    const query = new URLSearchParams(firebaseConfig).toString();
    const registration = await navigator.serviceWorker.register(
      `/firebase-messaging-sw.js?${query}`,
    );

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });
    if (!token) return "error";

    const res = await fetch(`${getApiUrl()}/notifications/device-token`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, platform: "web" }),
    });
    if (!res.ok) return "error";

    localStorage.setItem(TOKEN_KEY, token);

    // While the tab is open FCM does not show a pop-up; tell the app so the
    // notification bell can refresh right away instead of waiting for its poll.
    if (!foregroundListening) {
      foregroundListening = true;
      onMessage(messaging, () => window.dispatchEvent(new Event("gym:push")));
    }

    return "granted";
  } catch (err) {
    console.error("Failed to enable push notifications:", err);
    return "error";
  }
}

// Call BEFORE logging out (it needs the session cookie). Removes this
// browser's token from the backend so the next user on this device does not
// receive the previous user's notifications. Best effort, never throws.
export async function disablePush(): Promise<void> {
  if (typeof window === "undefined" || getBackend() !== "nest") return;

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return;

  try {
    await fetch(`${getApiUrl()}/notifications/device-token`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  } catch {
    // The backend also deletes tokens FCM later reports as dead.
  }
  localStorage.removeItem(TOKEN_KEY);
}
