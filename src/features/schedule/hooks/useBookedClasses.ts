"use client";

import { useState, useEffect } from "react";

/**
 * Returns the set of classIds the current member currently has valid
 * access to — used to show a "Booked" state instead of "Book Now".
 *
 * "Booked" means either:
 * - A completed one-time payment for that class (permanent, no expiry)
 * - A subscription payment whose linked subscription is still
 *   status: "active" AND its endDate hasn't passed yet
 *
 * Deliberately NOT just "is this classId in payments at all" — an
 * expired subscription shouldn't still show as Booked. Uses
 * GET /payments/my-payments, which already populates each payment's
 * subscription (status/endDate) per payment.repository.ts, so no new
 * backend endpoint is needed for this.
 */
export function useBookedClasses(userRole: string) {
  const [bookedClassIds, setBookedClassIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only members can "book" classes — no point fetching this for
    // admin/trainer views of the schedule.
    if (userRole !== "member") {
      setLoading(false);
      return;
    }

    const fetchBookedClasses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/my-payments`,
          { credentials: "include" },
        );

        if (!res.ok) throw new Error("Failed to fetch payments");

        const data = await res.json();
        const payments: any[] = data.data ?? [];

        const now = new Date();
        const booked = new Set<string>();

        for (const payment of payments) {
          if (payment.status !== "completed" || !payment.class) continue;

          const classId =
            typeof payment.class === "string"
              ? payment.class
              : payment.class._id;

          if (payment.paymentType === "one-time") {
            // Permanent — a paid one-off session doesn't expire.
            booked.add(classId);
          } else if (
            payment.paymentType === "subscription" &&
            payment.subscription
          ) {
            const isActive = payment.subscription.status === "active";
            const notExpired =
              payment.subscription.endDate &&
              new Date(payment.subscription.endDate) > now;

            if (isActive && notExpired) {
              booked.add(classId);
            }
          }
        }

        setBookedClassIds(booked);
      } catch (err) {
        // Fail quiet — worst case, "Book Now" shows when it maybe
        // shouldn't for one page load. Not worth blocking the whole
        // schedule page over this.
        console.error("Failed to compute booked classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedClasses();
  }, [userRole]);

  return { bookedClassIds, loading };
}
