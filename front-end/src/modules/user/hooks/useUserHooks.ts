import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  searchUsers,
  updateUser,
} from "../services/userService";
import { CreateUserDto, User } from "../types/user";

/**
 * Hook para buscar uma lista de usuários.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Dados da lista de usuários, estados de carregamento e erro.
 */
export const useGetUsers = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      try {
        return await getUsers(params);
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
  });
};

/**
 * Hook para criar um novo usuário.
 * @returns Função de mutação para criar o usuário.
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, CreateUserDto>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error);
    },
  });
};

/**
 * Hook para atualizar um usuário existente.
 * @returns Função de mutação para atualizar o usuário.
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, { userId: string; userData: Partial<User> }>({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error updating user:", error);
    },
  });
};

/**
 * Hook para deletar um usuário.
 * @returns Função de mutação para deletar o usuário.
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting user:", error);
    },
  });
};

/**
 * Hook para buscar detalhes de um usuário pelo ID.
 * @param userId - O ID do usuário a ser buscado.
 * @returns Dados do usuário, estados de carregamento e erro.
 */
export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      try {
        return await getUserById(userId);
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
      }
    },
  });
};

/**
 * Hook para buscar uma lista de usuários com filtro por nome completo.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Dados da lista de usuários, estados de carregamento e erro.
 */
export const useSearchUsers = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["searchUsers", params],
    queryFn: async () => {
      try {
        return await searchUsers(params);
      } catch (error: any) {
        throw error;
      }
    },
  });
};
