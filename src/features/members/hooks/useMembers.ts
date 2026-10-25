"use client";

import { getApiUrl } from "@/lib/backend";
import { useState, useEffect, useCallback } from "react";
import { ClassWithMembers } from "@/features/members/types";

interface UseMembersReturn {
  classesWithMembers: ClassWithMembers[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Loads each visible class along with its enrolled members, scoped by
 * role: a trainer only sees their own classes, an admin sees every
 * class (optionally narrowed to one via `classId`).
 *
 * Note: `userRole === "member"` isn't handled below — `classes` stays
 * empty for that role, so this hook is really only wired up for the
 * admin and trainer member-management views today, not a member-
 * facing screen.
 *
 * Performance note: this fires one members request per class
 * (N+1), via `Promise.all` so they at least run concurrently rather
 * than sequentially. Fine at gym-sized class counts; if the class list
 * ever grew large, a single backend endpoint that returns classes
 * with members already attached would scale better than fanning out
 * per-class requests from the client.
 */
export const useMembers = (
  userRole: "admin" | "trainer" | "member",
  classId?: string | null,
): UseMembersReturn => {
  const [classesWithMembers, setClassesWithMembers] = useState<
    ClassWithMembers[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let classes: any[] = [];

      if (userRole === "trainer") {
        const res = await fetch(
          `${getApiUrl()}/trainers/my-classes`,
          { credentials: "include" },
        );
        const data = await res.json();
        classes = data.data ?? [];
      } else if (userRole === "admin") {
        const res = await fetch(`${getApiUrl()}/classes`, {
          credentials: "include",
        });
        classes = await res.json();
      }

      const classesWithMembersData: ClassWithMembers[] = await Promise.all(
        classes
          .filter((cls: any) =>
            classId ? cls._id === classId || cls.id === classId : true,
          )
          .map(async (cls: any) => {
            const membersRes = await fetch(
              `${getApiUrl()}/classes/${cls._id ?? cls.id}/members`,
              { credentials: "include" },
            );
            const membersData = await membersRes.json();
            return {
              classId: cls._id ?? cls.id,
              className: cls.name,
              schedule: cls.schedule,
              capacity: cls.capacity ?? 0,
              members: membersData.data?.members ?? [],
            };
          }),
      );

      setClassesWithMembers(classesWithMembersData);
    } catch (err) {
      setError("Unable to load members. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userRole, classId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { classesWithMembers, loading, error, refetch: fetchMembers };
};
