import { Doughnut } from "react-chartjs-2";

import {
  createCapacityChartData,
  capacityChartOptions,
} from "@/features/dashboard/config/chartConfig";

interface CapacityChartProps {
  capacityUsage: number;
}

export const CapacityChart = ({ capacityUsage }: CapacityChartProps) => {
  const chartData = createCapacityChartData(capacityUsage);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Capacity Usage</h2>
      <div className="h-48 flex items-center justify-center">
        <Doughnut data={chartData} options={capacityChartOptions} />
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Used</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
      </div>
    </div>
  );
};
