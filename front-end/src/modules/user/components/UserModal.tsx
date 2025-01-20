import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../../../components/common/Modal";
import { FormTextArea } from "../../../components/form/FormTextArea";
import { RootState } from "../../../state/rootReducer";
import { useCreateNote, useGetNotes } from "../../notes/hooks/useNoteHooks";
import { useGetUserById } from "../hooks/useUserHooks";

/**
 * Propriedades do componente UserModal.
 */
interface UserModalProps {
  show: boolean;
  onHide: () => void;
  userId: string;
}

/**
 * Componente de modal de usuário personalizado.
 * @param {UserModalProps} props - Propriedades do componente.
 */
const UserModal: React.FC<UserModalProps> = ({ show, onHide, userId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: user, isLoading, error } = useGetUserById(userId);
  const [newNote, setNewNote] = useState("");
  const createNoteMutation = useCreateNote();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { data: notes, refetch: refetchNotes } = useGetNotes(userId, 1, 2);

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast.error("A descrição da nota é obrigatória.");
      return;
    }
    createNoteMutation.mutate(
      {
        description: newNote,
        userId: userId,
      },
      {
        onSuccess: () => {
          setNewNote("");
          refetchNotes();
          toast.success("Observação adicionada com sucesso!");
        },
      }
    );
  };

  const isFormValid = () => {
    return newNote.trim();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAddNote();
    }
  };

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      refetchNotes();
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setNewNote("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show, refetchNotes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === document.getElementById("user-modal-overlay")) {
        onHide();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onHide]);

  if (!isVisible) return null;

  return (
    <Modal show={show} onHide={onHide}>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar informações do usuário.</p>}
      {user && (
        <div className="flex justify-between items-center flex-col p-6 gap-6">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-base text-modal-title">{user.fullName}</h2>
            <button
              onClick={onHide}
              className="text-card-subtitle hover:opacity-70 transition-opacity duration-300 ease-in-out transform"
            >
              <BsXCircleFill size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2 w-full text-sm">
            <p className="text-modal-title">
              <span className="text-card-subtitle">Email:</span> {user.email}
            </p>
            <p className="text-modal-title">
              <span className="text-card-subtitle">CPF:</span> {user.cpf}
            </p>
            <p className="text-modal-title">
              <span className="text-card-subtitle">Cor Favorita:</span>
              {user.favoriteColor.name}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-base text-modal-title">Observações:</h2>
            <span className="text-xs text-modal-title">
              {Array.isArray(notes)
                ? notes.length > 0
                  ? notes.slice(0, 2).map((note, index) => (
                      <div key={index}>
                        <p>{note.description}</p>
                        <p className="text-card-subtitle">
                          Criado em:{" "}
                          {new Date(note.created_at).toLocaleDateString()}
                        </p>
                        {index < notes.length - 1 && <hr className="my-2" />}
                      </div>
                    ))
                  : "Nenhuma observação cadastrada."
                : "Erro ao carregar observações."}
            </span>
            <FormTextArea
              controlId="newNote"
              label="Adicionar Observação"
              name="newNote"
              value={newNote}
              required={true}
              onChange={(e) => {
                setNewNote(e.target.value);
              }}
              isInvalid={!!createNoteMutation.error}
              errorMessage={createNoteMutation.error?.message || ""}
              theme={theme}
              onKeyPress={handleKeyPress}
            />
            <div className="flex justify-end w-full">
              <Button
                variant="secondary"
                onClick={handleAddNote}
                disabled={!isFormValid()}
              >
                Adicionar Observação
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UserModal;
