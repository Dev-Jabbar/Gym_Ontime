export interface MemberProfile {
  avatar?: string | null;
  isActive: boolean;
}

export interface TrainerProfile {
  avatar?: string | null;
  bio?: string | null;
  specialtys?: string | null;
  isActive: boolean;
}

export interface AdminProfile {
  avatar?: string | null;
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "member";
  profile: MemberProfile | TrainerProfile | AdminProfile | null;
}

export interface UpdateProfileData {
  name?: string;
  avatar?: string;
  bio?: string;
  specialty?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  fitnessGoal?: string;
  healthNotes?: string;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  // ✅ trainer specific
  experience?: number;
  certifications?: string[];
  availability?: string;
}
