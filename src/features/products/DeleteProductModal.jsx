import { useDeleteProduct } from "./useDeleteProduct";
import { toast } from "react-toastify";

const DeleteProductModal = ({ product, onClose }) => {
  const { mutate, isLoading } = useDeleteProduct();

  const handleDelete = () => {
    mutate(product.id, {
      onSuccess: () => {
        toast.success("محصول با موفقیت حذف شد ✅");
        onClose();
      },
      onError: () => {
        toast.error("خطا در حذف محصول ❌");
      },
    });
  };

  return (
    <div className="modal">
      <h2>آیا از حذف "{product.name}" مطمئن هستید؟</h2>
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "در حال حذف..." : "بله، حذف کن"}
      </button>
      <button onClick={onClose}>لغو</button>
    </div>
  );
};

export default DeleteProductModal;
