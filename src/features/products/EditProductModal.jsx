import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditProduct } from "./useEditProduct";
import { toast } from "react-toastify";
import { productSchema } from "../validationOnSchema";

import styles from "./EditProductModal.module.css";

const EditProductModal = ({ product, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product.name,
      stock: product.quantity,
      price: product.price,
    },
  });

  const { mutate, isLoading } = useEditProduct();

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      price: data.price,
      quantity: data.stock,
    };

    mutate(
      { id: product.id, data: payload },
      {
        onSuccess: () => {
          toast.success("محصول با موفقیت ویرایش شد ✅");
          onClose();
        },
        onError: () => {
          toast.error("خطا در ویرایش محصول ❌");
        },
      }
    );
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>ویرایش اطلاعات</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.inputsTitle}>نام کالا</p>
          <input
            {...register("name")}
            placeholder="نام کالا"
            className={styles.input}
          />
          <p className={styles.error}>{errors.name?.message}</p>

          <p className={styles.inputsTitle}>موجودی</p>
          <input
            {...register("stock")}
            type="number"
            placeholder="موجودی"
            className={styles.input}
          />
          <p className={styles.error}>{errors.stock?.message}</p>

          <p className={styles.inputsTitle}>قیمت</p>
          <input
            {...register("price")}
            type="number"
            placeholder="قیمت"
            className={styles.input}
          />
          <p className={styles.error}>{errors.price?.message}</p>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "در حال ویرایش..." : "ثبت اطلاعات جدید"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
