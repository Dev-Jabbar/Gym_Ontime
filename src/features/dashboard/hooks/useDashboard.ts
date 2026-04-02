"use client";

import { useState, useEffect } from "react";
import { DashboardStats, UserRole } from "@/features/dashboard/types";
import {
  INITIAL_STATS,
  MOCK_RECENT_SIGNUPS,
  MOCK_UPCOMING_CLASSES,
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

  useEffect(() => {
    const fetchDashboardData = () => {
      setLoading(true);
      setError(null);

      // ✅ Put setLoading(false) INSIDE setTimeout - just like the working code
      setTimeout(() => {
        setStats((prev) => ({
          ...prev,
          recentSignups: MOCK_RECENT_SIGNUPS,
          upcomingClasses: MOCK_UPCOMING_CLASSES,
        }));
        setLoading(false); // ✅ Runs AFTER stats update
      }, 1000);
    };

    fetchDashboardData();
  }, [userRole]);

  // Refetch function with same pattern
  const refetch = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setStats((prev) => ({
        ...prev,
        recentSignups: MOCK_RECENT_SIGNUPS,
        upcomingClasses: MOCK_UPCOMING_CLASSES,
      }));
      setLoading(false);
    }, 1000);
  };

  return {
    stats,
    loading,
    error,
    refetch,
  };
};
