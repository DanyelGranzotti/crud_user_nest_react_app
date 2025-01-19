import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createColor,
  deleteColor,
  getColorById,
  getColors,
  updateColor,
} from "../services/colorService";
import { Color } from "../types/color";

/**
 * Hook para buscar uma lista de cores.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Dados da lista de cores, estados de carregamento e erro.
 */
export const useGetColors = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["colors", params], // Identificador único para o cache baseado nos parâmetros.
    queryFn: async () => {
      try {
        return await getColors(params); // Chama o serviço para buscar as cores.
      } catch (error) {
        console.error("Error fetching colors:", error); // Loga erros no console.
        throw error; // Repassa o erro para o React Query tratar.
      }
    },
  });
};

/**
 * Hook para criar uma nova cor.
 * @returns Função de mutação para criar a cor.
 */
export const useCreateColor = () => {
  const queryClient = useQueryClient(); // Acesso ao cliente do React Query para gerenciar o cache.
  return useMutation<Color, Error, Omit<Color, "id">>({
    mutationFn: createColor, // Função que realiza a criação da cor via API.
    onSuccess: () => {
      // Invalida o cache da lista de cores após o sucesso.
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error: Error) => {
      console.error("Error creating color:", error); // Loga o erro no console.
    },
  });
};

/**
 * Hook para atualizar uma cor existente.
 * @returns Função de mutação para atualizar a cor.
 */
export const useUpdateColor = () => {
  const queryClient = useQueryClient(); // Acesso ao cliente do React Query para gerenciar o cache.
  return useMutation<
    Color,
    Error,
    { colorId: string; colorData: Partial<Color> }
  >({
    mutationFn: ({ colorId, colorData }) => updateColor(colorId, colorData), // Atualiza a cor com base no ID e nos dados fornecidos.
    onSuccess: () => {
      // Invalida o cache da lista de cores após a atualização.
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error: Error) => {
      console.error("Error updating color:", error); // Loga o erro no console.
    },
  });
};

/**
 * Hook para deletar uma cor.
 * @returns Função de mutação para deletar a cor.
 */
export const useDeleteColor = () => {
  const queryClient = useQueryClient(); // Acesso ao cliente do React Query para gerenciar o cache.
  return useMutation<void, Error, string>({
    mutationFn: deleteColor, // Função que realiza a exclusão da cor via API.
    onSuccess: () => {
      // Invalida o cache da lista de cores após a exclusão.
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting color:", error); // Loga o erro no console.
    },
  });
};

/**
 * Hook para buscar detalhes de uma cor pelo ID.
 * @param colorId - O ID da cor a ser buscada.
 * @returns Dados da cor, estados de carregamento e erro.
 */
export const useGetColorById = (colorId: string) => {
  return useQuery({
    queryKey: ["color", colorId], // Identificador único para o cache baseado no ID da cor.
    queryFn: async () => {
      try {
        return await getColorById(colorId); // Chama o serviço para buscar a cor pelo ID.
      } catch (error) {
        console.error("Error fetching color by ID:", error); // Loga erros no console.
        throw error; // Repassa o erro para o React Query tratar.
      }
    },
  });
};
