
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}
