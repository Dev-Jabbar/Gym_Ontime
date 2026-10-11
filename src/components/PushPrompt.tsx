"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import {
  PUSH_DISMISSED_KEY,
  enablePush,
  pushAvailable,
} from "@/lib/pushNotifications";

// Shown only on the NestJS backend once push is configured. If the browser
// already granted permission, the token is registered silently on login;
// otherwise a small card asks first (browsers want a click for the prompt).
export function PushPrompt() {
  const user = useUser();
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user || !pushAvailable()) {
      setVisible(false);
      return;
    }

    if (Notification.permission === "granted") {
      void enablePush();
    } else if (
      Notification.permission === "default" &&
      !localStorage.getItem(PUSH_DISMISSED_KEY)
    ) {
      setVisible(true);
    }
  }, [user?.id]);

  if (!visible) return null;

  const onEnable = async () => {
    setBusy(true);
    await enablePush();
    setBusy(false);
    setVisible(false);
  };

  const onDismiss = () => {
    localStorage.setItem(PUSH_DISMISSED_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 rounded-lg bg-white p-4 shadow-xl">
      <p className="text-sm font-semibold">Turn on notifications?</p>
      <p className="mt-1 text-xs text-gray-600">
        Get a message when your payment is confirmed, even if Gym Ontime is
        closed.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onEnable}
          disabled={busy}
          className="rounded bg-black px-3 py-1 text-xs text-white disabled:opacity-60"
        >
          {busy ? "Enabling..." : "Enable"}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded px-3 py-1 text-xs text-gray-600 hover:underline"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
