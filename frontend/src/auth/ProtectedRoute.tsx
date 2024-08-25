import { useAuth0 } from "@auth0/auth0-react";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <LoaderCircle className="text-orange-500 animate-spin" size={40} />;
      </div>
    );

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
