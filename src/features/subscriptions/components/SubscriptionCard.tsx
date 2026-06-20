import { Payment } from "@/features/subscriptions/types";
import { TbCalendarTime, TbRefresh } from "react-icons/tb";

interface SubscriptionCardProps {
  payment: Payment;
}

const statusStyles: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  expired: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

export function SubscriptionCard({ payment }: SubscriptionCardProps) {
  const sub = payment.subscription;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {payment.class?.name ?? "Class"}
          </h3>
          <p className="text-sm text-gray-500 capitalize flex items-center gap-1 mt-1">
            <TbRefresh className="w-4 h-4" />
            {payment.subscriptionInterval} plan
          </p>
        </div>

        {sub && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              statusStyles[sub.status] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {sub.status}
          </span>
        )}
      </div>

      {sub && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <TbCalendarTime className="w-4 h-4" />
          <span>
            {sub.status === "active" ? "Renews on" : "Ended on"}{" "}
            {new Date(sub.endDate).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">Amount</span>
        <span className="text-lg font-bold text-gray-900">
          ₦{payment.amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
