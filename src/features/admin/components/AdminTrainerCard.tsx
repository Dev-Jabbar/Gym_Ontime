"use client";

import { useState } from "react";
import Image from "next/image";
import { TbTrash, TbCheck, TbX, TbBriefcase } from "react-icons/tb";
import type { AdminTrainer } from "@/features/admin/types";
import { getAvatarFallback } from "@/lib/getAvatarFallback";

interface AdminTrainerCardProps {
  trainer: AdminTrainer;
  isLoading: boolean;
  onDelete: (id: string) => Promise<boolean>;
}

export function AdminTrainerCard({
  trainer,
  isLoading,
  onDelete,
}: AdminTrainerCardProps) {
  const [confirming, setConfirming] = useState(false);

  const avatar = trainer.avatar ?? getAvatarFallback(trainer.name, 48);

  const joinedDate = new Date(trainer.createdAt).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });

  const handleConfirm = async () => {
    await onDelete(trainer._id);
    setConfirming(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-4">
      {/* next/image — Cloudinary + ui-avatars allowlisted in
          next.config.js. */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
        <Image
          src={avatar}
          alt={trainer.name}
          width={48}
          height={48}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{trainer.name}</p>
        <p className="text-sm text-gray-500 truncate">{trainer.email}</p>

        <div className="flex flex-wrap gap-3 mt-1">
          {trainer.specialty && (
            <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              <TbBriefcase className="w-3 h-3" />
              {trainer.specialty}
            </span>
          )}
          {trainer.experience != null && (
            <span className="text-xs text-gray-500">
              {trainer.experience} yr{trainer.experience !== 1 ? "s" : ""} exp
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-1">Joined {joinedDate}</p>

        <div className="mt-3">
          {confirming ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">
                Delete this trainer?
              </span>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md text-white bg-red-500 hover:bg-red-600 disabled:opacity-50"
              >
                <TbCheck className="w-3.5 h-3.5" />
                {isLoading ? "..." : "Confirm"}
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={isLoading}
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              >
                <TbX className="w-3.5 h-3.5" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
            >
              <TbTrash className="w-3.5 h-3.5" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
