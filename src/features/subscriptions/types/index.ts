export type PaymentStatus = "pending" | "completed" | "failed";
export type PaymentType = "one-time" | "subscription";
export type SubscriptionInterval =
  | "weekly"
  | "monthly"
  | "quarterly"
  | "biannual"
  | "yearly";
export type SubscriptionStatus = "active" | "expired" | "cancelled";

export interface PopulatedClass {
  _id: string;
  name: string;
  price?: number;
  schedule?: string;
}

export interface PopulatedSubscription {
  _id: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  interval: SubscriptionInterval;
}

export interface Payment {
  _id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentType: PaymentType;
  subscriptionInterval?: SubscriptionInterval;
  class?: PopulatedClass;
  subscription?: PopulatedSubscription;
  createdAt: string;
}

export interface MyPaymentsResponse {
  success: boolean;
  data: Payment[];
}
