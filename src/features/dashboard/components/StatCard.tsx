import { StatCardProps } from "@/features/dashboard/types";

export const StatCard = ({
  icon,
  title,
  value,
  change,
  positive,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
          {icon}
        </div>
        <span
          className={`text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mt-4">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
};
