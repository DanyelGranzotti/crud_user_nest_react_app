import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../services/noteService";
import { Note, NoteCreate } from "../types/note";

/**
 * Hook para buscar uma lista de notas com filtro e paginação.
 * @param userId - ID do usuário para filtrar as notas.
 * @param page - Número da página para paginação.
 * @param limit - Limite de notas por página.
 * @returns Dados da lista de notas, estados de carregamento e erro.
 */
export const useGetNotes = (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["notes", userId, page, limit],
    queryFn: async () => {
      try {
        return await getNotes({ userId, page, limit });
      } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
      }
    },
  });
};

/**
 * Hook para criar uma nova nota.
 * @returns Função de mutação para criar a nota.
 */
export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, NoteCreate>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: Error) => {
      console.error("Error creating note:", error);
    },
  });
};

/**
 * Hook para atualizar uma nota existente.
 * @returns Função de mutação para atualizar a nota.
 */
export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, { noteId: string; noteData: Partial<Note> }>({
    mutationFn: ({ noteId, noteData }) => updateNote(noteId, noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: Error) => {
      console.error("Error updating note:", error);
    },
  });
};

/**
 * Hook para deletar uma nota.
 * @returns Função de mutação para deletar a nota.
 */
export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting note:", error);
    },
  });
};

/**
 * Hook para buscar detalhes de uma nota pelo ID.
 * @param noteId - O ID da nota a ser buscada.
 * @returns Dados da nota, estados de carregamento e erro.
 */
export const useGetNoteById = (noteId: string) => {
  return useQuery({
    queryKey: ["note", noteId],
    queryFn: async () => {
      try {
        return await getNoteById(noteId);
      } catch (error) {
        console.error("Error fetching note by ID:", error);
        throw error;
      }
    },
  });
};
