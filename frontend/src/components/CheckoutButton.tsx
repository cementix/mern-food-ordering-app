import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import LoaderScreen from "./LoaderScreen";
import { Button } from "./ui/button";

const CheckoutButton = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="flex-1 bg-orange-500">
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading) {
    return <LoaderScreen />;
  }

  return <div>CheckoutButton</div>;
};

export default CheckoutButton;
