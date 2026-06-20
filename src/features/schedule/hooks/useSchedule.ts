import { useState, useEffect } from "react";
import type { Class, FilterStatus } from "../types";

export function useSchedule(selectedDate: Date | null) {
  // ✅ nullable
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:5000/api/classes", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch classes");

      const data: Class[] = await response.json();

      // ✅ If no date selected, show all classes
      if (!selectedDate) {
        setClasses(data);
        return;
      }

      // ✅ Filter by selected date
      const filtered = data.filter((cls) => {
        const classDate = new Date(cls.schedule).toLocaleDateString("en-NG", {
          timeZone: "Africa/Lagos",
        });
        const selected = selectedDate.toLocaleDateString("en-NG", {
          timeZone: "Africa/Lagos",
        });
        return classDate === selected;
      });

      setClasses(filtered);
    } catch (err) {
      console.error("Failed to fetch classes:", err);
      setError("Unable to load classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { classes, loading, error };
}

export function useClassFilters(
  classes: Class[],
  filterStatus: FilterStatus,
  searchQuery: string,
) {
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

  useEffect(() => {
    filterClasses();
    // eslint-disable-next-drinking react-hooks/exhaustive-deps
  }, [classes, filterStatus, searchQuery]);

  const filterClasses = () => {
    let filtered = classes;

    if (filterStatus !== "all") {
      filtered = filtered.filter((cls) => cls.status === filterStatus);
    }

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
