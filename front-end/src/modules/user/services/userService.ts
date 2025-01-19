import axios from "../../../api/axiosConfig";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { CreateUserDto, User } from "../types/user";

/**
 * Serviço para buscar uma lista de usuários.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Uma lista de usuários do tipo `User[]`.
 */
export const getUsers = async (
  params: Record<string, any>
): Promise<User[]> => {
  // Faz uma requisição GET para o endpoint de usuários com os parâmetros fornecidos.
  const response = await axios.get<User[]>(API_ENDPOINTS.USERS, { params });
  // Retorna apenas os dados da resposta.
  return response.data;
};

/**
 * Serviço para criar um novo usuário.
 * @param userData - Dados do usuário a ser criado.
 * @returns O usuário criado no formato `User`.
 */
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  // Faz uma requisição POST para o endpoint de usuários com os dados fornecidos.
  const response = await axios.post<User>(API_ENDPOINTS.USERS, userData);
  // Retorna o usuário criado.
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
  // Faz uma requisição PATCH para o endpoint específico do usuário.
  const response = await axios.patch<User>(
    `${API_ENDPOINTS.USERS}/${userId}`,
    userData
  );
  // Retorna o usuário atualizado.
  return response.data;
};

/**
 * Serviço para deletar um usuário.
 * @param userId - O ID do usuário a ser deletado.
 * @returns Uma promessa resolvida quando o usuário for excluído.
 */
export const deleteUser = async (userId: string): Promise<void> => {
  // Faz uma requisição DELETE para o endpoint específico do usuário.
  await axios.delete(`${API_ENDPOINTS.USERS}/${userId}`);
  // Sem retorno de dados, apenas resolução da promessa.
};

/**
 * Serviço para buscar um usuário pelo ID.
 * @param userId - O ID do usuário a ser buscado.
 * @returns O usuário no formato `User`.
 */
export const getUserById = async (userId: string): Promise<User> => {
  // Faz uma requisição GET para o endpoint específico do usuário.
  const response = await axios.get<User>(`${API_ENDPOINTS.USERS}/${userId}`);
  // Retorna os dados do usuário.
  return response.data;
};
