import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../../state/store";

/**
 * Componente de tela de sucesso de submissão do formulário.
 */
const SuccessSubmit = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col gap-10  p-5 sm:p-0">
      <div className="flex flex-col w-full gap-5 justify-center items-center">
        <img
          src={theme === "dark" ? "/svg/logo.svg" : "/svg/dark_logo.svg"}
          alt=""
          className="sm:w-1/12 w-1/2"
        />
      </div>
      <div className="flex flex-col gap-0.5 sm:gap-2 text-center justify-center items-center">
        <h2 className="text-2xl sm:text-3xl">
          Suas informações foram enviadas!
        </h2>
        <p className="text-xs sm:text-base text-gray-400 ">
          Em breve, entrarei em contato com você.
        </p>
      </div>
      <Button
        variant="secondary"
        onClick={() => navigate("/user/form")}
        className="sm:max-w-44 sm:w-full w-1/2 text-sm"
      >
        Voltar para formulário
      </Button>
    </div>
  );
};

export default SuccessSubmit;
