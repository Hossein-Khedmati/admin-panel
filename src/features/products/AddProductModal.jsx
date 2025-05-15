import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddProduct } from "./useAddProduct";
import { toast } from "react-toastify";
import { productSchema } from "../validationOnSchema";

import styles from "./AddProductModal.module.css";

const AddProductModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const { mutate, isLoading } = useAddProduct();

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      price: data.price,
      quantity: data.stock,
    };

    console.log(payload);

    mutate(payload, {
      onSuccess: () => {
        toast.success("محصول با موفقیت افزوده شد ✅");
        reset();
        onClose();
      },
      onError: () => {
        toast.error("خطا در افزودن محصول ❌");
      },
    });
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>افزودن محصول جدید</h2>
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
              {isLoading ? "در حال افزودن..." : "افزودن محصول"}
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

export default AddProductModal;
