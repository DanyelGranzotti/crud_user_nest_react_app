import { Route, Routes } from "react-router-dom";
import FormSubmit from "../views/FormSubmit";
import SuccessSubmit from "../views/SuccessSubmit";

/**
 * Componente de rotas para o módulo de usuário.
 */
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/form" element={<FormSubmit />} />
      <Route path="/form/success" element={<SuccessSubmit />} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
};

export default UserRoutes;
