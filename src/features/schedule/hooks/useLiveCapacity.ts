"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { getApiUrl, getBackend } from "@/lib/backend";

type CapacityPayload = { classId: string; enrolled: number; capacity: number };

// Live seat counts exist only on the NestJS backend (WebSocket gateway on
// the /classes namespace). On Express this hook does nothing.
export function useLiveCapacity(
  onCapacity: (payload: CapacityPayload) => void,
  onRemoved: (classId: string) => void,
) {
  useEffect(() => {
    if (getBackend() !== "nest") return;

    // The API URL ends in /api; the socket lives at the server root.
    const root = getApiUrl().replace(/\/api\/?$/, "");
    const socket = io(`${root}/classes`, { withCredentials: true });

    socket.on("class:capacity", onCapacity);
    socket.on("class:removed", ({ classId }: { classId: string }) =>
      onRemoved(classId),
    );

    return () => {
      socket.disconnect();
    };
    // Connect once per mount; the handlers only call state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
