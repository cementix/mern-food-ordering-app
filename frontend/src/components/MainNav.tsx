import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span>
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant="ghost"
          className="hover:bg-white font-bold text-xl hover:text-orange-500"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
