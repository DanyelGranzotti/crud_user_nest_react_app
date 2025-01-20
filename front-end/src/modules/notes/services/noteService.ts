import axios from "../../../api/axiosConfig";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { Note, NoteCreate } from "../types/note";

/**
 * Serviço para buscar uma lista de notas.
 * @param params - Parâmetros de filtro ou paginação para a API.
 * @returns Uma lista de notas.
 */
export const getNotes = async (
  params: Record<string, any>
): Promise<Note[]> => {
  const response = await axios.get<Note[]>(API_ENDPOINTS.NOTES, { params });
  return response.data;
};

/**
 * Serviço para criar uma nova nota.
 * @param noteData - Dados da nota a ser criada.
 * @returns A nota criada.
 */
export const createNote = async (noteData: NoteCreate): Promise<Note> => {
  console.log(noteData);
  const response = await axios.post<Note>(API_ENDPOINTS.NOTES, noteData);
  return response.data;
};

/**
 * Serviço para atualizar uma nota existente.
 * @param noteId - O ID da nota a ser atualizada.
 * @param noteData - Dados parciais para atualizar a nota.
 * @returns A nota atualizada.
 */
export const updateNote = async (
  noteId: string,
  noteData: Partial<Note>
): Promise<Note> => {
  const response = await axios.patch<Note>(
    `${API_ENDPOINTS.NOTES}/${noteId}`,
    noteData
  );
  return response.data;
};

/**
 * Serviço para deletar uma nota.
 * @param noteId - O ID da nota a ser deletada.
 * @returns Uma promessa resolvida quando a nota for excluída.
 */
export const deleteNote = async (noteId: string): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.NOTES}/${noteId}`);
};

/**
 * Serviço para buscar uma nota pelo ID.
 * @param noteId - O ID da nota a ser buscada.
 * @returns A nota.
 */
export const getNoteById = async (noteId: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_ENDPOINTS.NOTES}/${noteId}`);
  return response.data;
};
