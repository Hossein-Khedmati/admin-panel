import { useDeleteProduct } from "./useDeleteProduct";
import { toast } from "react-toastify";

import styles from "./DeleteProductModal.module.css";
import deleteOption from "../../assets/close.png"

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
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <img src={deleteOption} alt="" />
        <h2 className={styles.title}>
          آیا از حذف "{product.name}" مطمئن هستید؟
        </h2>
        <div className={styles.actions}>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "در حال حذف..." : " حذف "}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
