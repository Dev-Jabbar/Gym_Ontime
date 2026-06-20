export interface Class {
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

export type UserRole = "admin" | "trainer" | "member";

export type FilterStatus = "all" | "upcoming" | "ongoing" | "completed";

export interface ScheduleProps {
  userRole: UserRole;
  userId?: string;
  trainerProfileId?: string;
}

export interface ClassCardProps {
  classData: Class;
  userRole: UserRole;
  onBook: (classId: string) => void;
  onEdit?: (classId: string) => void;
  onCancel?: (classId: string) => void;
  trainerProfileId?: string;
}

export interface DateNavigatorProps {
  selectedDate: Date | null; //
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateChange: (date: Date) => void;
  onClearDate: () => void;
}

export interface SearchFilterProps {
  searchQuery: string;
  filterStatus: FilterStatus;
  onSearchChange: (query: string) => void;
  onFilterChange: (status: FilterStatus) => void;
}
