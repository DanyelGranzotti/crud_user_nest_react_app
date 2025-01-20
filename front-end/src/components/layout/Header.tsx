import { useEffect, useRef, useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogout } from "../../modules/auth/hooks/authHooks";
import { RootState } from "../../state/rootReducer";

/**
 * Componente de cabeçalho que muda de cor com base no tema.
 */
const Header = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const logout = useLogout();

  const handleGearClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuOptionClick = (option: string) => {
    console.log(`${option} clicked!`);
    if (option === "Sair") {
      logout();
      toast.success("Logout realizado com sucesso!");
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header
      className={`px-8 py-6 h-20 flex justify-between items-center border-b-[1px]
         ${
           theme === "dark"
             ? "bg-background-dark text-white border-menu-border-dark"
             : "bg-white text-black border-menu-border-light"
         }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <img
          src={
            theme === "dark"
              ? "/svg/logo_horizontal.svg"
              : "/svg/dark_logo_horizontal.svg"
          }
          alt="Logo_horizontal"
          className="h-full"
        />
        <div className="relative" ref={menuRef}>
          <div
            onClick={handleGearClick}
            className="flex h-7 w-7 cursor-pointer hover:text-gray-500 transition-transform duration-300 ease-in-out transform hover:rotate-90 justify-center items-center"
          >
            <BsFillGearFill size={16} />
          </div>
          {menuOpen && (
            <div
              className={`absolute right-0 mt-2 w-64 rounded-sm border-[1px] 
                 ${
                   theme === "dark"
                     ? "bg-background-dark text-gray-200 border-menu-border-dark "
                     : "bg-white text-gray-700 border-menu-border-light"
                 }`}
            >
              <ul>
                <li
                  onClick={() =>
                    handleMenuOptionClick("Editar cores do formulário")
                  }
                  className={`px-4 py-2 cursor-pointer ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Editar cores do formulário
                </li>
                <li
                  onClick={() => handleMenuOptionClick("Sair")}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <IoIosLogOut size={20} />
                  Sair
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
