import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0(); // Get the authenticated user
  const { createUser } = useCreateMyUser(); // Hook for creating a user in the backend

  const hasCreatedUser = useRef(false); // Track whether the user creation has been attempted

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email }); // Create user if not already done
      hasCreatedUser.current = true; // Prevent duplicate user creation
    }
    navigate("/"); // Redirect to the home page
  }, [createUser, navigate, user]);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <LoaderCircle className="animate-spin" /> {/* Loading spinner */}
    </div>
  );
};

export default AuthCallbackPage;
