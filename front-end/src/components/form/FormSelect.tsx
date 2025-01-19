import React from "react";
import { Form } from "react-bootstrap";

interface FormSelectProps {
  controlId: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isInvalid: boolean;
  errorMessage: string;
  options: { id: string; name: string }[];
  theme: string;
  placeholder: string;
}

/**
 * Componente de seleção de formulário.
 * @param controlId - ID de controle do formulário.
 * @param label - Rótulo do campo.
 * @param name - Nome do campo.
 * @param value - Valor selecionado.
 * @param onChange - Função de callback para mudança de valor.
 * @param isInvalid - Indica se o campo é inválido.
 * @param errorMessage - Mensagem de erro a ser exibida.
 * @param options - Opções de seleção.
 * @param theme - Tema do componente.
 * @param placeholder - Texto de orientação do campo.
 */
export const FormSelect: React.FC<FormSelectProps> = ({
  controlId,
  label,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  options = [],
  theme,
  placeholder,
}) => {
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<any>
  ) => {
    onChange(e as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        value={value}
        onChange={handleSelectChange}
        isInvalid={isInvalid}
        required
        className={
          theme === "dark" ? "bg-form-darkgray text-white border-form-gray" : ""
        }
      >
        <option value="">{placeholder}</option>
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Não há opções disponíveis
          </option>
        )}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
