"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  TbCalendar,
  TbClock,
  TbUsers,
  TbFilter,
  TbSearch,
  TbPlus,
  TbChevronLeft,
  TbChevronRight,
} from "react-icons/tb";

// Types
interface Class {
  id: string;
  name: string;
  description: string;
  schedule: string;
  trainer: {
    id: string;
    name: string;
    avatar: string;
  };
  pricing: {
    oneTime?: number;
    weekly?: number;
    monthly?: number;
    yearly?: number;
  };
  capacity: number;
  enrolled: number;
  status: "upcoming" | "ongoing" | "completed" | "canceled";
  duration: string;
}

interface ScheduleProps {
  userRole: "admin" | "trainer" | "member";
  userId?: string;
}

export default function Schedule({ userRole, userId }: ScheduleProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchClasses();
    filteredClasses;
  }, [selectedDate]);

  useEffect(() => {
    filterClasses();
  }, [classes, filterStatus, searchQuery]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      // TODO: Replace with real API call
      // const response = await fetch('/api/classes', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const data = await response.json();

      // Mock data
      const mockClasses: Class[] = [
        {
          id: "1",
          name: "Morning Yoga",
          description: "Start your day with peaceful yoga",
          schedule: "2026-02-02T08:00:00Z",
          trainer: {
            id: "t1",
            name: "Sarah Johnson",
            avatar: "/trainer2.jpg",
          },
          pricing: {
            oneTime: 5000,
            weekly: 15000,
            monthly: 50000,
          },
          capacity: 20,
          enrolled: 15,
          status: "upcoming",
          duration: "60 min",
        },
        {
          id: "2",
          name: "HIIT Training",
          description: "High-intensity interval training",
          schedule: "2026-02-02T10:00:00Z",
          trainer: {
            id: "t2",
            name: "Mike Ross",
            avatar: "/jabbar2.jpg",
          },
          pricing: {
            oneTime: 8000,
            monthly: 80000,
          },
          capacity: 15,
          enrolled: 15,
          status: "ongoing",
          duration: "45 min",
        },
        {
          id: "3",
          name: "Evening Pilates",
          description: "Strengthen your core",
          schedule: "2026-02-02T18:00:00Z",
          trainer: {
            id: "t1",
            name: "Sarah Johnson",
            avatar: "/trainer2.jpg",
          },
          pricing: {
            oneTime: 6000,
            weekly: 20000,
            monthly: 60000,
          },
          capacity: 12,
          enrolled: 8,
          status: "upcoming",
          duration: "60 min",
        },
      ];

      setClasses(mockClasses);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setLoading(false);
    }
  };

  const filterClasses = () => {
    let filtered = classes;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((cls) => cls.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cls.trainer.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredClasses(filtered);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 ">
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
            {/* Date Navigator */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePreviousDay}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <TbChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <TbCalendar className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <button
                onClick={handleNextDay}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <TbChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Classes</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClasses.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <ClassCard
                key={cls.id}
                classData={cls}
                userRole={userRole}
                onBook={() => console.log("Book class:", cls.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Class Card Component
function ClassCard({
  classData,
  userRole,
  onBook,
}: {
  classData: Class;
  userRole: string;
  onBook: () => void;
}) {
  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: "bg-blue-100 text-blue-700",
      ongoing: "bg-green-100 text-green-700",
      completed: "bg-gray-100 text-gray-700",
      canceled: "bg-red-100 text-red-700",
    };
    return styles[status as keyof typeof styles] || styles.upcoming;
  };

  const isFull = classData.enrolled >= classData.capacity;
  const capacityPercentage = (classData.enrolled / classData.capacity) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      {/* Status Badge */}
      <div className="p-4 pb-0 flex justify-between items-start">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(
            classData.status,
          )}`}
        >
          {classData.status.charAt(0).toUpperCase() + classData.status.slice(1)}
        </span>
        {isFull && (
          <span className="text-xs px-3 py-1 rounded-full font-medium bg-red-100 text-red-700">
            Full
          </span>
        )}
      </div>

      <div className="p-6 pt-3">
        {/* Class Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {classData.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{classData.description}</p>

        {/* Time & Duration */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <TbClock className="w-4 h-4" />
            <span>
              {new Date(classData.schedule).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <span>•</span>
          <span>{classData.duration}</span>
        </div>

        {/* Trainer */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={classData.trainer.avatar}
              alt={classData.trainer.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Trainer</p>
            <p className="text-sm font-semibold text-gray-900">
              {classData.trainer.name}
            </p>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Capacity</span>
            <span className="font-semibold text-gray-900">
              {classData.enrolled}/{classData.capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                capacityPercentage >= 90
                  ? "bg-red-500"
                  : capacityPercentage >= 70
                    ? "bg-orange-500"
                    : "bg-green-500"
              }`}
              style={{ width: `${capacityPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Pricing */}
        {classData.pricing.oneTime && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">From</p>
            <p className="text-2xl font-bold text-orange-500">
              ₦{classData.pricing.oneTime.toLocaleString()}
              <span className="text-sm text-gray-500 font-normal">
                /session
              </span>
            </p>
          </div>
        )}

        {/* Action Button */}
        {userRole === "member" && classData.status === "upcoming" && (
          <button
            onClick={onBook}
            disabled={isFull}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              isFull
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isFull ? "Class Full" : "Book Now"}
          </button>
        )}

        {userRole === "admin" && (
          <div className="flex gap-2">
            <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Edit
            </button>
            <button className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
