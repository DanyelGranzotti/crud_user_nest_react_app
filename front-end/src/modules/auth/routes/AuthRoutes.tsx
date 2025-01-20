import { Route, Routes } from "react-router-dom";
import NotFound from "../../../views/NotFound";
import Login from "../views/Login";

/**
 * Componente de rotas para o módulo de autenticação.
 */
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
