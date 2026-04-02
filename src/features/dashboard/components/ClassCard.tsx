import { TbClock } from "react-icons/tb";
import { ClassCardProps } from "@/features/dashboard/types";
import {
  getStatusColor,
  calculateCapacityPercentage,
} from "@/features/dashboard/utils/helpers";

export const ClassCard = ({ classData }: ClassCardProps) => {
  const capacityPercentage = calculateCapacityPercentage(
    classData.enrolled,
    classData.capacity,
  );

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            {classData.status === "ongoing" && (
              <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-400"></span>
            )}
            <h3 className="font-semibold text-gray-900">{classData.name}</h3>
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <TbClock className="w-4 h-4" />
            {classData.time}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
            classData.status,
          )}`}
        >
          {classData.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">Trainer: {classData.trainer}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all"
            style={{ width: `${capacityPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-600">
          {classData.enrolled}/{classData.capacity}
        </span>
      </div>
    </div>
  );
};
