import { initialErrors } from "./formUtils";

/**
 * Valida se o CPF é válido.
 * @param cpf - CPF a ser validado.
 * @returns `true` se o CPF for válido, caso contrário `false`.
 */
export const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

/**
 * Valida os dados do formulário de usuário.
 * @param formData - Dados do formulário.
 * @param setErrors - Função para definir os erros do formulário.
 * @returns `true` se o formulário for válido, caso contrário `false`.
 */
export const validateForm = (formData: any, setErrors: any): boolean => {
  let valid = true;
  const newErrors = { ...initialErrors };

  if (!formData.fullName) {
    newErrors.fullName = "O nome é obrigatório.";
    valid = false;
  }
  if (!isValidCPF(formData.cpf)) {
    newErrors.cpf = "Formato de CPF inválido.";
    valid = false;
  }
  if (!formData.email) {
    newErrors.email = "O e-mail é obrigatório.";
    valid = false;
  }
  if (!formData.favoriteColor.id) {
    newErrors.favoriteColor = "A cor favorita é obrigatória.";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};
