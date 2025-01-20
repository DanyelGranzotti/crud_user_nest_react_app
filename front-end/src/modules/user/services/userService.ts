import axios from "../../../api/axiosConfig";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { CreateUserDto, User, UserList } from "../types/user";

/**
 * Serviço para buscar uma lista de usuários.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Uma lista de usuários do tipo `UserList`.
 */
export const getUsers = async (
  params: Record<string, any>
): Promise<UserList> => {
  const response = await axios.get<UserList>(API_ENDPOINTS.USERS, { params });
  return response.data;
};

/**
 * Serviço para buscar uma lista de usuários com filtro por nome completo.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Uma lista de usuários do tipo `UserList`.
 */
export const searchUsers = async (
  params: Record<string, any>
): Promise<UserList> => {
  const response = await axios.get<UserList>(API_ENDPOINTS.USERS, { params });
  return response.data;
};

/**
 * Serviço para criar um novo usuário.
 * @param userData - Dados do usuário a ser criado.
 * @returns O usuário criado no formato `User`.
 */
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const response = await axios.post<User>(API_ENDPOINTS.USERS, userData);
  return response.data;
};

/**
 * Serviço para atualizar um usuário existente.
 * @param userId - O ID do usuário a ser atualizado.
 * @param userData - Dados parciais para atualizar o usuário.
 * @returns O usuário atualizado no formato `User`.
 */
export const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<User> => {
  const response = await axios.patch<User>(
    `${API_ENDPOINTS.USERS}/${userId}`,
    userData
  );
  return response.data;
};

/**
 * Serviço para deletar um usuário.
 * @param userId - O ID do usuário a ser deletado.
 * @returns Uma promessa resolvida quando o usuário for excluído.
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.USERS}/${userId}`);
};

/**
 * Serviço para buscar um usuário pelo ID.
 * @param userId - O ID do usuário a ser buscado.
 * @returns O usuário no formato `User`.
 */
export const getUserById = async (userId: string): Promise<User> => {
  const response = await axios.get<User>(`${API_ENDPOINTS.USERS}/${userId}`);
  return response.data;
};
