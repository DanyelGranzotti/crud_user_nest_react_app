import { Route, Routes } from "react-router-dom";
import NotFound from "../../../views/NotFound";
import ProtectedRoute from "../../auth/components/ProtectedRoute";
import Dashboard from "../views/Dashboard";
import FormSubmit from "../views/FormSubmit";
import SuccessSubmit from "../views/SuccessSubmit";

/**
 * Componente de rotas para o módulo de usuário.
 */
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="form" element={<FormSubmit />} />
      <Route path="form/success" element={<SuccessSubmit />} />
      <Route
        path="form/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
