import React, { useRef } from "react";
import { TbCalendar, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { formatFullDate } from "../utils/formatters";
import type { DateNavigatorProps } from "../types";

export function DateNavigator({
  selectedDate,
  onPreviousDay,
  onNextDay,
  onDateChange,
  onClearDate,
}: DateNavigatorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onDateChange(new Date(e.target.value));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPreviousDay}
        disabled={!selectedDate}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30"
        aria-label="Previous day"
      >
        <TbChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <div
        className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors relative"
        onClick={() => inputRef.current?.showPicker()}
      >
        <TbCalendar className="w-5 h-5 text-orange-500" />
        <span className="font-semibold text-gray-900">
          {formatFullDate(selectedDate)}
        </span>
        {/* Hidden date input */}
        <input
          ref={inputRef}
          type="date"
          className="absolute inset-0 opacity-0 cursor-pointer w-full"
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""} // ✅ handle null
          onChange={handleDateChange}
        />
      </div>

      <button
        onClick={onNextDay}
        disabled={!selectedDate}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30"
        aria-label="Next day"
      >
        <TbChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* ✅ Show All button — only visible when a date is selected */}
      {selectedDate && (
        <button
          onClick={onClearDate}
          className="text-sm text-orange-500 hover:text-orange-600 font-medium underline"
        >
          Show All
        </button>
      )}
    </div>
  );
}
