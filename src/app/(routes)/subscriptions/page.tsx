"use client";

import { SubscriptionsPage } from "@/features/subscriptions";
import { useUser } from "@/hooks/useUser";

export default function Page() {
  const user = useUser();

  if (!user) return null;

  return <SubscriptionsPage />;
}
