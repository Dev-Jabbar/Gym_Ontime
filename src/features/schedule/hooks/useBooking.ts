"use client";

import { getApiUrl } from "@/lib/backend";
import { useState } from "react";

type PaymentType = "one-time" | "subscription";
type SubscriptionInterval = "weekly" | "monthly" | "threeMonths";

interface InitiatePaymentParams {
  classId: string;
  paymentType: PaymentType;
  subscriptionInterval?: SubscriptionInterval;
}

interface UseBookingReturn {
  initiatePayment: (params: InitiatePaymentParams) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * Kicks off the paid-booking flow. On the backend, this single request
 * atomically places a 15-minute hold on the seat (so two people can't
 * both be sent to pay for the same last spot) before returning a
 * Paystack checkout URL — see `payment.service.ts` / `class.repository.ts`
 * on the backend for the actual reservation logic this triggers.
 */
export const useBooking = (): UseBookingReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (params: InitiatePaymentParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${getApiUrl()}/payments/initiate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(params),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to initiate payment");
      }

      // Full-page redirect to Paystack's hosted checkout. `loading` is
      // deliberately left `true` here rather than reset — the browser
      // is about to navigate away entirely, so flipping it back to
      // `false` would only cause a one-frame flash of the un-loading
      // UI right before the page unloads.
      window.location.href = result.data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error };
};
