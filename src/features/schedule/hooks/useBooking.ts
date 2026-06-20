"use client";

import { useState } from "react";

type PaymentType = "one-time" | "subscription";
type SubscriptionInterval =
  | "weekly"
  | "monthly"
  | "quarterly"
  | "biannual"
  | "yearly";

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

export const useBooking = (): UseBookingReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (params: InitiatePaymentParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/payments/initiate",
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

      // Redirect to Paystack checkout
      window.location.href = result.data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return { initiatePayment, loading, error };
};
