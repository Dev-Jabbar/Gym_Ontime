"use client";

import { useState, useEffect, useCallback } from "react";
import { ProfileData, UpdateProfileData } from "@/features/profile/types";
import { useUser } from "@/hooks/useUser";

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
          `${process.env.NEXT_PUBLIC_API_URL}/members/me`,
          {
            credentials: "include",
          },
        );
      } else if (user.role === "trainer") {
        profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/trainers/me`,
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name: data.name }),
        });
      }

      // Update member profile
      if (user.role === "member") {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/me`, {
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trainers/me`, {
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

      await fetchProfile();
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
