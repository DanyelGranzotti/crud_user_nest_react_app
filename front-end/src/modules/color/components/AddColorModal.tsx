import { AxiosError } from "axios";
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
  const createColorMutation = useCreateColor();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const isFormValid = () => {
    return newColorName && newColorHex;
  };

  const handleSave = () => {
    if (!newColorName || !newColorHex) {
      toast.error("Nome e cor são obrigatórios.");
      return;
    }
    createColorMutation.mutate(
      {
        name: newColorName,
        hex_code: newColorHex,
        active: true,
      },
      {
        onSuccess: () => {
          toast.success("Cor adicionada com sucesso!");
          onHide();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error("Erro ao adicionar cor. Tente novamente mais tarde.");
          } else {
            toast.error("Erro desconhecido ao adicionar cor.");
          }
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
            onChange={(e) => setNewColorName(e.target.value)}
            isInvalid={
              createColorMutation.error instanceof AxiosError &&
              !!createColorMutation.error.response?.data?.errors?.newColorName
            }
            errorMessage={
              createColorMutation.error instanceof AxiosError
                ? createColorMutation.error.response?.data?.errors?.newColorName
                : ""
            }
            theme={theme}
          />
          <FormInput
            controlId="newColorHex"
            label="Cor"
            type="color"
            name="newColorHex"
            value={newColorHex}
            onChange={(e) => setNewColorHex(e.target.value)}
            isInvalid={
              createColorMutation.error instanceof AxiosError &&
              !!createColorMutation.error.response?.data?.errors?.newColorHex
            }
            errorMessage={
              createColorMutation.error instanceof AxiosError
                ? createColorMutation.error.response?.data?.errors?.newColorHex
                : ""
            }
            theme={theme}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!isFormValid()}
            >
              Adicionar
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddColorModal;
