import { Route, Routes } from "react-router-dom";
import FormSubmit from "../views/FormSubmit";

/**
 * Componente de rotas para o módulo de usuário.
 */
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/example" element={<div>Example Module</div>} />
      <Route path="/form" element={<FormSubmit />} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
};

export default UserRoutes;
