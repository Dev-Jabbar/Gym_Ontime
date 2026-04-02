import React from "react";
import Image from "next/image";
import { TbClock } from "react-icons/tb";
import { getStatusBadgeColor, getCapacityColor } from "../utils/formatters";
import type { ClassCardProps } from "../types";

export function ClassCard({
  classData,
  userRole,
  onBook,
  onEdit,
  onCancel,
}: ClassCardProps) {
  const isFull = classData.enrolled >= classData.capacity;
  const capacityPercentage = (classData.enrolled / classData.capacity) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      {/* Status Badge */}
      <div className="p-4 pb-0 flex justify-between items-start">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(
            classData.status
          )}`}
        >
          {classData.status.charAt(0).toUpperCase() + classData.status.slice(1)}
        </span>
        {isFull && (
          <span className="text-xs px-3 py-1 rounded-full font-medium bg-red-100 text-red-700">
            Full
          </span>
        )}
      </div>

      <div className="p-6 pt-3">
        {/* Class Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {classData.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{classData.description}</p>

        {/* Time & Duration */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <TbClock className="w-4 h-4" />
            <span>
              {new Date(classData.schedule).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <span>•</span>
          <span>{classData.duration}</span>
        </div>

        {/* Trainer */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
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
        </div>

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
                capacityPercentage
              )}`}
              style={{ width: `${capacityPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Pricing */}
        {classData.pricing.oneTime && (
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
        {userRole === "member" && classData.status === "upcoming" && (
          <button
            onClick={() => onBook(classData.id)}
            disabled={isFull}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              isFull
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isFull ? "Class Full" : "Book Now"}
          </button>
        )}

        {userRole === "admin" && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(classData.id)}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onCancel?.(classData.id)}
              className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
