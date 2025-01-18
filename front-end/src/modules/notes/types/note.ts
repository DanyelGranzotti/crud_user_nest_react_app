import { User } from "../../user/types/user";

export interface Note {
  id: string;
  description: string;
  created_at: Date;
  user: User;
}
