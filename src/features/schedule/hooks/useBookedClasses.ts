"use client";

import { idOf } from "@/lib/ids";
import { getApiUrl } from "@/lib/backend";
import { useState, useEffect } from "react";

/**
 * Returns the set of classIds the current member has valid access to, used
 * to show "Booked" instead of "Book Now".
 *
 * "Booked" means either:
 * - a completed one-time payment for that class (permanent, no expiry), or
 * - a subscription payment whose linked subscription is still "active" and
 *   whose endDate has not passed.
 *
 * It is deliberately not "this classId appears in payments at all": an
 * expired subscription must not show as Booked. It uses
 * GET /payments/my-payments, which already includes each payment's
 * subscription (status and endDate), so no extra endpoint is needed.
 */
export function useBookedClasses(userRole: string) {
  const [bookedClassIds, setBookedClassIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only members can book classes, so there is nothing to fetch for the
    // admin and trainer views.
    if (userRole !== "member") {
      setLoading(false);
      return;
    }

    const fetchBookedClasses = async () => {
      try {
        const res = await fetch(
          `${getApiUrl()}/payments/my-payments`,
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
              : idOf(payment.class);

          if (payment.paymentType === "one-time") {
            // Permanent: a paid one-off session does not expire.
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
        // Fail quietly: at worst "Book Now" shows for one page load when it
        // should not. Not worth blocking the schedule page.
        console.error("Failed to compute booked classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedClasses();
  }, [userRole]);

  return { bookedClassIds, loading };
}
