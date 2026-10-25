"use client";

import { getApiUrl } from "@/lib/backend";
import { useState, useEffect, useCallback } from "react";
import { ProfileData, UpdateProfileData } from "@/features/profile/types";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";

interface UseProfileReturn {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  refetch: () => void;
}

export const useProfile = (): UseProfileReturn => {
  const user = useUser();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      let profileRes;
      if (user.role === "member") {
        profileRes = await fetch(
          `${getApiUrl()}/members/me`,
          {
            credentials: "include",
          },
        );
      } else if (user.role === "trainer") {
        profileRes = await fetch(
          `${getApiUrl()}/trainers/me`,
          {
            credentials: "include",
          },
        );
      } else if (user.role === "admin") {
        // Admins have an AdminProfile too (avatar only), so load it.
        profileRes = await fetch(
          `${getApiUrl()}/admins/me`,
          {
            credentials: "include",
          },
        );
      } else {
        setProfile({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: null,
        });
        setLoading(false);
        return;
      }

      if (!profileRes.ok) throw new Error("Failed to fetch profile");
      const profileData = await profileRes.json();

      setProfile({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: profileData,
      });
    } catch (err) {
      setError("Unable to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: UpdateProfileData) => {
    if (!user) return;
    setUpdating(true);

    try {
      // Update name via user endpoint
      if (data.name) {
        await fetch(`${getApiUrl()}/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name: data.name }),
        });
      }

      // Update member profile
      if (user.role === "member") {
        await fetch(`${getApiUrl()}/members/me`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...(data.avatar !== undefined && { avatar: data.avatar }),
            ...(data.phone !== undefined && { phone: data.phone }),
            ...(data.dateOfBirth !== undefined && {
              dateOfBirth: data.dateOfBirth,
            }),
            ...(data.gender !== undefined && { gender: data.gender }),
            ...(data.fitnessGoal !== undefined && {
              fitnessGoal: data.fitnessGoal,
            }),
            ...(data.healthNotes !== undefined && {
              healthNotes: data.healthNotes,
            }),
            ...(data.emergencyContact !== undefined && {
              emergencyContact: data.emergencyContact,
            }),
          }),
        });
      }

      // Update trainer profile
      if (user.role === "trainer") {
        await fetch(`${getApiUrl()}/trainers/me`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...(data.avatar !== undefined && { avatar: data.avatar }),
            ...(data.bio !== undefined && { bio: data.bio }),
            ...(data.specialty !== undefined && { specialty: data.specialty }),
            ...(data.phone !== undefined && { phone: data.phone }),
            ...(data.experience !== undefined && {
              experience: data.experience,
            }),
            ...(data.certifications !== undefined && {
              certifications: data.certifications,
            }),
            ...(data.availability !== undefined && {
              availability: data.availability,
            }),
            ...(data.dateOfBirth !== undefined && {
              dateOfBirth: data.dateOfBirth,
            }),
            ...(data.gender !== undefined && { gender: data.gender }),
          }),
        });
      }

      // Update the admin profile. AdminProfile only has `avatar`, so this is
      // the smallest of the three branches.
      if (user.role === "admin") {
        await fetch(`${getApiUrl()}/admins/me`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...(data.avatar !== undefined && { avatar: data.avatar }),
          }),
        });
      }

      await fetchProfile();

      // Sync the Zustand store too. The Header reads from the store, not from
      // this hook's `profile` state, so without this it would keep showing the
      // old avatar until a full reload.
      if (data.avatar !== undefined) {
        useUserStore.getState().updateAvatar(data.avatar);
      }
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updating,
    updateProfile,
    refetch: fetchProfile,
  };
};
