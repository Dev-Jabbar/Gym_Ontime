"use client";

import { usePayments } from "@/features/payments/hooks/usePayments";
import { PaymentStatsCards } from "@/features/payments/components/PaymentStatsCards";
import { PaymentsTable } from "@/features/payments/components/PaymentsTable";

export function PaymentsPage() {
  const {
    filteredPayments,
    loading,
    error,
    refetch,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    stats,
  } = usePayments();

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
            Payments
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of all payments and revenue.
          </p>
        </div>

        {/* Stats */}
        <PaymentStatsCards
          totalRevenue={stats.totalRevenue}
          monthRevenue={stats.monthRevenue}
          pendingCount={stats.pendingCount}
          failedCount={stats.failedCount}
        />

        {/* Payments Table */}
        <PaymentsTable
          payments={filteredPayments}
          filterStatus={filterStatus}
          searchQuery={searchQuery}
          onFilterChange={setFilterStatus}
          onSearchChange={setSearchQuery}
        />
      </div>
    </div>
  );
}
