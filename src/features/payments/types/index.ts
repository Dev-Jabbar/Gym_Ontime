export type PaymentStatus = "pending" | "completed" | "failed";
export type PaymentType = "one-time" | "subscription";
export type SubscriptionInterval =
  | "weekly"
  | "monthly"
  | "quarterly"
  | "biannual"
  | "yearly";

export interface PopulatedUser {
  _id: string;
  name: string;
  email: string;
}

export interface PopulatedClass {
  _id: string;
  name: string;
  price?: number;
}

export interface Payment {
  _id: string;
  user: PopulatedUser;
  class?: PopulatedClass;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentType: PaymentType;
  subscriptionInterval?: SubscriptionInterval;
  provider: "stripe" | "paystack";
  createdAt: string;
}

export interface PaymentsResponse {
  success: boolean;
  data: Payment[];
}

export type PaymentFilterStatus = "all" | PaymentStatus;
