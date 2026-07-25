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
    userId: string;
    name: string;
    avatar: string;
    bio?: string | null;
    specialty?: string | null;
    phone?: string | null;
    experience?: number | null;
    certifications?: string[];
    availability?: string | null;
  };
  pricing: {
    oneTime?: number;
    weekly?: number;
    monthly?: number;
    threeMonths?: number;
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

export interface ClassMember {
  _id: string;
  avatar?: string | null;
  phone?: string;
  gender?: string;
  fitnessGoal?: string;
  isActive: boolean;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}

export type UserRole = "admin" | "trainer" | "member";
export type FilterStatus =
  | "all"
  | "upcoming"
  | "ongoing"
  | "completed"
  | "booked";

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
  // Whether the current member already has valid access to this class
  // (completed one-time payment, or an active non-expired subscription).
  // Undefined/omitted for non-member roles, where it's irrelevant.
  isBooked?: boolean;
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
  userRole: UserRole;
  onSearchChange: (query: string) => void;
  onFilterChange: (status: FilterStatus) => void;
}
