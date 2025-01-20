import axiosInstance from "../../../api/axiosConfig";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { Credential } from "../types/credential";

/**
 * Serviço para realizar login.
 * @param credentials - Credenciais do usuário.
 * @returns Dados do token e do usuário autenticado.
 */
export const loginService = async (credentials: Credential) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data;
};

// /**
//  * Serviço para atualizar o token.
//  * @returns Novo token.
//  */
// export const refreshTokenService = async () => {
//   const response = await axiosInstance.post<{ access_token: string }>(
//     `${process.env.API_END_POINT}${API_ENDPOINTS.AUTH.REFRESH}`
//   );
//   return response.data;
// };
