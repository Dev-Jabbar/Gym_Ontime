"use client";

import Image from "next/image";
import { TbPhone, TbHeart, TbUser } from "react-icons/tb";
import type { MemberProfile } from "@/features/members/types";
import { getAvatarFallback } from "@/lib/getAvatarFallback";

interface MemberCardProps {
  member: MemberProfile;
}

export function MemberCard({ member }: MemberCardProps) {
  const avatar =
    member.avatar ?? getAvatarFallback(member.userId?.name ?? "Member");

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-4">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
        <Image
          src={avatar}
          alt={member.userId?.name ?? "Member"}
          width={48}
          height={48}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">
          {member.userId?.name ?? "Unknown"}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {member.userId?.email ?? ""}
        </p>

        <div className="flex flex-wrap gap-3 mt-2">
          {member.phone && (
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <TbPhone className="w-3 h-3" />
              {member.phone}
            </span>
          )}
          {member.gender && (
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <TbUser className="w-3 h-3" />
              {member.gender}
            </span>
          )}
          {member.fitnessGoal && (
            <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              <TbHeart className="w-3 h-3" />
              {member.fitnessGoal.replace("_", " ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
