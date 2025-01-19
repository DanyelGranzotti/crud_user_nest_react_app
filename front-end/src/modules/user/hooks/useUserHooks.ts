import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
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
    queryKey: ["users", params], // Identificador único para o cache baseado nos parâmetros.
    queryFn: async () => {
      try {
        return await getUsers(params); // Chama o serviço para buscar os usuários.
      } catch (error) {
        console.error("Error fetching users:", error); // Loga erros no console.
        throw error; // Repassa o erro para o React Query tratar.
      }
    },
  });
};

/**
 * Hook para criar um novo usuário.
 * @returns Função de mutação para criar o usuário.
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient(); // Acesso ao cliente do React Query para gerenciar o cache.
  return useMutation<User, Error, CreateUserDto>({
    mutationFn: createUser, // Função que realiza a criação do usuário via API.
    onSuccess: () => {
      // Invalida o cache da lista de usuários após o sucesso.
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error); // Loga o erro no console.
    },
  });
};

/**
 * Hook para atualizar um usuário existente.
 * @returns Função de mutação para atualizar o usuário.
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient(); // Acesso ao cliente do React Query para gerenciar o cache.
  return useMutation<User, Error, { userId: string; userData: Partial<User> }>({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData), // Atualiza o usuário com base no ID e nos dados fornecidos.
    onSuccess: () => {
      // Invalida o cache da lista de usuários após a atualização.
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error updating user:", error); // Loga o erro no console.
    },
  });
};

/**
 * Hook para deletar um usuário.
 * @returns Função de mutação para deletar o usuário.
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient(); // Acesso ao cliente do React Query para gerenciar o cache.
  return useMutation<void, Error, string>({
    mutationFn: deleteUser, // Função que realiza a exclusão do usuário via API.
    onSuccess: () => {
      // Invalida o cache da lista de usuários após a exclusão.
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting user:", error); // Loga o erro no console.
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
    queryKey: ["user", userId], // Identificador único para o cache baseado no ID do usuário.
    queryFn: async () => {
      try {
        return await getUserById(userId); // Chama o serviço para buscar o usuário pelo ID.
      } catch (error) {
        console.error("Error fetching user by ID:", error); // Loga erros no console.
        throw error; // Repassa o erro para o React Query tratar.
      }
    },
  });
};
