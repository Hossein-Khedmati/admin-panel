import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "./productService";

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
