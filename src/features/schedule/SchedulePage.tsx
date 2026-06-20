"use client";

import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { useSchedule, useClassFilters } from "./hooks/useSchedule";
import {
  DateNavigator,
  SearchFilter,
  ClassCard,
  EmptyState,
  BookingModal,
} from "./components";
import type { ScheduleProps, FilterStatus, Class } from "./types";

export function SchedulePage({
  userRole,
  userId,
  trainerProfileId,
}: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [bookingClass, setBookingClass] = useState<Class | null>(null);

  const { classes, loading } = useSchedule(selectedDate);
  const filteredClasses = useClassFilters(classes, filterStatus, searchQuery);

  const handlePreviousDay = () => {
    if (!selectedDate) return; // ✅ guard against null
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    if (!selectedDate) return; // ✅ guard against null
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate(null); // ✅ back to showing all
  };

  const handleBookClass = (classId: string) => {
    const cls = filteredClasses.find((c) => c.id === classId);
    if (cls) setBookingClass(cls);
  };

  const handleEditClass = (classId: string) => {
    console.log("Edit class:", classId);
  };

  const handleCancelClass = (classId: string) => {
    console.log("Cancel class:", classId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 mt-20">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Class Schedule
            </h1>
            <p className="text-gray-600 mt-2">
              Browse and book your favorite classes
            </p>
          </div>
          {userRole === "admin" && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <TbPlus className="w-5 h-5" />
              Create Class
            </button>
          )}
        </div>

        {/* Date Navigator & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <DateNavigator
              selectedDate={selectedDate}
              onPreviousDay={handlePreviousDay}
              onNextDay={handleNextDay}
              onDateChange={handleDateChange}
              onClearDate={handleClearDate} // ✅
            />

            <SearchFilter
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              onSearchChange={setSearchQuery}
              onFilterChange={setFilterStatus}
            />
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClasses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <ClassCard
                key={cls.id}
                classData={cls}
                userRole={userRole}
                onBook={handleBookClass}
                onEdit={handleEditClass}
                onCancel={handleCancelClass}
                trainerProfileId={trainerProfileId} // ✅ add this
              />
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {bookingClass && (
          <BookingModal
            classData={bookingClass}
            onClose={() => setBookingClass(null)}
          />
        )}
      </div>
    </div>
  );
}
