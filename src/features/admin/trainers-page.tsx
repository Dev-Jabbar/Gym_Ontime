"use client";

import { useState, useMemo } from "react";
import { TbUsers, TbSearch } from "react-icons/tb";
import { useAdminTrainers } from "@/features/admin/hooks/useAdminTrainers";
import { AdminTrainerCard } from "@/features/admin/components/AdminTrainerCard";

export function AdminTrainersPage() {
  const { trainers, loading, error, actionLoadingId, refetch, deleteTrainer } =
    useAdminTrainers();

  const [search, setSearch] = useState("");

  // Client-side filter — matches name, email, or specialty.
  const filteredTrainers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return trainers;

    return trainers.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.email.toLowerCase().includes(query) ||
        t.specialty?.toLowerCase().includes(query),
    );
  }, [trainers, search]);

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
        <div className="mb-8 mt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Manage Trainers
          </h1>
          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <TbUsers className="w-4 h-4" />
            {filteredTrainers.length} of {trainers.length} trainer
            {trainers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or specialty..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {filteredTrainers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            {trainers.length === 0
              ? "No trainers found."
              : "No trainers match your search."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrainers.map((trainer) => (
              <AdminTrainerCard
                key={trainer._id}
                trainer={trainer}
                isLoading={actionLoadingId === trainer._id}
                onDelete={deleteTrainer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
