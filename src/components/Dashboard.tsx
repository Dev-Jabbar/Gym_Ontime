"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  TbUsers,
  TbCalendar,
  TbCurrencyNaira,
  TbTrendingUp,
  TbClock,
} from "react-icons/tb";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Types
interface DashboardStats {
  totalMembers: number;
  totalTrainers: number;
  activeClasses: number;
  revenue: number;
  recentSignups: RecentSignup[];
  upcomingClasses: UpcomingClass[];
  capacityUsage: number;
  revenueData: number[];
}

interface RecentSignup {
  id: string;
  name: string;
  avatar: string;
  joinedAt: string;
  role: "member" | "trainer";
}

interface UpcomingClass {
  id: string;
  name: string;
  time: string;
  trainer: string;
  capacity: number;
  enrolled: number;
  status: "upcoming" | "ongoing" | "completed";
}

interface DashboardProps {
  userRole: "admin" | "trainer" | "member";
}

export default function Dashboard({ userRole }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 1480,
    totalTrainers: 20,
    activeClasses: 45,
    revenue: 8500000,
    recentSignups: [],
    upcomingClasses: [],
    capacityUsage: 67,
    revenueData: [120000, 190000, 300000, 250000, 420000, 380000, 500000],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    fetchDashboardData();
  }, [userRole]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // const response = await fetch('/api/dashboard', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const data = await response.json();
      // setStats(data);

      // Mock data for now
      setTimeout(() => {
        setStats((prev) => ({
          ...prev,
          recentSignups: [
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
          ],
          upcomingClasses: [
            {
              id: "1",
              name: "Yoga class",
              time: "2:00 AM - 3:00 AM",
              trainer: "Susan wellson",
              capacity: 5,
              enrolled: 3,
              status: "upcoming",
            },
            {
              id: "2",
              name: "Pilates session",
              time: "10:00 AM - 11:00 AM",
              trainer: "Susan wellson",
              capacity: 8,
              enrolled: 8,
              status: "ongoing",
            },
            {
              id: "3",
              name: "Cardio workout",
              time: "3:30 PM - 4:30 PM",
              trainer: "Susan wellson",
              capacity: 12,
              enrolled: 9,
              status: "upcoming",
            },
            {
              id: "4",
              name: "Meditation class",
              time: "6:00 AM - 7:00 AM",
              trainer: "Susan wellson",
              capacity: 6,
              enrolled: 4,
              status: "upcoming",
            },
            {
              id: "5",
              name: "Zumba dance",
              time: "5:30 PM - 6:30 PM",
              trainer: "Susan wellson",
              capacity: 10,
              enrolled: 10,
              status: "ongoing",
            },
            {
              id: "6",
              name: "Strength training",
              time: "8:00 AM - 9:00 AM",
              trainer: "Susan wellson",
              capacity: 7,
              enrolled: 5,
              status: "upcoming",
            },
            {
              id: "7",
              name: "Spinning class",
              time: "1:00 PM - 2:00 PM",
              trainer: "Susan wellson",
              capacity: 9,
              enrolled: 7,
              status: "upcoming",
            },
            {
              id: "8",
              name: "Piloxing session",
              time: "4:00 PM - 5:00 PM",
              trainer: "Susan wellson",
              capacity: 8,
              enrolled: 8,
              status: "ongoing",
            },
            {
              id: "9",
              name: "HIIT workout",
              time: "9:30 AM - 10:30 AM",
              trainer: "Susan wellson",
              capacity: 5,
              enrolled: 5,
              status: "ongoing",
            },
            {
              id: "10",
              name: "Barre exercise",
              time: "7:30 PM - 8:30 PM",
              trainer: "Susan wellson",
              capacity: 10,
              enrolled: 6,
              status: "upcoming",
            },
            {
              id: "11",
              name: "Kickboxing",
              time: "12:00 PM - 1:00 PM",
              trainer: "Susan wellson",
              capacity: 10,
              enrolled: 8,
              status: "upcoming",
            },
            {
              id: "12",
              name: "Yoga for Beginners",
              time: "11:00 AM - 12:00 PM",
              trainer: "Susan wellson",
              capacity: 8,
              enrolled: 8,
              status: "ongoing",
            },
            {
              id: "13",
              name: "Prenatal Yoga",
              time: "6:30 AM - 7:30 AM",
              trainer: "Susan wellson",
              capacity: 4,
              enrolled: 2,
              status: "upcoming",
            },
            {
              id: "14",
              name: "Aerobics",
              time: "3:00 PM - 4:00 PM",
              trainer: "Susan wellson",
              capacity: 12,
              enrolled: 10,
              status: "upcoming",
            },
            {
              id: "15",
              name: "Functional Fitness",
              time: "7:00 AM - 8:00 AM",
              trainer: "Susan wellson",
              capacity: 10,
              enrolled: 10,
              status: "ongoing",
            },
            {
              id: "16",
              name: "Dance Fusion",
              time: "2:30 PM - 3:30 PM",
              trainer: "Susan wellson",
              capacity: 15,
              enrolled: 11,
              status: "upcoming",
            },
            {
              id: "17",
              name: "CrossFit",
              time: "5:00 PM - 6:00 PM",
              trainer: "Susan wellson",
              capacity: 12,
              enrolled: 9,
              status: "upcoming",
            },
            {
              id: "18",
              name: "Circuit Training",
              time: "8:30 AM - 9:30 AM",
              trainer: "Susan wellson",
              capacity: 8,
              enrolled: 8,
              status: "ongoing",
            },
            {
              id: "19",
              name: "Stretching Session",
              time: "1:30 PM - 2:30 PM",
              trainer: "Susan wellson",
              capacity: 6,
              enrolled: 4,
              status: "upcoming",
            },
            {
              id: "20",
              name: "Bodyweight Exercises",
              time: "4:30 PM - 5:30 PM",
              trainer: "Susan wellson",
              capacity: 10,
              enrolled: 7,
              status: "upcoming",
            },
            {
              id: "21",
              name: "High-Intensity Interval Training",
              time: "8:30 PM - 9:30 PM",
              trainer: "Susan wellson",
              capacity: 10,
              enrolled: 6,
              status: "upcoming",
            },
          ],
        }));
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setLoading(false);
    }
  };

  // Chart configurations
  const capacityData = {
    labels: ["Used", "Available"],
    datasets: [
      {
        data: [stats.capacityUsage, 100 - stats.capacityUsage],
        backgroundColor: ["#10b981", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue (₦)",
        data: stats.revenueData,
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "#10b981",
        tension: 0.4,
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {userRole === "admin" && "Admin Dashboard"}
            {userRole === "trainer" && "Trainer Dashboard"}
            {userRole === "member" && "My Dashboard"}
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<TbUsers className="w-8 h-8" />}
            title="Total Members"
            value={stats.totalMembers.toLocaleString()}
            change="+12%"
            positive
          />
          <StatCard
            icon={<TbCalendar className="w-8 h-8" />}
            title="Active Classes"
            value={stats.activeClasses.toString()}
            change="+5"
            positive
          />
          {userRole === "admin" && (
            <>
              <StatCard
                icon={<TbCurrencyNaira className="w-8 h-8" />}
                title="Monthly Revenue"
                value={`₦${(stats.revenue / 1000000).toFixed(1)}M`}
                change="+18%"
                positive
              />
              <StatCard
                icon={<TbTrendingUp className="w-8 h-8" />}
                title="Capacity Usage"
                value={`${stats.capacityUsage}%`}
                change="+3%"
                positive
              />
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart (Admin only) */}
            {userRole === "admin" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Weekly Revenue
                </h2>
                <div className="h-64">
                  <Line
                    data={revenueData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) => `₦${Number(value) / 1000}k`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}

            {/* Upcoming Classes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Today's Classes
                </h2>
                <Link
                  href="/schedule"
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-96 pr-1">
                {stats.upcomingClasses.map((cls) => (
                  <ClassCard key={cls.id} classData={cls} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Capacity Usage */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Capacity Usage
              </h2>
              <div className="h-48 flex items-center justify-center">
                <Doughnut
                  data={capacityData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "70%",
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Used</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
              </div>
            </div>

            {/* Recent Signups (Admin/Trainer only) */}
            {(userRole === "admin" || userRole === "trainer") && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Recent Signups
                </h2>
                <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
                  {stats.recentSignups.map((signup) => (
                    <div
                      key={signup.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={signup.avatar}
                          alt={signup.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {signup.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {signup.joinedAt}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          signup.role === "trainer"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {signup.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {userRole === "admin" && (
                  <>
                    <Link
                      href="/classes/new"
                      className="block w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
                    >
                      Create New Class
                    </Link>
                    <Link
                      href="/members"
                      className="block w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
                    >
                      Add New Member
                    </Link>
                    <Link
                      href="/payments"
                      className="block w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
                    >
                      View Payments
                    </Link>
                  </>
                )}
                {userRole === "member" && (
                  <>
                    <Link
                      href="/schedule"
                      className="block w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
                    >
                      Browse Classes
                    </Link>
                    <Link
                      href="/payments"
                      className="block w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
                    >
                      My Payments
                    </Link>
                    <Link
                      href="/payments#subscriptions"
                      className="block w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
                    >
                      My Subscriptions
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  title,
  value,
  change,
  positive,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
          {icon}
        </div>
        <span
          className={`text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mt-4">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

// Class Card Component
function ClassCard({ classData }: { classData: UpcomingClass }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const capacityPercentage = (classData.enrolled / classData.capacity) * 100;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            {classData.status === "ongoing" && (
              <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-400"></span>
            )}
            <h3 className="font-semibold text-gray-900">{classData.name}</h3>
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <TbClock className="w-4 h-4" />
            {classData.time}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
            classData.status,
          )}`}
        >
          {classData.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">Trainer: {classData.trainer}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all"
            style={{ width: `${capacityPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-600">
          {classData.enrolled}/{classData.capacity}
        </span>
      </div>
    </div>
  );
}
