import React from "react";
import { Form } from "react-bootstrap";

interface FormTextAreaProps {
  controlId: string;
  label: string;
  name: string;
  value: string;
  required?: boolean; // Add required prop
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isInvalid: boolean;
  errorMessage: string;
  theme: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

/**
 * Componente de área de texto de formulário.
 * @param controlId - ID de controle do formulário.
 * @param label - Rótulo do campo.
 * @param name - Nome do campo.
 * @param value - Valor do campo.
 * @param onChange - Função de callback para mudança de valor.
 * @param isInvalid - Indica se o campo é inválido.
 * @param errorMessage - Mensagem de erro a ser exibida.
 * @param theme - Tema do componente.
 * @param onKeyPress - Função de callback para pressionamento de tecla.
 */
export const FormTextArea: React.FC<FormTextAreaProps> = ({
  controlId,
  label,
  name,
  value,
  required = false, // Default value for required
  onChange,
  isInvalid,
  errorMessage,
  theme,
  onKeyPress,
}) => (
  <Form.Group controlId={controlId} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as="textarea"
      name={name}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      required={required}
      className={
        theme === "dark" ? "bg-form-darkgray text-white border-form-gray" : ""
      }
      onKeyPress={onKeyPress}
    />
    <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
  </Form.Group>
);
