"use client";

import { getApiUrl } from "@/lib/backend";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Payment,
  PaymentsResponse,
  PaymentFilterStatus,
} from "@/features/payments/types";

interface UsePaymentsReturn {
  payments: Payment[];
  filteredPayments: Payment[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  filterStatus: PaymentFilterStatus;
  setFilterStatus: (status: PaymentFilterStatus) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  stats: {
    totalRevenue: number;
    monthRevenue: number;
    pendingCount: number;
    failedCount: number;
  };
}

/**
 * Loads the admin payments table: the raw list, a derived filtered/
 * searched view, and a small set of summary stats — all computed on
 * the client from the same fetched list rather than as separate
 * requests, since the dataset here is small enough that refetching
 * per-stat isn't worth the extra round trips.
 */
export const usePayments = (): UsePaymentsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<PaymentFilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // useCallback so this can safely be both the effect's dependency and
  // the `refetch` value handed back to consumers, without re-creating
  // (and re-running the effect) on every render.
  const fetchPayments = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(`${getApiUrl()}/payments`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payments");
        return res.json();
      })
      .then((data: PaymentsResponse) => {
        setPayments(data.data ?? []);
      })
      .catch(() => {
        // Swallow the real error and show a generic message — nothing
        // actionable for the admin viewing this table beyond "try
        // again", so no value in surfacing the raw fetch error.
        setError("Unable to load payments. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Filter status and search apply on top of each other (AND, not OR):
  // e.g. filterStatus="completed" + searchQuery="jane" narrows to
  // completed payments matching "jane", not either condition alone.
  const filteredPayments = useMemo(() => {
    let filtered = payments;

    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.class?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [payments, filterStatus, searchQuery]);

  const stats = useMemo(() => {
    const now = new Date();
    const totalRevenue = payments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);

    // This is a calendar-month window (it resets on the 1st), unlike the
    // dashboard's rolling last-30-days revenue (see
    // features/dashboard/hooks/useDashboard.ts). The two answer slightly
    // different questions and can differ near a month boundary.
    const monthRevenue = payments
      .filter((p) => {
        const date = new Date(p.createdAt);
        return (
          p.status === "completed" &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, p) => sum + p.amount, 0);

    const pendingCount = payments.filter((p) => p.status === "pending").length;
    const failedCount = payments.filter((p) => p.status === "failed").length;

    return { totalRevenue, monthRevenue, pendingCount, failedCount };
  }, [payments]);

  return {
    payments,
    filteredPayments,
    loading,
    error,
    refetch: fetchPayments,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    stats,
  };
};
