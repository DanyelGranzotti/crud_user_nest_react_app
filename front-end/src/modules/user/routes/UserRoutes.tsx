import { Route, Routes } from 'react-router-dom';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/example" element={<div>Example Module</div>} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
};

export default UserRoutes;
