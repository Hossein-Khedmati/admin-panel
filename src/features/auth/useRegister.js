import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./authService";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
