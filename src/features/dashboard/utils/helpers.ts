import { ClassStatus } from "@/features/dashboard/types";

export const getStatusColor = (status: ClassStatus): string => {
  switch (status) {
    case "ongoing":
      return "bg-green-100 text-green-700";
    case "upcoming":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const calculateCapacityPercentage = (
  enrolled: number,
  capacity: number,
): number => {
  return (enrolled / capacity) * 100;
};

export const formatRevenue = (revenue: number): string => {
  return `₦${(revenue / 1000000).toFixed(1)}M`;
};

export const getRoleBadgeColor = (role: "member" | "trainer"): string => {
  return role === "trainer"
    ? "bg-orange-100 text-orange-700"
    : "bg-green-100 text-green-700";
};
