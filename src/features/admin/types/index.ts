export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "member";
  avatar?: string | null;
  createdAt: string;
  isActive?: boolean;
}

// Trainer-specific extras merged in from TrainerProfile — best-effort,
// same pattern as avatar merging for members.
export interface AdminTrainer extends AdminUser {
  specialty?: string | null;
  experience?: number | null;
}
