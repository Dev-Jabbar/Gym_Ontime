import { UserRole } from "@/features/dashboard/types";

interface QuickActionsProps {
  userRole: UserRole;
}

export const QuickActions = ({ userRole }: QuickActionsProps) => {
  const getActions = () => {
    switch (userRole) {
      case "admin":
        return [
          { label: "Create New Class", onClick: () => {} },
          { label: "Add New Member", onClick: () => {} },
        ];
      case "member":
        return [
          { label: "Book a Class", onClick: () => {} },
          { label: "View My Schedule", onClick: () => {} },
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
