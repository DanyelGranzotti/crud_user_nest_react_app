import { Color } from "../../color/types/color";
import { User } from "../types/user";

/**
 * Interface para os erros do formulário de usuário.
 */
export interface FormErrors {
  fullName: string;
  cpf: string;
  email: string;
  favoriteColor: string;
}

/**
 * Tipo para os dados do formulário de usuário.
 */
export type UserFormData = Omit<User, "id" | "notes" | "role" | "password">;

/**
 * Dados iniciais do formulário de usuário.
 */
export const initialFormData: UserFormData = {
  fullName: "",
  cpf: "",
  email: "",
  favoriteColor: { id: "", name: "", hex_code: "", active: true } as Color,
};

/**
 * Erros iniciais do formulário de usuário.
 */
export const initialErrors: FormErrors = {
  fullName: "",
  cpf: "",
  email: "",
  favoriteColor: "",
};
