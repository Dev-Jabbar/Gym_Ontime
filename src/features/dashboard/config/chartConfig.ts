import { ChartData, ChartOptions } from "chart.js";

/**
 * Doughnut chart showing % of class capacity filled. Takes a single
 * 0-100 percentage and derives the two slices ("Used" / "Available")
 * from it directly — no raw enrolled/capacity numbers needed here,
 * that division already happened wherever `capacityUsage` was computed.
 */
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

/**
 * Line chart of the last 7 days of revenue. The Mon–Sun labels are
 * fixed and NOT derived from `revenueData` — they assume the backend
 * always returns exactly 7 values in calendar-week order. If that
 * ever changes (e.g. to a rolling "last 7 days ending today" window
 * instead of a fixed calendar week), these labels would need to
 * become dynamic too, or they'll silently mislabel the data.
 */
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
        // Abbreviates the y-axis to "₦12k" style instead of full
        // naira figures, since axis tick labels have very little
        // horizontal room.
        callback: (value) => {
          const num = typeof value === "number" ? value : Number(value);
          return `₦${num / 1000}k`;
        },
      },
    },
  },
};
