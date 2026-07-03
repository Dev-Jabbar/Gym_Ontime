"use client";

import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Header from "./Header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useUser();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  // ✅ Wait until user is loaded before rendering header
  if (!user) return null; // or a loading spinner

  return (
    <>
      <div className="md:px-16 md:py-4 px-4 py-1 bg-black md:block fixed w-screen z-20 space-y-16">
        <Header
          userRole={user.role}
          userName={user.name}
          userAvatar={
            user.avatar ??
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=40`
          }
        />
      </div>
      {children}
    </>
  );
}
