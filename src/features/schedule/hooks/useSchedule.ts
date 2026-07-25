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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classes`,
        {
          credentials: "include",
        },
      );

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

  return { classes, loading, error, refetch: fetchClasses };
}

// Ongoing first (what's happening right now matters most), then
// Upcoming, then Completed/Canceled last — same priority order
// already used for the Dashboard's "Recent & Upcoming" list, just
// applied here too for consistency across the app.
const STATUS_PRIORITY: Record<string, number> = {
  ongoing: 0,
  upcoming: 1,
  completed: 2,
  canceled: 3,
};

export function useClassFilters(
  classes: Class[],
  filterStatus: FilterStatus,
  searchQuery: string,
  bookedClassIds: Set<string> = new Set(),
) {
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

  useEffect(() => {
    filterClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes, filterStatus, searchQuery, bookedClassIds]);

  const filterClasses = () => {
    let filtered = classes;

    if (filterStatus === "booked") {
      // Not a real class status — "booked" means "this classId is in
      // the member's own bookedClassIds set", regardless of whether
      // the class itself is currently upcoming/ongoing/completed.
      filtered = filtered.filter((cls) => bookedClassIds.has(cls.id));
    } else if (filterStatus !== "all") {
      filtered = filtered.filter((cls) => cls.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cls.trainer.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by status priority first, then chronologically within each
    // group (soonest/most-relevant first) so it's not just grouped but
    // sensibly ordered inside each group too.
    const sorted = [...filtered].sort((a, b) => {
      const priorityDiff =
        (STATUS_PRIORITY[a.status] ?? 99) - (STATUS_PRIORITY[b.status] ?? 99);
      if (priorityDiff !== 0) return priorityDiff;

      return new Date(a.schedule).getTime() - new Date(b.schedule).getTime();
    });

    setFilteredClasses(sorted);
  };

  return filteredClasses;
}
