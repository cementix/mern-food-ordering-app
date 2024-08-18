import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

import { Toaster } from "sonner";
import "./global.css";

// Create an instance of QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents refetching data when the window regains focus
    },
  },
});

// Render the application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      {/* Provide the QueryClient to the app for managing server-state */}
      <QueryClientProvider client={queryClient}>
        {/* Wrap the app with Auth0Provider for authentication */}
        <Auth0ProviderWithNavigate>
          {/* Define the routes for the application */}
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
