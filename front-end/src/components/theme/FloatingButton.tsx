import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../state/global/themeSlice";
import { RootState } from "../../state/rootReducer";

const FloatingButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`fixed bottom-5 right-5 rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-500 transform hover:scale-110 ${
        theme === "dark"
          ? "bg-background-dark text-white hover:bg-white hover:text-black shadow-xl shadow-gray-400"
          : "bg-white text-black hover:bg-black hover:text-white shadow-xl shadow-gray-400"
      }`}
      onClick={() => dispatch(toggleTheme())}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {theme === "dark" ? (
        hover ? (
          <BsSunFill />
        ) : (
          <BsMoonFill />
        )
      ) : hover ? (
        <BsMoonFill />
      ) : (
        <BsSunFill />
      )}
    </button>
  );
};

export default FloatingButton;
