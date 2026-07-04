export type RecurrenceType = "none" | "daily" | "weekly" | "monthly";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Class {
  id: string;
  name: string;
  description: string;
  schedule: string;
  trainer: {
    id: string;
    // The User._id behind this TrainerProfile — needed to pre-select
    // the correct option in a <select> dropdown that's keyed by
    // User._id (matching how the admin trainer list is built).
    userId: string;
    name: string;
    avatar: string;
  };
  pricing: {
    oneTime?: number;
    weekly?: number;
    monthly?: number;
    quarterly?: number;
    biannual?: number;
    yearly?: number;
  };
  capacity: number;
  enrolled: number;
  status: "upcoming" | "ongoing" | "completed" | "canceled";
  duration: string;
  recurrence: RecurrenceType; // ✅
  recurrenceDays: DayOfWeek[]; // ✅
  // Optional banner image (Cloudinary URL) — null/undefined means the
  // card renders without a banner, not an error state.
  image?: string | null;
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
  selectedDate: Date | null;
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
