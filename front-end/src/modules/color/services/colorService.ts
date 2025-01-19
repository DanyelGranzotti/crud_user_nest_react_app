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
  // Faz uma requisição GET para o endpoint de cores com os parâmetros fornecidos.
  const response = await axios.get<Color[]>(API_ENDPOINTS.COLORS, { params });
  // Retorna apenas os dados da resposta.
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
  // Faz uma requisição POST para o endpoint de cores com os dados fornecidos.
  const response = await axios.post<Color>(API_ENDPOINTS.COLORS, colorData);
  // Retorna a cor criada.
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
  // Faz uma requisição PATCH para o endpoint específico da cor.
  const response = await axios.patch<Color>(
    `${API_ENDPOINTS.COLORS}/${colorId}`,
    colorData
  );
  // Retorna a cor atualizada.
  return response.data;
};

/**
 * Serviço para deletar uma cor.
 * @param colorId - O ID da cor a ser deletada.
 * @returns Uma promessa resolvida quando a cor for excluída.
 */
export const deleteColor = async (colorId: string): Promise<void> => {
  // Faz uma requisição DELETE para o endpoint específico da cor.
  await axios.delete(`${API_ENDPOINTS.COLORS}/${colorId}`);
  // Sem retorno de dados, apenas resolução da promessa.
};

/**
 * Serviço para buscar uma cor pelo ID.
 * @param colorId - O ID da cor a ser buscada.
 * @returns A cor no formato `Color`.
 */
export const getColorById = async (colorId: string): Promise<Color> => {
  // Faz uma requisição GET para o endpoint específico da cor.
  const response = await axios.get<Color>(`${API_ENDPOINTS.COLORS}/${colorId}`);
  // Retorna os dados da cor.
  return response.data;
};
