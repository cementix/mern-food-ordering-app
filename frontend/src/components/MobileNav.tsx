import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound, Menu } from "lucide-react";
import MobileNavLinks from "./MobileNavLinks";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-6">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center gap-2 font-bold">
              <CircleUserRound className="text-orange-500" />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to MernEats.com</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className="flex-1 bg-orange-500 font-bold"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
