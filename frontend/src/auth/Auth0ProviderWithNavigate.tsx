import { Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithNavigate = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  // Auth0 configuration from environment variables
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // Handle redirection after login
  const onRedirectCallback = () => {
    navigate("/auth-callback"); // Redirect to the authentication callback page
  };

  // Ensure necessary environment variables are set
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialise auth");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children} {/* Render the child components */}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
