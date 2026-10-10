"use client";

import { getApiUrl } from "@/lib/backend";
import { useState, useEffect, useCallback } from "react";
import { Payment, MyPaymentsResponse } from "@/features/subscriptions/types";

interface UseSubscriptionsReturn {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Member-facing counterpart to the admin `usePayments` hook — same
 * shape, but scoped server-side to `/payments/my-payments` (the
 * signed-in user's own history) rather than every payment in the
 * system, so there's no client-side filtering by user needed here.
 *
 * Note the name: despite living in the "subscriptions" feature, this
 * returns the member's full payment history (one-time bookings
 * included, not just recurring subscriptions) — named after the page
 * it powers, not strictly what it fetches.
 */
export const useSubscriptions = (): UseSubscriptionsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(`${getApiUrl()}/payments/my-payments`, {
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
