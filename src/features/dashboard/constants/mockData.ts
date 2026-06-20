import { RecentSignup, UpcomingClass } from "@/features/dashboard/types";

export const MOCK_RECENT_SIGNUPS: RecentSignup[] = [
  {
    id: "1",
    name: "Christy",
    avatar: "/christy.png",
    joinedAt: "2 days ago",
    role: "member",
  },
  {
    id: "2",
    name: "helen micheal",
    avatar: "/helen micheal.jpg",
    joinedAt: "18 seconds ago",
    role: "member",
  },
  {
    id: "3",
    name: "john mark",
    avatar: "/john mark.png",
    joinedAt: "1 minute ago",
    role: "member",
  },
  {
    id: "4",
    name: "paul smith",
    avatar: "/paul smith.jpg",
    joinedAt: "1 hour ago",
    role: "member",
  },
  {
    id: "5",
    name: "trevor rowland",
    avatar: "/trevor rowland.jpg",
    joinedAt: "1 week ago",
    role: "member",
  },
  {
    id: "6",
    name: "ken ben",
    avatar: "/ken ben.jpg",
    joinedAt: "3 days ago",
    role: "member",
  },
  {
    id: "7",
    name: "helen micheal",
    avatar: "/helen micheal.jpg",
    joinedAt: "20 minutes ago",
    role: "member",
  },
  {
    id: "8",
    name: "rowland boy",
    avatar: "/paul smith.jpg",
    joinedAt: "5 hours ago",
    role: "member",
  },
  {
    id: "9",
    name: "Arnold swarzenneger",
    avatar: "/arnold.png",
    joinedAt: "5 seconds ago",
    role: "member",
  },
  {
    id: "10",
    name: "Christian",
    avatar: "/christy.png",
    joinedAt: "10 minutes ago",
    role: "member",
  },
];

export const INITIAL_STATS = {
  totalMembers: 1480,
  totalTrainers: 20,
  activeClasses: 45,
  revenue: 8500000,
  recentSignups: [],
  upcomingClasses: [],
  capacityUsage: 67,
  revenueData: [120000, 190000, 300000, 250000, 420000, 380000, 500000],
  // ✅ member-specific
  myUpcomingClasses: 3,
  myActiveSubscription: "Premium Plan",
  classesBookedThisMonth: 8,
};
