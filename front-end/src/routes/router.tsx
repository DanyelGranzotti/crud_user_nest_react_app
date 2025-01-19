import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../modules/auth/components/ProtectedRoute";
import UserRoutes from "../modules/user/routes/UserRoutes";

/**
 * Componente que define as rotas da aplicação.
 * @returns As rotas configuradas.
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route
        path="/example-protection"
        element={
          <ProtectedRoute>
            <div>Example Module</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
