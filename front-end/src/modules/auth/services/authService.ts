import axios from "axios";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { User } from "../../user/types/user";

/**
 * Serviço para realizar login.
 * @param credentials - Credenciais do usuário.
 * @returns Dados do token e do usuário autenticado.
 */
export const loginService = async (credentials: {
  login: string;
  password: string;
}) => {
  const response = await axios.post<{ token: string; user: User }>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data;
};

/**
 * Serviço para atualizar o token.
 * @returns Novo token.
 */
export const refreshTokenService = async () => {
  const response = await axios.post<{ token: string }>(
    API_ENDPOINTS.AUTH.REFRESH
  );
  return response.data;
};
