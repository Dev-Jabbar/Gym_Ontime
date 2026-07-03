"use client";

import { useRouter } from "next/navigation";
import { UserRole } from "@/features/dashboard/types";

interface QuickActionsProps {
  userRole: UserRole;
}

export const QuickActions = ({ userRole }: QuickActionsProps) => {
  const router = useRouter();

  const getActions = () => {
    switch (userRole) {
      case "admin":
        return [
          {
            label: "Create New Class",
            // SchedulePage's CreateClassModal is opened via local state,
            // not its own route — so we navigate to /schedule with a
            // query param it checks on load to auto-open the modal.
            onClick: () => router.push("/schedule?action=create"),
          },
          {
            label: "Promote Member",
            // Sends admin to the members list, where Upgrade to Trainer
            // already works (built earlier) — real, working action,
            // unlike the old "Add New Member" which had nowhere to go.
            onClick: () => router.push("/admin/members"),
          },
        ];
      case "member":
        return [
          { label: "Book a Class", onClick: () => router.push("/schedule") },
          {
            label: "View My Schedule",
            onClick: () => router.push("/schedule"),
          },
        ];
      case "trainer":
        // Was previously missing entirely — trainers saw no Quick
        // Actions panel at all. These map to the two real pages a
        // trainer role has access to.
        return [
          {
            label: "View My Classes",
            onClick: () => router.push("/schedule"),
          },
          {
            label: "View My Members",
            onClick: () => router.push("/members"),
          },
        ];
      default:
        return [];
    }
  };

  const actions = getActions();

  if (actions.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-left transition-all"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
