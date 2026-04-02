import React from "react";
import { TbSearch } from "react-icons/tb";
import type { SearchFilterProps } from "../types";

export function SearchFilter({
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative">
        <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search classes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Status Filter */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value as any)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      >
        <option value="all">All Classes</option>
        <option value="upcoming">Upcoming</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
