import { Line } from "react-chartjs-2";

import {
  createRevenueChartData,
  revenueChartOptions,
} from "@/features/dashboard/config/chartConfig";

interface RevenueChartProps {
  revenueData: number[];
}

export const RevenueChart = ({ revenueData }: RevenueChartProps) => {
  const chartData = createRevenueChartData(revenueData);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Revenue</h2>
      <div className="h-64">
        <Line data={chartData} options={revenueChartOptions} />
      </div>
    </div>
  );
};
