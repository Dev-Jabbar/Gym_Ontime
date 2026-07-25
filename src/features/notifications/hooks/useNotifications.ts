"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Notification } from "../types";

const POLL_INTERVAL_MS = 20000; // 20 seconds

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Tracks whether the component is still mounted, so a slow poll
  // response arriving after unmount doesn't try to setState on a
  // gone component.
  const isMounted = useRef(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/my-notifications`,
        { credentials: "include" },
      );

      if (!res.ok) return;

      const data = await res.json();
      if (!isMounted.current) return;

      setNotifications(data.data?.notifications ?? []);
      setUnreadCount(data.data?.unreadCount ?? 0);
    } catch (err) {
      // Fail quiet — a missed poll isn't worth surfacing an error for,
      // the next poll 20s later will just try again.
      console.error("Failed to fetch notifications:", err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchNotifications();

    const interval = setInterval(fetchNotifications, POLL_INTERVAL_MS);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (notificationId: string) => {
    // Optimistic update — feels instant, and this endpoint is simple
    // enough that a failure is very unlikely to matter visually (worst
    // case, next poll corrects it back).
    setNotifications((prev) =>
      prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n)),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${notificationId}/read`,
        { method: "PUT", credentials: "include" },
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-all-read`,
        { method: "PUT", credentials: "include" },
      );
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
}
