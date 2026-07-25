"use client";

import { useState, useEffect, useCallback } from "react";
import type { AdminTrainer } from "@/features/admin/types";

interface UseAdminTrainersReturn {
  trainers: AdminTrainer[];
  loading: boolean;
  error: string | null;
  actionLoadingId: string | null;
  refetch: () => void;
  deleteTrainer: (id: string) => Promise<boolean>;
}

export const useAdminTrainers = (): UseAdminTrainersReturn => {
  const [trainers, setTrainers] = useState<AdminTrainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchTrainers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Same split as members: User (role/email/createdAt) lives in one
      // collection, avatar/specialty/experience live on TrainerProfile.
      const [usersRes, profilesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          credentials: "include",
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/trainers`, {
          credentials: "include",
        }),
      ]);

      if (!usersRes.ok) throw new Error("Failed to fetch users");

      const usersData = await usersRes.json();
      const users: AdminTrainer[] = Array.isArray(usersData)
        ? usersData
        : (usersData.data ?? []);

      // Profile extras are best-effort — a failed fetch here shouldn't
      // block the trainer list from rendering.
      let profileByUserId: Record<string, any> = {};
      if (profilesRes.ok) {
        const profilesData = await profilesRes.json();
        const profiles: any[] = Array.isArray(profilesData)
          ? profilesData
          : (profilesData.data ?? []);

        profileByUserId = profiles.reduce(
          (acc, profile) => {
            const userId =
              typeof profile.userId === "string"
                ? profile.userId
                : profile.userId?._id;

            if (userId) {
              acc[userId] = {
                avatar: profile.avatar ?? null,
                specialty: profile.specialty ?? null,
                experience: profile.experience ?? null,
                bio: profile.bio ?? null,
                phone: profile.phone ?? null,
                certifications: profile.certifications ?? [],
                availability: profile.availability ?? null,
              };
            }
            return acc;
          },
          {} as Record<string, any>,
        );
      }

      // role === "trainer" excludes members/admins.
      // isActive !== false excludes soft-deleted trainers — deleteUser()
      // only flips isActive on the user, so without this filter a
      // "deleted" trainer would keep reappearing after refetch.
      const onlyTrainers = users
        .filter((u) => u.role === "trainer" && u.isActive !== false)
        .map((u) => {
          const profile = profileByUserId[u._id] ?? {};
          return {
            ...u,
            avatar: profile.avatar ?? u.avatar ?? null,
            specialty: profile.specialty ?? null,
            experience: profile.experience ?? null,
            bio: profile.bio ?? null,
            phone: profile.phone ?? null,
            certifications: profile.certifications ?? [],
            availability: profile.availability ?? null,
          };
        })
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setTrainers(onlyTrainers);
    } catch (err) {
      setError("Unable to load trainers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  // No upgradeToTrainer here on purpose — trainers can't be "upgraded"
  // further, and downgrading trainer -> member isn't part of this scope.
  const deleteTrainer = useCallback(async (id: string): Promise<boolean> => {
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

      setTrainers((prev) => prev.filter((t) => t._id !== id));
      return true;
    } catch (err) {
      setError("Unable to delete trainer. Please try again.");
      return false;
    } finally {
      setActionLoadingId(null);
    }
  }, []);

  return {
    trainers,
    loading,
    error,
    actionLoadingId,
    refetch: fetchTrainers,
    deleteTrainer,
  };
};
