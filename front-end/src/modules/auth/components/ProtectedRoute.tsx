import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectIsAuthenticated } from "../state/authSlice";

/**
 * Componente de rota protegida.
 * Redireciona usuários não autenticados para a página de login.
 * @param children - Componentes filhos a serem renderizados se autenticado.
 * @returns Componentes filhos ou redirecionamento para login.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useSelector(selectIsAuthenticated);
  if (!isAuth) {
    toast.info("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default ProtectedRoute;
