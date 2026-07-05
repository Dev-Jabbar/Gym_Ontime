"use client";

import { useState } from "react";
import Image from "next/image";
import { TbArrowUpCircle, TbTrash, TbCheck, TbX } from "react-icons/tb";
import type { AdminUser } from "@/features/admin/types";
import { getAvatarFallback } from "@/lib/getAvatarFallback";

interface AdminMemberCardProps {
  member: AdminUser;
  isLoading: boolean;
  onUpgrade: (id: string) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

type ConfirmState = "upgrade" | "delete" | null;

export function AdminMemberCard({
  member,
  isLoading,
  onUpgrade,
  onDelete,
}: AdminMemberCardProps) {
  const [confirming, setConfirming] = useState<ConfirmState>(null);

  const avatar = member.avatar ?? getAvatarFallback(member.name, 48);

  const joinedDate = new Date(member.createdAt).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });

  const handleConfirm = async () => {
    if (confirming === "upgrade") await onUpgrade(member._id);
    if (confirming === "delete") await onDelete(member._id);
    setConfirming(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-4">
      {/* Avatar — now next/image, since Cloudinary + ui-avatars are
          allowlisted in next.config.js. Any pre-Cloudinary avatar URL
          saved from an arbitrary source would still crash this; worth
          a data check if that ever resurfaces. */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
        <Image
          src={avatar}
          alt={member.name}
          width={48}
          height={48}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{member.name}</p>
        <p className="text-sm text-gray-500 truncate">{member.email}</p>
        <p className="text-xs text-gray-400 mt-1">Joined {joinedDate}</p>

        {/* Actions */}
        <div className="mt-3">
          {confirming ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">
                {confirming === "upgrade"
                  ? "Upgrade to trainer?"
                  : "Delete this member?"}
              </span>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md text-white disabled:opacity-50 ${
                  confirming === "delete"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                <TbCheck className="w-3.5 h-3.5" />
                {isLoading ? "..." : "Confirm"}
              </button>
              <button
                onClick={() => setConfirming(null)}
                disabled={isLoading}
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              >
                <TbX className="w-3.5 h-3.5" />
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirming("upgrade")}
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-orange-50 text-orange-600 hover:bg-orange-100"
              >
                <TbArrowUpCircle className="w-3.5 h-3.5" />
                Upgrade to Trainer
              </button>
              <button
                onClick={() => setConfirming("delete")}
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
              >
                <TbTrash className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
