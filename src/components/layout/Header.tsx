"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { IoMenu, IoClose } from "react-icons/io5";
import {
  TbDashboard,
  TbCalendar,
  TbUsers,
  TbUsersGroup,
  TbCurrencyNaira,
  TbUser,
  TbSettings,
  TbLogout,
  TbChevronDown,
} from "react-icons/tb";

interface HeaderProps {
  userRole: "admin" | "trainer" | "member";
  userName?: string;
  userAvatar?: string;
}

export default function Header({
  userRole,
  userName = "User",
  userAvatar,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
      method: "POST",
      credentials: "include", // 👈 required for cookie to be cleared
    });

    clearUser();
    setProfileOpen(false);
    setMenuOpen(false);
    router.push("/login");
  };
  const getNavItems = () => {
    const baseItems = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: TbDashboard,
        roles: ["admin", "trainer", "member"],
      },
      {
        name: "Schedule",
        href: "/schedule",
        icon: TbCalendar,
        roles: ["admin", "trainer", "member"],
      },
    ];

    // ⚠️ Split by role instead of one shared "Members" item:
    // trainers manage class rosters (/members), admins manage the
    // full user list (/admin/members) — these are different pages
    // with different data, so they need different links even though
    // the label and icon look the same.
    const adminItems = [
      {
        name: "Members",
        href: "/admin/members",
        icon: TbUsers,
        roles: ["admin"],
      },
      {
        name: "Payments",
        href: "/payments",
        icon: TbCurrencyNaira,
        roles: ["admin"],
      },
    ];

    const trainerMemberItems = [
      {
        name: "Members",
        href: "/members",
        icon: TbUsersGroup,
        roles: ["trainer"],
      },
    ];

    const memberItems = [
      {
        name: "My Subscriptions",
        href: "/subscriptions",
        icon: TbCurrencyNaira,
        roles: ["member"],
      },
    ];

    // Was pointing at /trainers, which has no page in app/(routes) at all
    // (confirmed empty) — repointed to the real management page instead
    // of leaving a dead link in the nav.
    const trainerItems = [
      {
        name: "Trainers",
        href: "/admin/trainers",
        icon: TbUsers,
        roles: ["admin"],
      },
    ];

    const allItems = [
      ...baseItems,
      ...trainerItems,
      ...adminItems,
      ...trainerMemberItems,
      ...memberItems,
    ];
    return allItems.filter((item) => item.roles.includes(userRole));
  };

  const navItems = getNavItems();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide hover:text-orange-400 transition-colors"
          >
            Gym<span className="text-orange-500">Ontime</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-orange-500 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="px-3 py-1 bg-gray-800 rounded-full">
              <span className="text-xs font-medium text-gray-300 capitalize">
                {userRole}
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                  <Image
                    src={
                      userAvatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff&size=40`
                    }
                    alt={userName || "User"}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <TbChevronDown
                  className={`w-4 h-4 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {userRole}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <TbUser className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <TbSettings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <TbLogout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
                <Image
                  src={
                    userAvatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff&size=40`
                  }
                  alt={userName || "User"}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold">{userName}</p>
                <p className="text-xs text-gray-400 capitalize">{userRole}</p>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.href)
                    ? "bg-orange-500 text-white"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-800 space-y-2">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                <TbUser className="w-5 h-5" />
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                <TbSettings className="w-5 h-5" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 bg-red-900 text-red-200 rounded-lg hover:bg-red-800"
              >
                <TbLogout className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
