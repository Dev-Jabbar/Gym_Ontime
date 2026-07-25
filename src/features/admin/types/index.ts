export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "member";
  avatar?: string | null;
  createdAt: string;
  isActive?: boolean;
  // Extra profile detail fields, merged in from MemberProfile — used
  // by the member details modal. Undefined if not set.
  phone?: string | null;
  gender?: string | null;
  fitnessGoal?: string | null;
  healthNotes?: string | null;
  emergencyContact?: { name: string; phone: string } | null;
  // The MemberProfile._id (NOT the User._id above) — needed to call
  // GET /classes/by-member/:memberProfileId, since Class.members
  // references MemberProfile, not User.
  memberProfileId?: string;
}

// Trainer-specific extras merged in from TrainerProfile — best-effort,
// same pattern as avatar merging for members.
export interface AdminTrainer extends AdminUser {
  specialty?: string | null;
  experience?: number | null;
  bio?: string | null;
  certifications?: string[];
  availability?: string | null;
}
