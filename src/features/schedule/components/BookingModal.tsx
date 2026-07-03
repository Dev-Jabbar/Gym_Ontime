"use client";

import { useState } from "react";
import { TbX, TbRefresh, TbClock } from "react-icons/tb";
import { useBooking } from "../hooks/useBooking";
import type { Class } from "../types";

type SubscriptionInterval =
  | "weekly"
  | "monthly"
  | "quarterly"
  | "biannual"
  | "yearly";

interface PlanOption {
  key: "oneTime" | SubscriptionInterval;
  label: string;
  price: number;
}

const INTERVAL_LABELS: Record<string, string> = {
  oneTime: "One-time (per session)",
  weekly: "Weekly subscription",
  monthly: "Monthly subscription",
  quarterly: "Quarterly subscription",
  biannual: "Biannual subscription",
  yearly: "Yearly subscription",
};

interface BookingModalProps {
  classData: Class;
  onClose: () => void;
}

export function BookingModal({ classData, onClose }: BookingModalProps) {
  const { initiatePayment, loading, error } = useBooking();
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null);

  const isRecurring = classData.recurrence !== "none";

  // ✅ Filter plans based on recurrence
  const planOptions: PlanOption[] = Object.entries(classData.pricing)
    .filter(([key, price]) => {
      if (!price || price === 0) return false;
      // ✅ For one-off classes, only show oneTime
      if (!isRecurring && key !== "oneTime") return false;
      return true;
    })
    .map(([key, price]) => ({
      key: key as PlanOption["key"],
      label: INTERVAL_LABELS[key] ?? key,
      price: price as number,
    }));

  const handleConfirm = () => {
    if (!selectedPlan) return;

    if (selectedPlan.key === "oneTime") {
      initiatePayment({
        classId: classData.id,
        paymentType: "one-time",
      });
    } else {
      initiatePayment({
        classId: classData.id,
        paymentType: "subscription",
        subscriptionInterval: selectedPlan.key,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Book {classData.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        {/* ✅ Show recurrence info */}
        <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 rounded-lg">
          {isRecurring ? (
            <>
              <TbRefresh className="w-4 h-4 text-orange-500" />
              <p className="text-sm text-gray-600">
                <span className="font-medium capitalize">
                  {classData.recurrence}
                </span>{" "}
                class
                {classData.recurrenceDays.length > 0 && (
                  <span className="text-gray-500">
                    {" "}
                    —{" "}
                    {classData.recurrenceDays
                      .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
                      .join(", ")}
                  </span>
                )}
              </p>
            </>
          ) : (
            <>
              <TbClock className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-600">
                One-off class — single session only
              </p>
            </>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">Choose a payment plan:</p>

        <div className="space-y-2 mb-6">
          {planOptions.map((plan) => (
            <label
              key={plan.key}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedPlan?.key === plan.key
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  checked={selectedPlan?.key === plan.key}
                  onChange={() => setSelectedPlan(plan)}
                  className="text-orange-500"
                />
                <span className="text-sm font-medium text-gray-900">
                  {plan.label}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                ₦{plan.price.toLocaleString()}
              </span>
            </label>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleConfirm}
          disabled={!selectedPlan || loading}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            !selectedPlan || loading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {loading ? "Redirecting to payment..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}
