"use client";

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

export const usePayments = (): UsePaymentsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<PaymentFilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPayments = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`, {
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
        setError("Unable to load payments. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

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
