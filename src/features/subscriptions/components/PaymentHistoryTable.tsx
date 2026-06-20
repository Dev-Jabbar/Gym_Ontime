import { Payment } from "@/features/subscriptions/types";

interface PaymentHistoryTableProps {
  payments: Payment[];
}

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-600",
};

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
        No payment history yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Class</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="px-4 py-3 font-medium text-gray-900">
                {payment.class?.name ?? "—"}
              </td>
              <td className="px-4 py-3 text-gray-600 capitalize">
                {payment.paymentType === "subscription"
                  ? `${payment.subscriptionInterval} subscription`
                  : "One-time"}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                ₦{payment.amount.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    statusStyles[payment.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(payment.createdAt).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
