import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const NotFound = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className="flex justify-center items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col gap-3">
      <img
        src={theme === "dark" ? "/img/dark_404_cat.png" : "/img/404_cat.png"}
        alt="404 Cat"
        className="w-1/2 sm:w-1/5"
      />
      <h2 className="text-2xl sm:text-3xl">Página não encontrada</h2>
      <p className="text-xs sm:text-base text-gray-400 ">
        Desculpe, a página que você está procurando não existe.
      </p>
    </div>
  );
};

export default NotFound;
