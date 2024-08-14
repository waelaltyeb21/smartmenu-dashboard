import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = true;
  return token ? <Outlet /> : <Navigate to={"/"} replace={true} />;
};

export default ProtectedRoute;
