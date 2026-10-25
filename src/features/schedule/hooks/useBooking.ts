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
 * Starts the paid-booking flow. This single request makes the backend place
 * a 15-minute hold on the seat (so two people cannot both be sent to pay for
 * the last spot) before it returns a Paystack checkout URL.
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

      // Full-page redirect to Paystack's hosted checkout. `loading` is left
      // `true` on purpose: the browser is about to navigate away, so resetting
      // it would only flash the un-loading UI for one frame.
      window.location.href = result.data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error };
};
