import Image from "next/image";
import { RecentSignup } from "@/features/dashboard/types";
import { getRoleBadgeColor } from "@/features/dashboard/utils/helpers";

interface RecentSignupsProps {
  signups: RecentSignup[];
}

export const RecentSignups = ({ signups }: RecentSignupsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Signups</h2>
      <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
        {signups.map((signup) => (
          <div
            key={signup.id}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={signup.avatar}
                alt={signup.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {signup.name}
              </p>
              <p className="text-xs text-gray-500">{signup.joinedAt}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(
                signup.role
              )}`}
            >
              {signup.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
