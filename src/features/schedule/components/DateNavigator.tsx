import React from "react";
import { TbCalendar, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { formatFullDate } from "../utils/formatters";
import type { DateNavigatorProps } from "../types";

export function DateNavigator({
  selectedDate,
  onPreviousDay,
  onNextDay,
}: DateNavigatorProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPreviousDay}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Previous day"
      >
        <TbChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
        <TbCalendar className="w-5 h-5 text-orange-500" />
        <span className="font-semibold text-gray-900">
          {formatFullDate(selectedDate)}
        </span>
      </div>
      <button
        onClick={onNextDay}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Next day"
      >
        <TbChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
}
