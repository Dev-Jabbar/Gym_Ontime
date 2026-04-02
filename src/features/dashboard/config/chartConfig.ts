import { ChartData, ChartOptions } from "chart.js";

export const createCapacityChartData = (
  capacityUsage: number,
): ChartData<"doughnut"> => ({
  labels: ["Used", "Available"],
  datasets: [
    {
      data: [capacityUsage, 100 - capacityUsage],
      backgroundColor: ["#10b981", "#e5e7eb"],
      borderWidth: 0,
    },
  ],
});

export const createRevenueChartData = (
  revenueData: number[],
): ChartData<"line"> => ({
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Revenue (₦)",
      data: revenueData,
      fill: true,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderColor: "#10b981",
      tension: 0.4,
    },
  ],
});

export const capacityChartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: { display: false },
  },
};

export const revenueChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => {
          const num = typeof value === "number" ? value : Number(value);
          return `₦${num / 1000}k`;
        },
      },
    },
  },
};
