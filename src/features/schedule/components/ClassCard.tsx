import React, { useState } from "react";
import Image from "next/image";
import { TbClock, TbUsers, TbCheck } from "react-icons/tb";
import { getStatusBadgeColor, getCapacityColor } from "../utils/formatters";
import { getScheduleDisplay } from "../utils/scheduleDisplay";
import type { ClassCardProps } from "../types";
import { useRouter } from "next/navigation";
import { ClassDetailsModal } from "./ClassDetailsModal";

export function ClassCard({
  classData,
  userRole,
  onBook,
  onEdit,
  onCancel,
  trainerProfileId,
  isBooked,
}: ClassCardProps) {
  const isFull = classData.enrolled >= classData.capacity;
  const capacityPercentage = (classData.enrolled / classData.capacity) * 100;
  const router = useRouter();

  // Only classes with an image get the expand/collapse behavior — no
  // image means the card behaves exactly as it always did.
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isMyClass =
    userRole === "trainer" &&
    trainerProfileId &&
    classData.trainer.id === trainerProfileId;

  const handleCardClick = () => {
    if (classData.image) setExpanded((prev) => !prev);
  };

  // Buttons need to keep working normally without also toggling the
  // card — each one stops its click from bubbling up to the card.
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const statusBadge = (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(
        classData.status,
      )}`}
    >
      {classData.status.charAt(0).toUpperCase() + classData.status.slice(1)}
    </span>
  );

  const myClassBadge = isMyClass && (
    <span className="text-xs px-3 py-1 rounded-full font-medium bg-orange-100 text-orange-600">
      My Class
    </span>
  );

  const fullBadge = isFull && (
    <span className="text-xs px-3 py-1 rounded-full font-medium bg-red-100 text-red-700">
      Full
    </span>
  );

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${
        classData.image ? "cursor-pointer" : ""
      }`}
    >
      {classData.image ? (
        /* Image + badges overlaid on top of it. Height animates between
           a small "peek" strip (collapsed) and a full banner (expanded)
           — pure CSS transition, no layout measuring needed. */
        <div
          className={`relative w-full transition-all duration-300 ease-in-out ${
            expanded ? "h-32" : "h-8"
          }`}
        >
          <Image
            src={classData.image}
            alt={classData.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {statusBadge}
            {myClassBadge}
          </div>
          {fullBadge && (
            <div className="absolute top-3 right-3">{fullBadge}</div>
          )}
        </div>
      ) : (
        /* No image — original layout, completely unchanged. */
        <div className="p-4 pb-0 flex justify-between items-start">
          <div className="flex items-center gap-2">
            {statusBadge}
            {myClassBadge}
          </div>
          {fullBadge}
        </div>
      )}

      <div className="p-6 pt-3">
        {/* Class Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {classData.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{classData.description}</p>

        {/* Schedule — shows a specific date for one-off classes, or
            the recurrence pattern ("Every Mon, Wed, Fri") for recurring
            ones, since a calendar date is misleading for something
            that happens indefinitely. Replaces the old hardcoded date
            display plus the separate blue "Every Mon, Wed..." line
            below it, which duplicated this same information. */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <TbClock className="w-4 h-4" />
            <span>{getScheduleDisplay(classData)}</span>
          </div>
          <span>•</span>
          <span>{classData.duration}</span>
        </div>

        {/* Trainer — click to see class details, trainer bio, and
            enrolled members */}
        <button
          type="button"
          onClick={(e) => {
            stopPropagation(e);
            setShowDetails(true);
          }}
          className="w-full flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 text-left hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src={classData.trainer.avatar}
              alt={classData.trainer.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Trainer</p>
            <p className="text-sm font-semibold text-gray-900">
              {classData.trainer.name}
            </p>
          </div>
        </button>

        {/* Capacity */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Capacity</span>
            <span className="font-semibold text-gray-900">
              {classData.enrolled}/{classData.capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${getCapacityColor(
                capacityPercentage,
              )}`}
              style={{ width: `${capacityPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* ✅ Pricing — hidden for trainer */}
        {userRole !== "trainer" && classData.pricing.oneTime && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">From</p>
            <p className="text-2xl font-bold text-orange-500">
              ₦{classData.pricing.oneTime.toLocaleString()}
              <span className="text-sm text-gray-500 font-normal">
                /session
              </span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {userRole === "member" && (
          <>
            {isBooked ? (
              <div className="w-full py-3 rounded-lg font-medium bg-green-50 text-green-700 flex items-center justify-center gap-2">
                <TbCheck className="w-4 h-4" />
                Booked
              </div>
            ) : (
              classData.status === "upcoming" && (
                <button
                  onClick={(e) => {
                    stopPropagation(e);
                    onBook(classData.id);
                  }}
                  disabled={isFull}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isFull
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {isFull ? "Class Full" : "Book Now"}
                </button>
              )
            )}
          </>
        )}

        {userRole === "trainer" && isMyClass && (
          <button
            onClick={(e) => {
              stopPropagation(e);
              router.push(`/members?classId=${classData.id}`);
            }}
            className="w-full py-3 rounded-lg font-medium transition-colors bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2"
          >
            <TbUsers className="w-4 h-4" />
            View Members
          </button>
        )}

        {userRole === "admin" && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                stopPropagation(e);
                onEdit?.(classData.id);
              }}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                stopPropagation(e);
                onCancel?.(classData.id);
              }}
              className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {showDetails && (
        <ClassDetailsModal
          classData={classData}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}
