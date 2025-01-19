import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../state/authSlice";

import { ReactNode } from "react";

/**
 * Componente de rota protegida.
 * Redireciona usuários não autenticados para a página de login.
 * @param children - Componentes filhos a serem renderizados se autenticado.
 * @returns Componentes filhos ou redirecionamento para login.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useSelector(selectIsAuthenticated);
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;