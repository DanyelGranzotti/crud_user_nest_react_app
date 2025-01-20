import { Route, Routes } from "react-router-dom";
import AuthRoutes from "../modules/auth/routes/AuthRoutes";
import UserRoutes from "../modules/user/routes/UserRoutes";
import NotFound from "../views/NotFound";

/**
 * Componente que define as rotas principais da aplicação.
 * @returns As rotas configuradas.
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
