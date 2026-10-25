"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";
import { getAvatarFallback } from "@/lib/getAvatarFallback";
import Header from "./Header";
import { PushPrompt } from "@/components/PushPrompt";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();
  const loading = useUserStore((state) => state.loading);
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    // Wait until loading is finished: `loading` tells "still checking" apart
    // from "definitely not logged in". Without it, a visitor with no session
    // cookie would see a permanently blank page with no redirect.
    if (!loading && !user && !isAuthPage) {
      router.push("/login");
    }
  }, [loading, user, isAuthPage, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Still checking, or about to redirect: render nothing either way.
  if (!user) return null;

  return (
    <>
      <div className="md:px-16 md:py-4 px-4 py-1 bg-black md:block fixed w-screen z-20 space-y-16">
        <Header
          userRole={user.role}
          userName={user.name}
          userAvatar={user.avatar ?? getAvatarFallback(user.name)}
        />
      </div>
      {children}
      <PushPrompt />
    </>
  );
}
