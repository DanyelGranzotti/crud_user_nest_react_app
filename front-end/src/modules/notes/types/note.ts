import { User } from "../../user/types/user";

/**
 * Interface que define a estrutura de uma nota.
 */
export interface Note {
  id: string;
  description: string;
  created_at: Date;
  user: User;
}

/**
 * Interface que define a estrutura dos dados para criar uma nota.
 */
export interface NoteCreate {
  description: string;
  userId: string;
}
