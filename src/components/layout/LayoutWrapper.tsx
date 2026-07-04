"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";
import Header from "./Header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();
  const loading = useUserStore((state) => state.loading);
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    // Wait until we're sure — loading distinguishes "still checking"
    // from "definitely not logged in". Without this, a visitor with
    // no session cookie (e.g. first-ever visit, or after logout) just
    // saw a permanently blank page with no header and no way forward,
    // since this component always returned null for !user with no
    // redirect at all.
    if (!loading && !user && !isAuthPage) {
      router.push("/login");
    }
  }, [loading, user, isAuthPage, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Still checking, or about to redirect — render nothing either way.
  if (!user) return null;

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
