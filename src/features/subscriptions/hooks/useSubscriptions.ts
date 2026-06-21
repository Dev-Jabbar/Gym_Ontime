"use client";

import { useState, useEffect, useCallback } from "react";
import { Payment, MyPaymentsResponse } from "@/features/subscriptions/types";

interface UseSubscriptionsReturn {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSubscriptions = (): UseSubscriptionsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/my-payments`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payments");
        return res.json();
      })
      .then((data: MyPaymentsResponse) => {
        setPayments(data.data);
      })
      .catch(() => {
        setError("Unable to load your subscriptions. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments, loading, error, refetch: fetchPayments };
};
