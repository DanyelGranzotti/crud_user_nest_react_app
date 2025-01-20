import axios from "axios";
import { API_ENDPOINTS } from "../../../api/endpoints";

/**
 * Serviço para realizar login.
 * @param credentials - Credenciais do usuário.
 * @returns Dados do token e do usuário autenticado.
 */
export const loginService = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post<{ access_token: string }>(
    `${process.env.API_END_POINT}${API_ENDPOINTS.AUTH.LOGIN}`,
    credentials
  );
  return response.data;
};

/**
 * Serviço para atualizar o token.
 * @returns Novo token.
 */
export const refreshTokenService = async () => {
  const response = await axios.post<{ access_token: string }>(
    `${process.env.API_END_POINT}${API_ENDPOINTS.AUTH.REFRESH}`
  );
  return response.data;
};
