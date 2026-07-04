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
        {signups.map((signup) => {
          // Real signups can have avatar: null (User docs don't carry
          // an avatar field — it lives on the profile models instead),
          // so fall back to a generated avatar rather than pass null
          // to an <Image> src.
          const avatarSrc =
            signup.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              signup.name,
            )}&background=random&color=fff&size=40`;

          return (
            <div
              key={signup.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={avatarSrc}
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
                  signup.role,
                )}`}
              >
                {signup.role}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
