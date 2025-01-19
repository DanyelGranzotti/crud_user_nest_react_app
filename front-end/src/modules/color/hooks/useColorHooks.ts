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
    queryKey: ["colors", params],
    queryFn: async () => {
      try {
        return await getColors(params);
      } catch (error) {
        console.error("Error fetching colors:", error);
        throw error;
      }
    },
  });
};

/**
 * Hook para criar uma nova cor.
 * @returns Função de mutação para criar a cor.
 */
export const useCreateColor = () => {
  const queryClient = useQueryClient();
  return useMutation<Color, Error, Omit<Color, "id">>({
    mutationFn: createColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error: Error) => {
      console.error("Error creating color:", error);
    },
  });
};

/**
 * Hook para atualizar uma cor existente.
 * @returns Função de mutação para atualizar a cor.
 */
export const useUpdateColor = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Color,
    Error,
    { colorId: string; colorData: Partial<Color> }
  >({
    mutationFn: ({ colorId, colorData }) => updateColor(colorId, colorData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error: Error) => {
      console.error("Error updating color:", error);
    },
  });
};

/**
 * Hook para deletar uma cor.
 * @returns Função de mutação para deletar a cor.
 */
export const useDeleteColor = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteColor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting color:", error);
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
    queryKey: ["color", colorId],
    queryFn: async () => {
      try {
        return await getColorById(colorId);
      } catch (error) {
        console.error("Error fetching color by ID:", error);
        throw error;
      }
    },
  });
};
