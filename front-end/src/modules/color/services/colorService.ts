import axios from "../../../api/axiosConfig";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { Color } from "../types/color";

/**
 * Serviço para buscar uma lista de cores.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Uma lista de cores do tipo `Color[]`.
 */
export const getColors = async (
  params: Record<string, any>
): Promise<Color[]> => {
  const response = await axios.get<Color[]>(API_ENDPOINTS.COLORS, { params });
  return response.data;
};

/**
 * Serviço para criar uma nova cor.
 * @param colorData - Dados da cor a ser criada.
 * @returns A cor criada no formato `Color`.
 */
export const createColor = async (
  colorData: Omit<Color, "id">
): Promise<Color> => {
  const response = await axios.post<Color>(API_ENDPOINTS.COLORS, colorData);
  return response.data;
};

/**
 * Serviço para atualizar uma cor existente.
 * @param colorId - O ID da cor a ser atualizada.
 * @param colorData - Dados parciais para atualizar a cor.
 * @returns A cor atualizada no formato `Color`.
 */
export const updateColor = async (
  colorId: string,
  colorData: Partial<Color>
): Promise<Color> => {
  const response = await axios.patch<Color>(
    `${API_ENDPOINTS.COLORS}/${colorId}`,
    colorData
  );
  return response.data;
};

/**
 * Serviço para deletar uma cor.
 * @param colorId - O ID da cor a ser deletada.
 * @returns Uma promessa resolvida quando a cor for excluída.
 */
export const deleteColor = async (colorId: string): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.COLORS}/${colorId}`);
};

/**
 * Serviço para buscar uma cor pelo ID.
 * @param colorId - O ID da cor a ser buscada.
 * @returns A cor no formato `Color`.
 */
export const getColorById = async (colorId: string): Promise<Color> => {
  const response = await axios.get<Color>(`${API_ENDPOINTS.COLORS}/${colorId}`);
  return response.data;
};
