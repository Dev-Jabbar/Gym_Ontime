import { Payment, PaymentFilterStatus } from "@/features/payments/types";
import { TbSearch } from "react-icons/tb";

interface PaymentsTableProps {
  payments: Payment[];
  filterStatus: PaymentFilterStatus;
  searchQuery: string;
  onFilterChange: (status: PaymentFilterStatus) => void;
  onSearchChange: (query: string) => void;
}

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-600",
};

export function PaymentsTable({
  payments,
  filterStatus,
  searchQuery,
  onFilterChange,
  onSearchChange,
}: PaymentsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by member or class..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) =>
            onFilterChange(e.target.value as PaymentFilterStatus)
          }
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      {payments.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No payments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Member</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">
                      {payment.user?.name ?? "—"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.user?.email ?? ""}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {payment.class?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 capitalize">
                    {payment.paymentType === "subscription"
                      ? `${payment.subscriptionInterval} sub`
                      : "One-time"}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    ₦{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        statusStyles[payment.status] ??
                        "bg-gray-100 text-gray-600"
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
                      timeZone: "Africa/Lagos",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
