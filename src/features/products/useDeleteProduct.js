import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "./productService";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // refresh لیست بعد از حذف
    },
  });
};
