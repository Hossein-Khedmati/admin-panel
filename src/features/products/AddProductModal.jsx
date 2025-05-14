import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddProduct } from "./useAddProduct";
import { toast } from "react-toastify";
import { productSchema } from "../validationOnSchema";

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
    mutate(data, {
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
    <div className="modal">
      <h2>افزودن محصول جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="نام کالا" />
        <p style={{ color: "red" }}>{errors.name?.message}</p>

        <input {...register("stock")} type="number" placeholder="موجودی" />
        <p style={{ color: "red" }}>{errors.stock?.message}</p>

        <input {...register("price")} type="number" placeholder="قیمت" />
        <p style={{ color: "red" }}>{errors.price?.message}</p>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "در حال افزودن..." : "افزودن محصول"}
        </button>
      </form>
      <button onClick={onClose}>بستن</button>
    </div>
  );
};

export default AddProductModal;
