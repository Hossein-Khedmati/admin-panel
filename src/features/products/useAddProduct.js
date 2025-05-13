import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./productService";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // رفرش لیست محصولات
    },
  });
};
