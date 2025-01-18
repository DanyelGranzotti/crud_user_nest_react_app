import { Color } from "../../color/types/color";
import { Note } from "../../notes/types/note";
import { UserRoles } from "./enums/user-roles.enum";

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
