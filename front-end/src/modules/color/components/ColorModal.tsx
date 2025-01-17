import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsPencil, BsXCircleFill, BsXLg } from "react-icons/bs";
import { toast } from "react-toastify";
import GenericTable from "../../../components/common/GenericTable";
import Modal from "../../../components/common/Modal";
import { useGetColors } from "../hooks/useColorHooks";
import { Color } from "../types/color";
import AddColorModal from "./AddColorModal";
import DeleteColorModal from "./DeleteColorModal";
import EditColorModal from "./EditColorModal";

interface ColorModalProps {
  show: boolean;
  onHide: () => void;
}

const ColorModal: React.FC<ColorModalProps> = ({ show, onHide }) => {
  const [addColorModalOpen, setAddColorModalOpen] = useState(false);
  const [editColorModalOpen, setEditColorModalOpen] = useState(false);
  const [deleteColorModalOpen, setDeleteColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const { data: colors, isLoading, error } = useGetColors({});

  useEffect(() => {
    if (error) {
      toast.error("Erro ao carregar cores. Tente novamente mais tarde.");
    }
  }, [error]);

  const handleOpenAddModal = () => {
    setAddColorModalOpen(true);
  };

  const handleOpenEditModal = (color: Color) => {
    setSelectedColor(color);
    setEditColorModalOpen(true);
  };

  const handleOpenDeleteModal = (color: Color) => {
    setSelectedColor(color);
    setDeleteColorModalOpen(true);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <div className="flex justify-between items-center flex-col p-6 gap-6">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-base text-modal-title">Gerenciar Cores</h2>
            <button
              onClick={onHide}
              className="text-card-subtitle hover:opacity-70 transition-opacity duration-300 ease-in-out transform"
            >
              <BsXCircleFill size={24} />
            </button>
          </div>
          {isLoading && <p>Carregando cores...</p>}
          {colors && (
            <GenericTable<Color>
              columns={[
                { header: "Nome", accessor: "name" },
                {
                  header: "Cor",
                  accessor: "hex_code",
                  render: (color) => (
                    <div
                      style={{
                        backgroundColor: color.hex_code,
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        marginRight: "20px",
                      }}
                    ></div>
                  ),
                },
              ]}
              data={colors}
              renderRowActions={(color) => (
                <div className="flex gap-3 w-full justify-center">
                  <BsPencil
                    className="cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out transform"
                    onClick={() => handleOpenEditModal(color)}
                  />
                  <BsXLg
                    className="cursor-pointer hover:opacity-70 transition-opacity duration-300 ease-in-out transform"
                    onClick={() => handleOpenDeleteModal(color)}
                  />
                </div>
              )}
            />
          )}
          <div className="flex justify-end w-full">
            <Button onClick={handleOpenAddModal}>Adicionar Cor</Button>
          </div>
        </div>
      </Modal>
      <AddColorModal
        show={addColorModalOpen}
        onHide={() => setAddColorModalOpen(false)}
      />
      {selectedColor && (
        <EditColorModal
          show={editColorModalOpen}
          onHide={() => setEditColorModalOpen(false)}
          color={selectedColor}
        />
      )}
      {selectedColor && (
        <DeleteColorModal
          show={deleteColorModalOpen}
          onHide={() => setDeleteColorModalOpen(false)}
          color={selectedColor}
        />
      )}
    </>
  );
};

export default ColorModal;
