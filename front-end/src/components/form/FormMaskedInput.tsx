import React from "react";
import { Form } from "react-bootstrap";
import InputMask from "react-input-mask";

interface FormMaskedInputProps {
  controlId: string;
  label: string;
  mask: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage: string;
  theme: string;
}

/**
 * Componente de entrada de formulário com máscara.
 * @param controlId - ID de controle do formulário.
 * @param label - Rótulo do campo.
 * @param mask - Máscara de entrada.
 * @param name - Nome do campo.
 * @param value - Valor do campo.
 * @param onChange - Função de callback para mudança de valor.
 * @param isInvalid - Indica se o campo é inválido.
 * @param errorMessage - Mensagem de erro a ser exibida.
 * @param theme - Tema do componente.
 */
export const FormMaskedInput: React.FC<FormMaskedInputProps> = ({
  controlId,
  label,
  mask,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  theme,
}) => (
  <Form.Group controlId={controlId} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <InputMask
      mask={mask}
      value={value}
      onChange={onChange}
      className={
        theme === "dark" ? "bg-form-darkgray text-white border-form-gray" : ""
      }
    >
      {(inputProps: any) => (
        <Form.Control
          {...inputProps}
          type="text"
          name={name}
          isInvalid={isInvalid}
          required
        />
      )}
    </InputMask>
    <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
  </Form.Group>
);
