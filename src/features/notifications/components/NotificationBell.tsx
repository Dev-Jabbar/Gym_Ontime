"use client";

import { useState, useRef, useEffect } from "react";
import {
  TbBell,
  TbCreditCard,
  TbCalendarCheck,
  TbClock,
  TbUserCheck,
} from "react-icons/tb";
import { useNotifications } from "../hooks/useNotifications";
import type { Notification, NotificationType } from "../types";

const TYPE_ICONS: Record<NotificationType, React.ReactNode> = {
  payment_confirmed: <TbCreditCard className="w-4 h-4 text-green-600" />,
  class_booked: <TbCalendarCheck className="w-4 h-4 text-blue-600" />,
  class_reminder: <TbClock className="w-4 h-4 text-orange-600" />,
  trainer_assigned: <TbUserCheck className="w-4 h-4 text-purple-600" />,
};

function getRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function NotificationBell() {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking anywhere outside it.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) markAsRead(notification._id);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-gray-300 hover:text-white transition-colors p-1"
        aria-label="Notifications"
      >
        <TbBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-500" />
              </div>
            ) : notifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No notifications yet.
              </p>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left flex gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-orange-50/50" : ""
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {TYPE_ICONS[notification.type] ?? (
                      <TbBell className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {getRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
