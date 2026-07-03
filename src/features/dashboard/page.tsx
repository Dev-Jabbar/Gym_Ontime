"use client";

import "@/features/dashboard/config/chartInit";

import Link from "next/link";
import {
  TbUsers,
  TbCalendar,
  TbCurrencyNaira,
  TbTrendingUp,
} from "react-icons/tb";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import {
  StatCard,
  ClassCard,
  CapacityChart,
  RevenueChart,
  RecentSignups,
  QuickActions,
} from "@/features/dashboard/components";
import type { DashboardProps } from "@/features/dashboard/types";

export function DashboardPage({ userRole }: DashboardProps) {
  const { stats, loading } = useDashboard(userRole);

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
        <div className="mb-8 mt-20">
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
          {userRole === "admin" && (
            <>
              <StatCard
                icon={<TbUsers className="w-8 h-8" />}
                title="Total Members"
                value={stats.totalMembers.toLocaleString()}
                change=""
                positive
              />

              <StatCard
                icon={<TbCalendar className="w-8 h-8" />}
                title="Active Classes"
                value={stats.activeClasses.toString()}
                change=""
                positive
              />
              <StatCard
                icon={<TbCurrencyNaira className="w-8 h-8" />}
                title="Revenue (Last 30 Days)"
                value={`₦${(stats.revenue / 1000000).toFixed(1)}M`}
                change=""
                positive
              />
              <StatCard
                icon={<TbTrendingUp className="w-8 h-8" />}
                title="Capacity Usage"
                value={`${stats.capacityUsage}%`}
                change=""
                positive
              />
            </>
          )}

          {userRole === "member" && (
            <>
              <StatCard
                icon={<TbCalendar className="w-8 h-8" />}
                title="My Upcoming Classes"
                value={stats.myUpcomingClasses.toString()}
                change=""
                positive
              />
              <StatCard
                icon={<TbCurrencyNaira className="w-8 h-8" />}
                title="My Active Subscription"
                value={stats.myActiveSubscription ?? "None"}
                change=""
                positive
              />
              <StatCard
                icon={<TbTrendingUp className="w-8 h-8" />}
                title="Classes Booked This Month"
                value={stats.classesBookedThisMonth.toString()}
                change=""
                positive
              />
            </>
          )}

          {userRole === "trainer" && (
            <>
              <StatCard
                icon={<TbUsers className="w-8 h-8" />}
                title="My Members"
                value={stats.totalMembers.toLocaleString()}
                change=""
                positive
              />
              <StatCard
                icon={<TbCalendar className="w-8 h-8" />}
                title="My Active Classes"
                value={stats.activeClasses.toString()}
                change=""
                positive
              />
              <StatCard
                icon={<TbTrendingUp className="w-8 h-8" />}
                title="Capacity Usage"
                value={`${stats.capacityUsage}%`}
                change=""
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
              <RevenueChart revenueData={stats.revenueData} />
            )}

            {/* Upcoming Classes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent & Upcoming
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
            <CapacityChart capacityUsage={stats.capacityUsage} />

            {/* Recent Signups (Admin/Trainer only) */}
            {userRole === "admin" && (
              <RecentSignups signups={stats.recentSignups} />
            )}

            {/* Quick Actions */}
            <QuickActions userRole={userRole} />
          </div>
        </div>
      </div>
    </div>
  );
}
