import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/user-profile"
        className="flex items-center bg-white font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center hover:bg-gray-500 px-3 font-bold"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
