import {
  TbCurrencyNaira,
  TbClock,
  TbCircleX,
  TbTrendingUp,
} from "react-icons/tb";

interface PaymentStatsCardsProps {
  totalRevenue: number;
  monthRevenue: number;
  pendingCount: number;
  failedCount: number;
}

export function PaymentStatsCards({
  totalRevenue,
  monthRevenue,
  pendingCount,
  failedCount,
}: PaymentStatsCardsProps) {
  const cards = [
    {
      icon: <TbCurrencyNaira className="w-8 h-8" />,
      title: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: <TbTrendingUp className="w-8 h-8" />,
      title: "This Month",
      value: `₦${monthRevenue.toLocaleString()}`,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: <TbClock className="w-8 h-8" />,
      title: "Pending",
      value: pendingCount.toString(),
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      icon: <TbCircleX className="w-8 h-8" />,
      title: "Failed",
      value: failedCount.toString(),
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-sm p-6">
          <div
            className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center mb-4 ${card.color}`}
          >
            {card.icon}
          </div>
          <p className="text-sm text-gray-500">{card.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
