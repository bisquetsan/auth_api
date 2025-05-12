import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const { user, token } = useAuth();
  if (user && token) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}
