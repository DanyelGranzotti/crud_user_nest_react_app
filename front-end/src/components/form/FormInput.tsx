import React from "react";
import { Form } from "react-bootstrap";

interface FormInputProps {
  controlId: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage: string;
  theme: string;
}

/**
 * Componente de entrada de formulário.
 * @param controlId - ID de controle do formulário.
 * @param label - Rótulo do campo.
 * @param type - Tipo de entrada (ex: text, password).
 * @param name - Nome do campo.
 * @param value - Valor do campo.
 * @param onChange - Função de callback para mudança de valor.
 * @param isInvalid - Indica se o campo é inválido.
 * @param errorMessage - Mensagem de erro a ser exibida.
 * @param theme - Tema do componente.
 */
export const FormInput: React.FC<FormInputProps> = ({
  controlId,
  label,
  type,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  theme,
}) => (
  <Form.Group controlId={controlId} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      required
      className={
        theme === "dark" ? "bg-form-darkgray text-white border-form-gray" : ""
      }
    />
    <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
  </Form.Group>
);
