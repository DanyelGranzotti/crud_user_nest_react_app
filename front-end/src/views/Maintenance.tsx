import { useSelector } from "react-redux";
import { RootState } from "../state/rootReducer";

const Maintenance = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className="flex justify-center items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col gap-3">
      <img
        src={
          theme === "dark" ? "/img/dark_ERROR_cat.png" : "/img/ERROR_cat.png"
        }
        alt="ERROR Cat"
        className="w-1/2 sm:w-1/5"
      />
      <h2 className="text-2xl sm:text-3xl">Algo deu errado</h2>
      <p className="text-xs sm:text-base text-gray-400 text-center">
        Essa página pode estar fora do ar temporariamente.
        <br />
        Tente novamente mais tarde.
      </p>
    </div>
  );
};

export default Maintenance;
