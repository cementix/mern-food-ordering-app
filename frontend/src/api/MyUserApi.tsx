import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, UseMutationResult } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Base API URL

// Request payload type for creating a user
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

// Response type for the user creation API
type CreateUserResponse = {
  id: string;
  auth0Id: string;
  email: string;
};

// Hook for creating a user
export const useCreateMyUser = () => {
  // Importing the funtcion to get access token
  const { getAccessTokenSilently } = useAuth0();

  // Function to make the API request
  const createMyUserRequest = async (
    user: CreateUserRequest
  ): Promise<CreateUserResponse> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json() as Promise<CreateUserResponse>;
  };

  // Configure mutation using react-query
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  }: UseMutationResult<
    CreateUserResponse,
    Error,
    CreateUserRequest
  > = useMutation(createMyUserRequest);

  return { createUser, isLoading, isError, isSuccess };
};

type updateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: updateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update the user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  return { updateUser, isLoading };
};
