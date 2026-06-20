"use client";

import { useSubscriptions } from "@/features/subscriptions/hooks/useSubscriptions";
import { SubscriptionCard } from "@/features/subscriptions/components/SubscriptionCard";
import { PaymentHistoryTable } from "@/features/subscriptions/components/PaymentHistoryTable";

export function SubscriptionsPage() {
  const { payments, loading, error, refetch } = useSubscriptions();

  const activeSubscriptions = payments.filter(
    (p) => p.paymentType === "subscription" && p.subscription,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Subscriptions
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your active subscriptions and view payment history.
          </p>
        </div>

        {/* Active Subscriptions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Active Subscriptions
          </h2>

          {activeSubscriptions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
              You have no active subscriptions.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSubscriptions.map((payment) => (
                <SubscriptionCard key={payment._id} payment={payment} />
              ))}
            </div>
          )}
        </div>

        {/* Payment History */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Payment History
          </h2>
          <PaymentHistoryTable payments={payments} />
        </div>
      </div>
    </div>
  );
}
