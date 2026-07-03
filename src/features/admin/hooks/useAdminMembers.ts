"use client";

import { useState, useEffect, useCallback } from "react";
import type { AdminUser } from "@/features/admin/types";

interface UseAdminMembersReturn {
  members: AdminUser[];
  loading: boolean;
  error: string | null;
  actionLoadingId: string | null;
  refetch: () => void;
  upgradeToTrainer: (id: string) => Promise<boolean>;
  deleteMember: (id: string) => Promise<boolean>;
}

export const useAdminMembers = (): UseAdminMembersReturn => {
  const [members, setMembers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // tracks which specific row has an upgrade/delete request in flight
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Users and member profiles live in separate collections —
      // avatar only exists on MemberProfile, not on User — so fetch
      // both in parallel and merge them client-side.
      const [usersRes, profilesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
          credentials: "include",
        }),
      ]);

      if (!usersRes.ok) throw new Error("Failed to fetch users");

      const usersData = await usersRes.json();
      // Defensive: handle either a raw array or a { data: [] } wrapper
      const users: AdminUser[] = Array.isArray(usersData)
        ? usersData
        : (usersData.data ?? []);

      // Avatars are best-effort: if this call fails for any reason,
      // fall back to no avatars rather than failing the whole page.
      let avatarByUserId: Record<string, string | null> = {};
      if (profilesRes.ok) {
        const profilesData = await profilesRes.json();
        const profiles: any[] = Array.isArray(profilesData)
          ? profilesData
          : (profilesData.data ?? []);

        avatarByUserId = profiles.reduce(
          (acc, profile) => {
            // userId may come back as a raw ObjectId string, or as a
            // populated object ({ _id, name, email }) — handle both.
            const userId =
              typeof profile.userId === "string"
                ? profile.userId
                : profile.userId?._id;

            if (userId) acc[userId] = profile.avatar ?? null;
            return acc;
          },
          {} as Record<string, string | null>,
        );
      }

      // Only ACTIVE members belong in this management list:
      // - role === "member" excludes trainers/admins (this UI shouldn't
      //   upgrade/delete them)
      // - isActive !== false excludes soft-deleted users. deleteUser()
      //   never flips role, it only sets isActive: false, so without this
      //   check a "deleted" member would keep reappearing after refetch.
      const onlyMembers = users
        .filter((u) => u.role === "member" && u.isActive !== false)
        .map((u) => ({
          ...u,
          avatar: avatarByUserId[u._id] ?? u.avatar ?? null,
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setMembers(onlyMembers);
    } catch (err) {
      setError("Unable to load members. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const upgradeToTrainer = useCallback(
    async (id: string): Promise<boolean> => {
      setActionLoadingId(id);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/upgrade-to-trainer`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Upgrade failed");

        await fetchMembers();
        return true;
      } catch (err) {
        setError("Unable to upgrade member. Please try again.");
        return false;
      } finally {
        setActionLoadingId(null);
      }
    },
    [fetchMembers],
  );

  const deleteMember = useCallback(async (id: string): Promise<boolean> => {
    setActionLoadingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Delete failed");

      // optimistic removal — no need to refetch the whole list for a delete
      setMembers((prev) => prev.filter((m) => m._id !== id));
      return true;
    } catch (err) {
      setError("Unable to delete member. Please try again.");
      return false;
    } finally {
      setActionLoadingId(null);
    }
  }, []);

  return {
    members,
    loading,
    error,
    actionLoadingId,
    refetch: fetchMembers,
    upgradeToTrainer,
    deleteMember,
  };
};
