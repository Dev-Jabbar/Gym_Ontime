import React from "react";
import { TbCalendar } from "react-icons/tb";

export function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
        <TbCalendar className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No classes found
      </h3>
      <p className="text-gray-600">
        Try adjusting your filters or select a different date
      </p>
    </div>
  );
}
