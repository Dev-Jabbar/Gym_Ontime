export interface MemberProfile {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  avatar?: string | null;
  phone?: string;
  gender?: string;
  fitnessGoal?: string;
  isActive: boolean;
}

export interface ClassWithMembers {
  classId: string;
  className: string;
  schedule: string;
  capacity: number;
  members: MemberProfile[];
}
