export type NotificationType =
  | "payment_confirmed"
  | "class_booked"
  | "class_reminder"
  | "trainer_assigned";

export interface Notification {
  _id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  relatedClass?: string;
  relatedPayment?: string;
  createdAt: string;
}
