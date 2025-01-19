import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormInput } from "../../../components/form/FormInput";
import { RootState } from "../../../state/store";
import { useLogin } from "../hooks/authHooks";

/**
 * Componente de formulário para login de usuário.
 * Gerencia o estado do formulário, validação e submissão.
 */
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const theme = useSelector((state: RootState) => state.theme.theme);
  /**
   * Manipula a mudança de valor dos campos do formulário.
   * @param e - Evento de mudança do campo de entrada.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /**
   * Manipula a submissão do formulário.
   * @param e - Evento de submissão do formulário.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(credentials);
      toast.success("Login realizado com sucesso!");
      navigate("/user/form/dashboard");
    } catch (error: any) {
      toast.error("Erro ao realizar login, verifique suas credenciais.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col sm:flex-row">
      <div className="flex flex-col w-full sm:h-full gap-5 justify-center items-center">
        <h1 className="text-2xl sm:text-3xl text-gray-400 dark:text-gray-400">
          Bem-vindo de volta!
        </h1>
        <img
          src={theme === "dark" ? "/svg/logo.svg" : "/svg/dark_logo.svg"}
          alt="Logo"
          className="w-1/2"
        />
      </div>
      <div className="flex w-full flex-col gap-10 p-5 sm:p-0">
        <Form onSubmit={handleSubmit} className="flex w-full sm:w-1/2 flex-col">
          <FormInput
            controlId="formEmail"
            label="Email"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            errorMessage={errors.email}
            theme={theme}
          />
          <FormInput
            controlId="formPassword"
            label="Senha"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            errorMessage={errors.password}
            theme={theme}
          />
          <Button variant="primary" type="submit" className="w-20">
            Entrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
