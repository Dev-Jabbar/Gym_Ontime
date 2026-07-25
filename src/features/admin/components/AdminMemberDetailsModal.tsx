"use client";

import { useState, useEffect } from "react";
import {
  TbX,
  TbPhone,
  TbUser,
  TbHeart,
  TbNotes,
  TbAlertCircle,
  TbCalendar,
  TbClock,
} from "react-icons/tb";
import { getAvatarFallback } from "@/lib/getAvatarFallback";
import { getScheduleDisplay } from "@/features/schedule/utils/scheduleDisplay";
import type { AdminUser } from "@/features/admin/types";

interface JoinedClass {
  id: string;
  name: string;
  schedule: string;
  recurrence: string;
  recurrenceDays?: string[];
  status: string;
}

interface AdminMemberDetailsModalProps {
  member: AdminUser;
  onClose: () => void;
}

export function AdminMemberDetailsModal({
  member,
  onClose,
}: AdminMemberDetailsModalProps) {
  const [classes, setClasses] = useState<JoinedClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!member.memberProfileId) {
      setLoading(false);
      return;
    }

    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/classes/by-member/${member.memberProfileId}`,
          { credentials: "include" },
        );

        if (!res.ok) throw new Error("Failed to fetch classes");

        const data = await res.json();
        setClasses(data.data ?? []);
      } catch (err) {
        setError("Unable to load classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [member.memberProfileId]);

  const avatar = member.avatar ?? getAvatarFallback(member.name, 64);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Profile
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {member.phone && (
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <TbPhone className="w-4 h-4 text-gray-400" />
                  {member.phone}
                </span>
              )}
              {member.gender && (
                <span className="flex items-center gap-2 text-sm text-gray-700 capitalize">
                  <TbUser className="w-4 h-4 text-gray-400" />
                  {member.gender}
                </span>
              )}
              {member.fitnessGoal && (
                <span className="flex items-center gap-2 text-sm text-orange-600">
                  <TbHeart className="w-4 h-4" />
                  {member.fitnessGoal.replace("_", " ")}
                </span>
              )}
              {member.healthNotes && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <TbNotes className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>{member.healthNotes}</span>
                </div>
              )}
              {member.emergencyContact?.name && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <TbAlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Emergency: {member.emergencyContact.name} —{" "}
                    {member.emergencyContact.phone}
                  </span>
                </div>
              )}
              {!member.phone &&
                !member.gender &&
                !member.fitnessGoal &&
                !member.healthNotes &&
                !member.emergencyContact?.name && (
                  <p className="text-sm text-gray-400">
                    No profile details set yet.
                  </p>
                )}
            </div>
          </div>

          {/* Classes joined */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <TbCalendar className="w-4 h-4" />
              Classes Joined ({classes.length})
            </h3>

            {loading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500" />
              </div>
            ) : error ? (
              <p className="text-sm text-red-500 text-center py-4">{error}</p>
            ) : classes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                Not enrolled in any classes yet.
              </p>
            ) : (
              <div className="space-y-2">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {cls.name}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <TbClock className="w-3 h-3" />
                        {getScheduleDisplay(cls)}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-600 capitalize">
                      {cls.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
