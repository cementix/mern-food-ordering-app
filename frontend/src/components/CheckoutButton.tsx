import { useGetMyUser } from "@/api/MyUserApi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { LoadingButton } from "./LoadingButton";
import { Button } from "./ui/button";

const CheckoutButton = ({
  onCheckout,
  disabled,
  isLoading,
}: {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
}) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

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

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="flex-1 bg-orange-500">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-50 md:min-w-[700px] max-w-[425px]">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
