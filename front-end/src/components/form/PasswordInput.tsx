import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface PasswordInputProps {
  controlId: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  errorMessage: string;
  theme: string;
}

/**
 * Componente de entrada de senha com switch para alternar visibilidade.
 * @param controlId - ID de controle do formulário.
 * @param label - Rótulo do campo.
 * @param name - Nome do campo.
 * @param value - Valor do campo.
 * @param onChange - Função de callback para mudança de valor.
 * @param isInvalid - Indica se o campo é inválido.
 * @param errorMessage - Mensagem de erro a ser exibida.
 * @param theme - Tema do componente.
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  controlId,
  label,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  theme,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        required
        className={
          theme === "dark" ? "bg-form-darkgray text-white border-form-gray" : ""
        }
      />
      <Form.Check
        type="switch"
        id="custom-switch"
        label={showPassword ? "Ocultar" : "Mostrar"}
        onChange={togglePasswordVisibility}
        checked={showPassword}
        className="mt-2"
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
