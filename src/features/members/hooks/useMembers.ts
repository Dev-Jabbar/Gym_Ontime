"use client";

import { useState, useEffect, useCallback } from "react";
import { ClassWithMembers } from "@/features/members/types";

interface UseMembersReturn {
  classesWithMembers: ClassWithMembers[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

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
        // Fetch only trainer's classes
        const res = await fetch(
          "http://localhost:5000/api/trainers/my-classes",
          { credentials: "include" },
        );
        const data = await res.json();
        classes = data.data ?? [];
      } else if (userRole === "admin") {
        // Fetch all classes
        const res = await fetch("http://localhost:5000/api/classes", {
          credentials: "include",
        });
        classes = await res.json();
      }

      // Fetch members for each class
      const classesWithMembersData: ClassWithMembers[] = await Promise.all(
        classes
          .filter((cls: any) =>
            classId ? cls._id === classId || cls.id === classId : true,
          )
          .map(async (cls: any) => {
            const membersRes = await fetch(
              `http://localhost:5000/api/classes/${cls._id ?? cls.id}/members`,
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
