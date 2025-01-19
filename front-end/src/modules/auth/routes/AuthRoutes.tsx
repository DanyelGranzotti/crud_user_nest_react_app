import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";

/**
 * Componente de rotas para o módulo de autenticação.
 */
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
