export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const formatFullDate = (date: Date | null): string => {
  if (!date) return "All Classes"; // ✅ handle null
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getStatusBadgeColor = (
  status: "upcoming" | "ongoing" | "completed" | "canceled",
): string => {
  const styles = {
    upcoming: "bg-blue-100 text-blue-700",
    ongoing: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-700",
    canceled: "bg-red-100 text-red-700",
  };
  return styles[status] || styles.upcoming;
};

export const getCapacityColor = (percentage: number): string => {
  if (percentage >= 90) return "bg-red-500";
  if (percentage >= 70) return "bg-orange-500";
  return "bg-green-500";
};
