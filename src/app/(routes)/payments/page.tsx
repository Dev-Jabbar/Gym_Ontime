"use client";

import { PaymentsPage } from "@/features/payments/page";
import { useUser } from "@/hooks/useUser";

export default function Page() {
  const user = useUser();
  if (!user) return null;
  return <PaymentsPage />;
}
