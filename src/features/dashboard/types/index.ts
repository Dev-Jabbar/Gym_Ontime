export type UserRole = "admin" | "trainer" | "member";

export type ClassStatus = "upcoming" | "ongoing" | "completed";

export type MemberRole = "member" | "trainer";

export interface RecentSignup {
  id: string;
  name: string;
  avatar: string;
  joinedAt: string;
  role: MemberRole;
}

export interface UpcomingClass {
  id: string;
  name: string;
  time: string;
  date: string;
  trainer: {
    id: string;
    name: string;
    avatar: string;
  };
  capacity: number;
  enrolled: number;
  status: ClassStatus;
}

export interface DashboardStats {
  totalMembers: number;
  totalTrainers: number;
  activeClasses: number;
  revenue: number;
  recentSignups: RecentSignup[];
  upcomingClasses: UpcomingClass[];
  capacityUsage: number;
  revenueData: number[];
  // ✅ member-specific
  myUpcomingClasses: number;
  myActiveSubscription: string | null;
  classesBookedThisMonth: number;
}

export interface DashboardProps {
  userRole: UserRole;
}

export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface ClassCardProps {
  classData: UpcomingClass;
}
