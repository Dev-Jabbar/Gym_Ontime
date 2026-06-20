"use client";

import { TbUsers, TbCalendar } from "react-icons/tb";
import { useMembers } from "@/features/members/hooks/useMembers";
import { MemberCard } from "@/features/members/components/MemberCard";
import type { UserRole } from "@/features/dashboard/types";

interface MembersPageProps {
  userRole: UserRole;
  classId?: string | null;
}

export function MembersPage({ userRole, classId }: MembersPageProps) {
  const { classesWithMembers, loading, error, refetch } = useMembers(
    userRole,
    classId,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalMembers = classesWithMembers.reduce(
    (sum, cls) => sum + cls.members.length,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {classId ? "Class Members" : "Members"}
          </h1>
          <p className="text-gray-600 mt-2">
            {classId
              ? "Members enrolled in this class"
              : `${totalMembers} members across ${classesWithMembers.length} classes`}
          </p>
        </div>

        {/* Classes with Members */}
        <div className="space-y-8">
          {classesWithMembers.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              No classes found.
            </div>
          ) : (
            classesWithMembers.map((cls) => (
              <div
                key={cls.classId}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                {/* Class Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {cls.className}
                    </h2>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <TbCalendar className="w-4 h-4" />
                        {new Date(cls.schedule).toLocaleDateString("en-NG", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "Africa/Lagos",
                        })}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <TbUsers className="w-4 h-4" />
                        {cls.members.length}/{cls.capacity} enrolled
                      </span>
                    </div>
                  </div>
                </div>

                {/* Members Grid */}
                {cls.members.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No members enrolled in this class yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cls.members.map((member: any) => (
                      <MemberCard key={member._id} member={member} />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
