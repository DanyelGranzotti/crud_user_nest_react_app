import { AxiosError } from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput } from "../../../components/form/FormInput";
import { FormMaskedInput } from "../../../components/form/FormMaskedInput";
import { FormSelect } from "../../../components/form/FormSelect";
import { RootState } from "../../../state/rootReducer";
import { useGetColors } from "../../color/hooks/useColorHooks";
import { useCreateUser } from "../hooks/useUserHooks";
import { isValidCPF } from "../utils/validation";

/**
 * Componente de formulário para criar um usuário.
 * Gerencia o estado do formulário, validação e submissão.
 */
const FormSubmit = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    email: "",
    favoriteColor: { id: "", name: "", hex_code: "", active: true },
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});

  const createUserMutation = useCreateUser();
  const { data: colors } = useGetColors({});
  const theme = useSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();

  /**
   * Manipula a mudança de valor dos campos do formulário.
   * @param e - Evento de mudança do campo de entrada.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Valida os dados do formulário.
   * @returns `true` se o formulário for válido, caso contrário `false`.
   */
  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.fullName) {
      newErrors.fullName = "O nome é obrigatório.";
    }
    if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = "Formato de CPF inválido.";
    }
    if (!formData.email) {
      newErrors.email = "O e-mail é obrigatório.";
    }
    if (!formData.favoriteColor.id) {
      newErrors.favoriteColor = "A cor favorita é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manipula a submissão do formulário.
   * @param e - Evento de submissão do formulário.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast.error("Por favor, complete o reCAPTCHA.");
      return;
    }
    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const sanitizedCpf = formData.cpf.replace(/\D/g, "");
    const payload = {
      fullName: formData.fullName,
      cpf: sanitizedCpf,
      email: formData.email,
      favoriteColorId: formData.favoriteColor.id,
      recaptchaToken,
    };

    createUserMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Formulário enviado com sucesso!");
        navigate("/user/form/success");
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data as { message?: string })
          ?.message;
        if (axiosError.response?.status === 409) {
          if (errorMessage === "CPF already in use") {
            toast.error(
              "O CPF informado já está em uso, usuário já cadastrado."
            );
          } else if (errorMessage === "Email already in use") {
            toast.error(
              "O email informado já está em uso, usuário já cadastrado."
            );
          }
        } else {
          toast.error("Erro ao criar usuário, tente novamente mais tarde.");
        }
      },
    });
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      isValidCPF(formData.cpf) &&
      formData.email &&
      formData.favoriteColor.id &&
      recaptchaToken
    );
  };

  return (
    <div className="flex justify-center items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col sm:flex-row">
      <div className="flex flex-col w-full h-full gap-5 justify-center items-center">
        <h1 className="text-2xl sm:text-3xl text-gray-400 dark:text-gray-400">
          Olá! Eu sou o
        </h1>
        <img
          src={theme === "dark" ? "/svg/logo.svg" : "/svg/dark_logo.svg"}
          alt="Logo"
          className="w-1/2"
        />
      </div>
      <div className="flex w-full flex-col gap-10 p-5 sm:p-0">
        <div className="flex flex-col gap-0.5 sm:gap-2">
          <h2 className="text-2xl sm:text-3xl">Estou ansioso para ajudá-lo!</h2>
          <p className="text-xs sm:text-base text-gray-400 ">
            Mas antes, preciso que você preencha o formulário abaixo.
          </p>
        </div>
        <Form onSubmit={handleSubmit} className="flex w-full sm:w-1/2 flex-col">
          <FormInput
            controlId="formFullName"
            label="Nome Completo"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName || ""}
            theme={theme}
          />
          <FormMaskedInput
            controlId="formCpf"
            label="CPF"
            mask="999.999.999-99"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            isInvalid={!!errors.cpf}
            errorMessage={errors.cpf || ""}
            theme={theme}
          />
          <FormInput
            controlId="formEmail"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            errorMessage={errors.email || ""}
            theme={theme}
          />
          <FormSelect
            controlId="formFavoriteColor"
            label="Cor Favorita"
            name="favoriteColor"
            value={formData.favoriteColor.id}
            onChange={(e) =>
              setFormData({
                ...formData,
                favoriteColor: colors?.find(
                  (color) => color.id === e.target.value
                ) || { id: "", name: "", hex_code: "", active: false },
              })
            }
            isInvalid={!!errors.favoriteColor}
            errorMessage={errors.favoriteColor || ""}
            options={colors || []}
            theme={theme}
            placeholder="Selecione uma cor"
          />
          <div className="flex flex-col gap-5">
            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => setRecaptchaToken(token)}
            />
            <Button
              variant="primary"
              type="submit"
              className="w-20"
              disabled={!isFormValid()}
            >
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormSubmit;
