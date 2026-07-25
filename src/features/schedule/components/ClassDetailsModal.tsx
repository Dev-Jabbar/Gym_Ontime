"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  TbX,
  TbClock,
  TbPhone,
  TbUser,
  TbHeart,
  TbStar,
  TbCertificate,
  TbChevronDown,
  TbMail,
  TbBriefcase,
} from "react-icons/tb";
import type { Class, ClassMember } from "../types";
import { getAvatarFallback } from "@/lib/getAvatarFallback";
import { getScheduleDisplay } from "../utils/scheduleDisplay";

interface ClassDetailsModalProps {
  classData: Class;
  onClose: () => void;
}

export function ClassDetailsModal({
  classData,
  onClose,
}: ClassDetailsModalProps) {
  const [members, setMembers] = useState<ClassMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [trainerExpanded, setTrainerExpanded] = useState(false);
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/classes/${classData.id}/members`,
          { credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to fetch members");

        const result = await res.json();
        setMembers(result.data?.members ?? []);
      } catch (err) {
        setError("Unable to load members for this class.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [classData.id]);

  const trainer = classData.trainer;
  const hasTrainerDetails =
    trainer.bio ||
    trainer.specialty ||
    trainer.phone ||
    trainer.experience != null ||
    (trainer.certifications && trainer.certifications.length > 0) ||
    trainer.availability;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {classData.name}
            </h2>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <TbClock className="w-3.5 h-3.5" />
              <span>{getScheduleDisplay(classData)}</span>
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
          {/* Trainer — click to expand */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Trainer
            </p>
            <button
              type="button"
              onClick={() => setTrainerExpanded((prev) => !prev)}
              disabled={!hasTrainerDetails}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left disabled:hover:bg-gray-50 disabled:cursor-default"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={trainer.avatar}
                  alt={trainer.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {trainer.name}
                </p>
                {trainer.specialty && (
                  <p className="text-xs text-gray-500 truncate">
                    {trainer.specialty}
                  </p>
                )}
              </div>
              {hasTrainerDetails && (
                <TbChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                    trainerExpanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {trainerExpanded && hasTrainerDetails && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-2 text-sm">
                {trainer.bio && <p className="text-gray-700">{trainer.bio}</p>}
                <div className="flex flex-wrap gap-3 pt-1">
                  {trainer.phone && (
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <TbPhone className="w-3.5 h-3.5" />
                      {trainer.phone}
                    </span>
                  )}
                  {trainer.experience != null && (
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <TbStar className="w-3.5 h-3.5" />
                      {trainer.experience} yr
                      {trainer.experience !== 1 ? "s" : ""} experience
                    </span>
                  )}
                  {trainer.availability && (
                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <TbClock className="w-3.5 h-3.5" />
                      {trainer.availability}
                    </span>
                  )}
                </div>
                {trainer.certifications &&
                  trainer.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full"
                        >
                          <TbCertificate className="w-3 h-3" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Members */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Members ({members.length}/{classData.capacity})
            </p>

            {loading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500" />
              </div>
            ) : error ? (
              <p className="text-sm text-red-500 text-center py-4">{error}</p>
            ) : members.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No members enrolled yet.
              </p>
            ) : (
              <div className="space-y-2">
                {members.map((member) => {
                  const isExpanded = expandedMemberId === member._id;
                  const hasMemberDetails =
                    member.phone || member.gender || member.fitnessGoal;
                  const avatar =
                    member.avatar ??
                    getAvatarFallback(member.userId?.name ?? "Member");

                  return (
                    <div key={member._id}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMemberId(isExpanded ? null : member._id)
                        }
                        disabled={!hasMemberDetails}
                        className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left disabled:hover:bg-gray-50 disabled:cursor-default"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <Image
                            src={avatar}
                            alt={member.userId?.name ?? "Member"}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {member.userId?.name ?? "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {member.userId?.email ?? ""}
                          </p>
                        </div>
                        {hasMemberDetails && (
                          <TbChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {isExpanded && hasMemberDetails && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg flex flex-wrap gap-3 text-xs">
                          {member.phone && (
                            <span className="flex items-center gap-1 text-gray-600">
                              <TbPhone className="w-3.5 h-3.5" />
                              {member.phone}
                            </span>
                          )}
                          {member.gender && (
                            <span className="flex items-center gap-1 text-gray-600">
                              <TbUser className="w-3.5 h-3.5" />
                              {member.gender}
                            </span>
                          )}
                          {member.fitnessGoal && (
                            <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                              <TbHeart className="w-3.5 h-3.5" />
                              {member.fitnessGoal.replace("_", " ")}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
