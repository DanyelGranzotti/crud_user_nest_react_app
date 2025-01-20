import React from "react";
import { Button } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../../../components/common/Modal";
import { RootState } from "../../../state/rootReducer";
import { useDeleteColor } from "../hooks/useColorHooks";
import { Color } from "../types/color";

interface DeleteColorModalProps {
  show: boolean;
  onHide: () => void;
  color: Color;
}

const DeleteColorModal: React.FC<DeleteColorModalProps> = ({
  show,
  onHide,
  color,
}) => {
  const deleteColorMutation = useDeleteColor();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleDelete = () => {
    deleteColorMutation.mutate(color.id, {
      onSuccess: () => {
        toast.success("Cor excluída com sucesso!");
        onHide();
      },
      onError: () => {
        toast.error("Erro ao excluir cor. Tente novamente mais tarde.");
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="flex justify-between items-center flex-col p-6 gap-6">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-base text-modal-title">Excluir Cor</h2>
          <button
            onClick={onHide}
            className="text-card-subtitle hover:opacity-70 transition-opacity duration-300 ease-in-out transform"
          >
            <BsXCircleFill size={24} />
          </button>
        </div>
        <p>Tem certeza que deseja excluir a cor "{color.name}"?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteColorModal;
