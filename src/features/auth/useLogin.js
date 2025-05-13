import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
