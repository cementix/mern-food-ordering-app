import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span>
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </div>
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
