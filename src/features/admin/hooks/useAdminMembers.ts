"use client";

import { getApiUrl } from "@/lib/backend";
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
  // Tracks which row has an upgrade or delete request in flight.
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Users and member profiles are separate resources, and the avatar only
      // exists on MemberProfile, so fetch both in parallel and merge them on
      // the client.
      const [usersRes, profilesRes] = await Promise.all([
        fetch(`${getApiUrl()}/users`, {
          credentials: "include",
        }),
        fetch(`${getApiUrl()}/members`, {
          credentials: "include",
        }),
      ]);

      if (!usersRes.ok) throw new Error("Failed to fetch users");

      const usersData = await usersRes.json();
      // Defensive: accept either a raw array or a { data: [] } wrapper.
      const users: AdminUser[] = Array.isArray(usersData)
        ? usersData
        : (usersData.data ?? []);

      // Avatars and profile details are best effort: if this call fails, fall
      // back to the base user data instead of failing the whole page.
      let profileByUserId: Record<string, any> = {};
      if (profilesRes.ok) {
        const profilesData = await profilesRes.json();
        const profiles: any[] = Array.isArray(profilesData)
          ? profilesData
          : (profilesData.data ?? []);

        profileByUserId = profiles.reduce(
          (acc, profile) => {
            // userId may be a raw id string or a populated object
            // ({ _id, name, email }); handle both.
            const userId =
              typeof profile.userId === "string"
                ? profile.userId
                : (profile.userId?._id ?? profile.userId?.id);

            if (userId) {
              acc[userId] = {
                avatar: profile.avatar ?? null,
                phone: profile.phone ?? null,
                gender: profile.gender ?? null,
                fitnessGoal: profile.fitnessGoal ?? null,
                healthNotes: profile.healthNotes ?? null,
                emergencyContact: profile.emergencyContact ?? null,
                // The MemberProfile's own id, needed later to fetch "classes
                // joined" via GET /classes/by-member/:memberProfileId, because
                // Class.members references MemberProfile, not User.
                memberProfileId: profile._id ?? profile.id ?? null,
              };
            }
            return acc;
          },
          {} as Record<string, any>,
        );
      }

      // Only active members belong in this management list:
      // - role === "member" excludes trainers and admins, which this UI must
      //   not upgrade or delete.
      // - isActive !== false excludes soft-deleted users. Deleting a user only
      //   sets isActive to false (the role is unchanged), so without this
      //   check a deleted member would reappear after a refetch.
      const onlyMembers = users
        .filter((u) => u.role === "member" && u.isActive !== false)
        .map((u) => {
          // Express sends `_id`, the Nest API sends `id`.
          const userKey: string = u._id ?? (u as { id?: string }).id ?? "";
          const profile = profileByUserId[userKey] ?? {};
          return {
            ...u,
            _id: userKey,
            avatar: profile.avatar ?? u.avatar ?? null,
            phone: profile.phone ?? null,
            gender: profile.gender ?? null,
            fitnessGoal: profile.fitnessGoal ?? null,
            healthNotes: profile.healthNotes ?? null,
            emergencyContact: profile.emergencyContact ?? null,
            memberProfileId: profile.memberProfileId ?? undefined,
          };
        })
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
          `${getApiUrl()}/users/${id}/upgrade-to-trainer`,
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
        `${getApiUrl()}/users/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Delete failed");

      // Optimistic removal: no need to refetch the whole list after a delete.
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
