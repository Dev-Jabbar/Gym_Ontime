"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show header on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="md:px-16 md:py-4 px-4 py-1 bg-black md:block fixed w-screen z-20 space-y-16">
        <Header userRole="admin" />
      </div>
      {children}
    </>
  );
}
