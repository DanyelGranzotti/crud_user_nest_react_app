import { Color } from "../../color/types/color";
import { Note } from "../../notes/types/note";
import { UserRoles } from "./enums/user-roles.enum";

/**
 * Interface para o usuário.
 */
export interface UserList {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  id: string;
  fullName: string;
  cpf: string;
  email: string;
  favoriteColor: Color;
  notes: Note[];
  role: UserRoles;
  password?: string;
}

/**
 * DTO para criar um usuário.
 */
export interface CreateUserDto {
  fullName: string;
  cpf: string;
  email: string;
  favoriteColorId: string;
}
