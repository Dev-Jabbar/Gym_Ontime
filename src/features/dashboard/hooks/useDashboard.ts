"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardStats, UserRole } from "@/features/dashboard/types";
import {
  INITIAL_STATS,
  MOCK_RECENT_SIGNUPS,
} from "@/features/dashboard/constants/mockData";

interface UseDashboardReturn {
  stats: DashboardStats;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useDashboard = (userRole: UserRole): UseDashboardReturn => {
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (userRole === "member") {
        const [classesRes, paymentsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/my-payments`, {
            credentials: "include",
          }),
        ]);

        const classes = await classesRes.json();
        const paymentsData = await paymentsRes.json();
        const payments = paymentsData.data ?? [];

        // ✅ Ongoing first, then upcoming, max 5
        const upcomingClasses = [
          ...classes.filter((cls: any) => cls.status === "ongoing"),
          ...classes.filter((cls: any) => cls.status === "upcoming"),
        ]
          .slice(0, 5)
          .map((cls: any) => ({
            id: cls.id,
            name: cls.name,
            time: new Date(cls.schedule).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Africa/Lagos",
            }),
            date: new Date(cls.schedule).toLocaleDateString("en-NG", {
              weekday: "short",
              month: "short",
              day: "numeric",
              timeZone: "Africa/Lagos",
            }),
            trainer: cls.trainer,
            capacity: cls.capacity,
            enrolled: cls.enrolled,
            status: cls.status,
          }));

        // My upcoming classes count
        const myUpcomingClasses = classes.filter(
          (cls: any) => cls.status === "upcoming",
        ).length;

        // Count active subscriptions
        const activeSubscriptions = payments.filter(
          (p: any) =>
            p.paymentType === "subscription" &&
            p.subscription?.status === "active",
        );

        const myActiveSubscription =
          activeSubscriptions.length > 0
            ? `${activeSubscriptions.length} Active Plan${activeSubscriptions.length > 1 ? "s" : ""}`
            : null;

        // Classes booked this month
        const now = new Date();
        const classesBookedThisMonth = payments.filter((p: any) => {
          const date = new Date(p.createdAt);
          return (
            p.status === "completed" &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        }).length;

        // ✅ Member capacity = their enrolled classes vs total available
        const totalAvailableClasses = classes.length;
        const myEnrolledClasses = payments.filter(
          (p: any) => p.status === "completed",
        ).length;
        const capacityUsage =
          totalAvailableClasses > 0
            ? Math.round((myEnrolledClasses / totalAvailableClasses) * 100)
            : 0;

        setStats((prev) => ({
          ...prev,
          upcomingClasses,
          myUpcomingClasses,
          myActiveSubscription,
          classesBookedThisMonth,
          capacityUsage,
        }));
      } else if (userRole === "admin") {
        const [usersRes, classesRes, paymentsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
            credentials: "include",
          }),
        ]);

        const users = await usersRes.json();
        const classes = await classesRes.json();
        const paymentsData = await paymentsRes.json();
        const payments = paymentsData.data ?? [];

        // Total members
        const totalMembers = users.filter(
          (u: any) => u.role === "member",
        ).length;

        // Active classes
        const activeClasses = classes.filter(
          (cls: any) => cls.status === "upcoming" || cls.status === "ongoing",
        ).length;

        // Monthly revenue
        const now = new Date();
        const revenue = payments
          .filter((p: any) => {
            const date = new Date(p.createdAt);
            return (
              p.status === "completed" &&
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear()
            );
          })
          .reduce((sum: number, p: any) => sum + p.amount, 0);

        // Weekly revenue data (last 7 days)
        const revenueData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return payments
            .filter((p: any) => {
              const pDate = new Date(p.createdAt);
              return (
                p.status === "completed" &&
                pDate.toDateString() === date.toDateString()
              );
            })
            .reduce((sum: number, p: any) => sum + p.amount, 0);
        });

        // Capacity usage
        const totalCapacity = classes.reduce(
          (sum: number, cls: any) => sum + (cls.capacity ?? 0),
          0,
        );
        const totalEnrolled = classes.reduce(
          (sum: number, cls: any) => sum + (cls.enrolled ?? 0),
          0,
        );
        const capacityUsage =
          totalCapacity > 0
            ? Math.round((totalEnrolled / totalCapacity) * 100)
            : 0;

        // ✅ Ongoing first, then upcoming, max 5
        const upcomingClasses = [
          ...classes.filter((cls: any) => cls.status === "ongoing"),
          ...classes.filter((cls: any) => cls.status === "upcoming"),
        ]
          .slice(0, 5)
          .map((cls: any) => ({
            id: cls.id,
            name: cls.name,
            time: new Date(cls.schedule).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Africa/Lagos",
            }),
            date: new Date(cls.schedule).toLocaleDateString("en-NG", {
              weekday: "short",
              month: "short",
              day: "numeric",
              timeZone: "Africa/Lagos",
            }),
            trainer: cls.trainer,
            capacity: cls.capacity,
            enrolled: cls.enrolled,
            status: cls.status,
          }));

        setStats((prev) => ({
          ...prev,
          totalMembers,
          activeClasses,
          revenue,
          revenueData,
          capacityUsage,
          upcomingClasses,
          recentSignups: MOCK_RECENT_SIGNUPS,
        }));
      } else if (userRole === "trainer") {
        const classesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/trainers/my-classes`,
          { credentials: "include" },
        );

        const classesData = await classesRes.json();
        const classes = classesData.data ?? [];

        // ✅ Use enrolled (from transform) not members.length
        // ✅ Count unique members across all classes
        const allMemberIds = classes.flatMap((cls: any) => cls.memberIds ?? []);
        const totalMembers = new Set(allMemberIds).size;

        const activeClasses = classes.filter(
          (cls: any) => cls.status === "upcoming" || cls.status === "ongoing",
        ).length;

        const totalCapacity = classes.reduce(
          (sum: number, cls: any) => sum + (cls.capacity ?? 0),
          0,
        );
        const totalEnrolled = classes.reduce(
          (sum: number, cls: any) => sum + (cls.enrolled ?? 0),
          0,
        );
        const capacityUsage =
          totalCapacity > 0
            ? Math.round((totalEnrolled / totalCapacity) * 100)
            : 0;

        const upcomingClasses = [
          ...classes.filter((cls: any) => cls.status === "ongoing"),
          ...classes.filter((cls: any) => cls.status === "upcoming"),
        ]
          .slice(0, 5)
          .map((cls: any) => ({
            id: cls.id, // ✅ was cls._id.toString()
            name: cls.name,
            time: new Date(cls.schedule).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Africa/Lagos",
            }),
            date: new Date(cls.schedule).toLocaleDateString("en-NG", {
              weekday: "short",
              month: "short",
              day: "numeric",
              timeZone: "Africa/Lagos",
            }),
            trainer: cls.trainer,
            capacity: cls.capacity ?? 0,
            enrolled: cls.enrolled ?? 0, // ✅ use enrolled directly
            status: cls.status,
          }));

        setStats((prev) => ({
          ...prev,
          totalMembers,
          activeClasses,
          capacityUsage,
          upcomingClasses,
        }));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch dashboard data"),
      );
    } finally {
      setLoading(false);
    }
  }, [userRole]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};
