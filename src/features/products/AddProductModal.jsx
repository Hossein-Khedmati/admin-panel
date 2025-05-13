import { useForm } from "react-hook-form";
import { useAddProduct } from "./useAddProduct";
import { toast } from "react-toastify";

const AddProductModal = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();
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
        <input {...register("stock")} type="number" placeholder="موجودی" />
        <input {...register("price")} type="number" placeholder="قیمت" />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "در حال افزودن..." : "افزودن محصول"}
        </button>
      </form>
      <button onClick={onClose}>بستن</button>
    </div>
  );
};

export default AddProductModal;
