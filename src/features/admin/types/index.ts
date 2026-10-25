export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "member";
  avatar?: string | null;
  createdAt: string;
  isActive?: boolean;
  // Extra profile fields merged in from MemberProfile, used by the member
  // details modal. Undefined when not set.
  phone?: string | null;
  gender?: string | null;
  fitnessGoal?: string | null;
  healthNotes?: string | null;
  emergencyContact?: { name: string; phone: string } | null;
  // The MemberProfile id (not the User id above), needed for
  // GET /classes/by-member/:memberProfileId, because Class.members references
  // MemberProfile, not User.
  memberProfileId?: string;
}

// Trainer-specific extras merged in from TrainerProfile. Best effort, like
// the avatar merge for members.
export interface AdminTrainer extends AdminUser {
  specialty?: string | null;
  experience?: number | null;
  bio?: string | null;
  certifications?: string[];
  availability?: string | null;
}
