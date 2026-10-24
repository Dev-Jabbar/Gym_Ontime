"use client";

import { useEffect, useState } from "react";
import {
  BACKENDS,
  clearBackend,
  getApiUrl,
  getBackend,
  setBackend,
  type BackendId,
} from "@/lib/backend";
import { disablePush } from "@/lib/pushNotifications";

// "waking" = no answer after a few seconds. A free-tier host (Render) sleeps
// when idle and can take up to a minute to start, so we keep waiting and say
// so, instead of showing a red "offline" straight away.
type Status = "checking" | "waking" | "online" | "offline";

const SLOW_AFTER_MS = 3000;
const GIVE_UP_AFTER_MS = 75000;

const DETAILS: Record<BackendId, { stack: string }> = {
  express: { stack: "Express + MongoDB" },
  nest: { stack: "NestJS + PostgreSQL + Redis + WebSocket" },
};

function useBackendStatus(id: BackendId): Status {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    // `active` stops a cancelled run (React dev mode runs effects twice, and
    // an id change cancels the old ping) from writing its aborted result
    // into the state of the run that replaced it.
    let active = true;
    setStatus("checking");

    const controller = new AbortController();
    const giveUp = setTimeout(() => controller.abort(), GIVE_UP_AFTER_MS);
    // Only flips to "waking" if the ping is still unanswered.
    const slow = setTimeout(() => {
      if (active) setStatus((s) => (s === "checking" ? "waking" : s));
    }, SLOW_AFTER_MS);

    // GET /classes is public on both backends, so it works as a ping.
    fetch(`${BACKENDS[id].url}/classes`, { signal: controller.signal })
      .then((res) => {
        if (active) setStatus(res.ok ? "online" : "offline");
      })
      .catch(() => {
        if (active) setStatus("offline");
      })
      .finally(() => {
        clearTimeout(giveUp);
        clearTimeout(slow);
      });

    return () => {
      active = false;
      clearTimeout(giveUp);
      clearTimeout(slow);
      controller.abort();
    };
  }, [id]);

  return status;
}

function BackendCard({
  id,
  onPick,
}: {
  id: BackendId;
  onPick: (id: BackendId) => void;
}) {
  const status = useBackendStatus(id);
  const dot =
    status === "online"
      ? "bg-green-500"
      : status === "offline"
        ? "bg-red-500"
        : status === "waking"
          ? "bg-amber-500 animate-pulse"
          : "bg-gray-400 animate-pulse";

  return (
    <button
      type="button"
      onClick={() => onPick(id)}
      className="flex-1 rounded-lg border border-gray-300 p-5 text-left transition hover:border-black hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{BACKENDS[id].label}</span>
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
          {status === "waking" ? "waking up" : status}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{DETAILS[id].stack}</p>
      {status === "waking" && (
        <p className="mt-2 text-xs text-amber-600">
          This server sleeps when idle and may take up to a minute to wake.
          Wait for the green dot, then pick it.
        </p>
      )}
      <p className="mt-3 break-all text-xs text-gray-400">{BACKENDS[id].url}</p>
    </button>
  );
}

function BackendPicker({ onPick }: { onPick: (id: BackendId) => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">Choose a backend</h2>
        <p className="mt-1 text-sm text-gray-600">
          Same app, same API routes, two implementations. The two backends use
          separate databases, so accounts created on one do not exist on the
          other.
        </p>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row">
          <BackendCard id="express" onPick={onPick} />
          <BackendCard id="nest" onPick={onPick} />
        </div>
      </div>
    </div>
  );
}

// Fixed pill showing the active backend, with a way back to the picker.
function SwitchBadge({ current }: { current: BackendId }) {
  const switchBackend = async () => {
    // Both backends store the session in a cookie named "token" on
    // localhost, so log out of the current one before leaving it.
    try {
      await disablePush();
      await fetch(`${getApiUrl()}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Best effort: the other backend will just reject the old token.
    }
    clearBackend();
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-black/80 px-3 py-1 text-xs text-white">
      <span>Backend: {BACKENDS[current].label}</span>
      <button
        type="button"
        onClick={switchBackend}
        className="underline hover:text-gray-300"
      >
        Switch
      </button>
    </div>
  );
}

// Renders nothing until a backend is chosen, so no request is sent to the
// wrong one before the choice is made.
export function BackendGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [chosen, setChosen] = useState<BackendId | null>(null);

  useEffect(() => {
    setChosen(getBackend());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!chosen) {
    return (
      <BackendPicker
        onPick={(id) => {
          setBackend(id);
          setChosen(id);
        }}
      />
    );
  }

  return (
    <>
      {children}
      <SwitchBadge current={chosen} />
    </>
  );
}
