import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../../../components/common/Modal";
import { FormInput } from "../../../components/form/FormInput";
import { RootState } from "../../../state/rootReducer";
import { useCreateColor } from "../hooks/useColorHooks";

interface AddColorModalProps {
  show: boolean;
  onHide: () => void;
}

const AddColorModal: React.FC<AddColorModalProps> = ({ show, onHide }) => {
  const [newColorName, setNewColorName] = useState<string>("");
  const [newColorHex, setNewColorHex] = useState<string>("#000000");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const createColorMutation = useCreateColor();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleSave = () => {
    if (!newColorName || !newColorHex) {
      setErrors({
        newColorName: !newColorName ? "Nome é obrigatório." : "",
        newColorHex: !newColorHex ? "Cor é obrigatória." : "",
      });
      toast.error("Nome e cor são obrigatórios.");
      return;
    }
    createColorMutation.mutate(
      { name: newColorName, hex_code: newColorHex, active: true },
      {
        onSuccess: () => {
          toast.success("Cor adicionada com sucesso!");
          setNewColorName("");
          setNewColorHex("#000000");
          onHide();
        },
        onError: () => {
          toast.error("Erro ao adicionar cor. Tente novamente mais tarde.");
        },
      }
    );
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="flex justify-between items-center flex-col p-6 gap-6">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-base text-modal-title">Adicionar Nova Cor</h2>
          <button
            onClick={onHide}
            className="text-card-subtitle hover:opacity-70 transition-opacity duration-300 ease-in-out transform"
          >
            <BsXCircleFill size={24} />
          </button>
        </div>
        <Form className="flex flex-col gap-4 w-full">
          <FormInput
            controlId="newColorName"
            label="Nome da Cor"
            type="text"
            name="newColorName"
            value={newColorName}
            onChange={(e) => {
              setNewColorName(e.target.value);
              setErrors({ ...errors, newColorName: "" });
            }}
            isInvalid={!!errors.newColorName}
            errorMessage={errors.newColorName}
            theme={theme}
          />
          <FormInput
            controlId="newColorHex"
            label="Cor"
            type="color"
            name="newColorHex"
            value={newColorHex}
            onChange={(e) => {
              setNewColorHex(e.target.value);
              setErrors({ ...errors, newColorHex: "" });
            }}
            isInvalid={!!errors.newColorHex}
            errorMessage={errors.newColorHex}
            theme={theme}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Adicionar
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddColorModal;
