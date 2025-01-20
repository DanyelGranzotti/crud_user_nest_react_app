import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../../../components/common/Modal";
import { FormInput } from "../../../components/form/FormInput";
import { RootState } from "../../../state/rootReducer";
import { useUpdateColor } from "../hooks/useColorHooks";
import { Color } from "../types/color";

interface EditColorModalProps {
  show: boolean;
  onHide: () => void;
  color: Color;
}

const EditColorModal: React.FC<EditColorModalProps> = ({
  show,
  onHide,
  color,
}) => {
  const [colorName, setColorName] = useState<string>(color.name);
  const [colorHex, setColorHex] = useState<string>(color.hex_code);
  const updateColorMutation = useUpdateColor();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    setColorName(color.name);
    setColorHex(color.hex_code);
  }, [color]);

  const isFormValid = () => {
    return colorName && colorHex;
  };

  const handleSave = () => {
    if (!colorName || !colorHex) {
      toast.error("Nome e cor são obrigatórios.");
      return;
    }
    updateColorMutation.mutate(
      {
        colorId: color.id,
        colorData: { name: colorName, hex_code: colorHex, active: true },
      },
      {
        onSuccess: () => {
          toast.success("Cor atualizada com sucesso!");
          onHide();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error("Erro ao atualizar cor. Tente novamente mais tarde.");
          } else {
            toast.error("Erro desconhecido ao atualizar cor.");
          }
        },
      }
    );
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="flex justify-between items-center flex-col p-6 gap-6">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-base text-modal-title">Editar Cor</h2>
          <button
            onClick={onHide}
            className="text-card-subtitle hover:opacity-70 transition-opacity duration-300 ease-in-out transform"
          >
            <BsXCircleFill size={24} />
          </button>
        </div>
        <Form className="flex flex-col gap-4 w-full">
          <FormInput
            controlId="colorName"
            label="Nome da Cor"
            type="text"
            name="colorName"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            isInvalid={
              updateColorMutation.error instanceof AxiosError &&
              !!updateColorMutation.error.response?.data?.errors?.colorName
            }
            errorMessage={
              updateColorMutation.error instanceof AxiosError
                ? updateColorMutation.error.response?.data?.errors?.colorName
                : ""
            }
            theme={theme}
          />
          <FormInput
            controlId="colorHex"
            label="Cor"
            type="color"
            name="colorHex"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            isInvalid={
              updateColorMutation.error instanceof AxiosError &&
              !!updateColorMutation.error.response?.data?.errors?.colorHex
            }
            errorMessage={
              updateColorMutation.error instanceof AxiosError
                ? updateColorMutation.error.response?.data?.errors?.colorHex
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
              Salvar
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EditColorModal;
