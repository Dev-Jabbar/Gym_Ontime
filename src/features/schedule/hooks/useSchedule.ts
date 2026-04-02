import { useState, useEffect } from "react";
import type { Class, FilterStatus } from "../types";

const MOCK_CLASSES: Class[] = [
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

export function useSchedule(selectedDate: Date) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      // TODO: Replace with real API call
      // const response = await fetch('/api/classes', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const data = await response.json();

      // Mock data
      setTimeout(() => {
        setClasses(MOCK_CLASSES);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setLoading(false);
    }
  };

  return { classes, loading };
}

export function useClassFilters(
  classes: Class[],
  filterStatus: FilterStatus,
  searchQuery: string,
) {
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

  useEffect(() => {
    filterClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes, filterStatus, searchQuery]);

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

  return filteredClasses;
}
