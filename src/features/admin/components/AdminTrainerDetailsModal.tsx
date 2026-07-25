"use client";

import { useState, useEffect } from "react";
import {
  TbX,
  TbPhone,
  TbStar,
  TbCertificate,
  TbClock,
  TbNotes,
  TbCalendar,
} from "react-icons/tb";
import { getAvatarFallback } from "@/lib/getAvatarFallback";
import { getScheduleDisplay } from "@/features/schedule/utils/scheduleDisplay";
import type { AdminTrainer } from "@/features/admin/types";

interface TaughtClass {
  id: string;
  name: string;
  schedule: string;
  recurrence: string;
  recurrenceDays?: string[];
  status: string;
  trainer: { userId: string };
}

interface AdminTrainerDetailsModalProps {
  trainer: AdminTrainer;
  onClose: () => void;
}

export function AdminTrainerDetailsModal({
  trainer,
  onClose,
}: AdminTrainerDetailsModalProps) {
  const [classes, setClasses] = useState<TaughtClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch classes");

        const data: TaughtClass[] = await res.json();
        const taught = data.filter(
          (cls) => cls.trainer?.userId === trainer._id,
        );
        setClasses(taught);
      } catch (err) {
        setError("Unable to load classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [trainer._id]);

  const avatar = trainer.avatar ?? getAvatarFallback(trainer.name, 64);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={avatar}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {trainer.name}
              </h2>
              <p className="text-sm text-gray-500">{trainer.email}</p>
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
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Profile
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {trainer.bio && (
                <p className="text-sm text-gray-600">{trainer.bio}</p>
              )}
              {trainer.specialty && (
                <span className="flex items-center gap-2 text-sm text-orange-600">
                  <TbStar className="w-4 h-4" />
                  {trainer.specialty}
                </span>
              )}
              {trainer.experience != null && (
                <span className="text-sm text-gray-700">
                  {trainer.experience} year
                  {trainer.experience !== 1 ? "s" : ""} of experience
                </span>
              )}
              {trainer.phone && (
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <TbPhone className="w-4 h-4 text-gray-400" />
                  {trainer.phone}
                </span>
              )}
              {trainer.certifications && trainer.certifications.length > 0 && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <TbCertificate className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>{trainer.certifications.join(", ")}</span>
                </div>
              )}
              {trainer.availability && (
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <TbClock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>Available: {trainer.availability}</span>
                </div>
              )}
              {!trainer.bio &&
                !trainer.specialty &&
                trainer.experience == null &&
                !trainer.phone &&
                (!trainer.certifications ||
                  trainer.certifications.length === 0) &&
                !trainer.availability && (
                  <p className="text-sm text-gray-400">
                    No profile details set yet.
                  </p>
                )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <TbCalendar className="w-4 h-4" />
              Classes Taught ({classes.length})
            </h3>

            {loading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500" />
              </div>
            ) : error ? (
              <p className="text-sm text-red-500 text-center py-4">{error}</p>
            ) : classes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                Not assigned to any classes yet.
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
                        <TbNotes className="w-3 h-3" />
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
