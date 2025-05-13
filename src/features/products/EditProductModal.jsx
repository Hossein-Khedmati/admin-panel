import { useForm } from "react-hook-form";
import { useEditProduct } from "./useEditProduct";
import { toast } from "react-toastify";

const EditProductModal = ({ product, onClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product.name,
      stock: product.stock,
      price: product.price,
    },
  });

  const { mutate, isLoading } = useEditProduct();

  const onSubmit = (data) => {
    mutate(
      { id: product.id, data },
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
    <div className="modal">
      <h2>ویرایش محصول</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="نام کالا" />
        <input {...register("stock")} type="number" placeholder="موجودی" />
        <input {...register("price")} type="number" placeholder="قیمت" />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "در حال ویرایش..." : "ثبت تغییرات"}
        </button>
      </form>
      <button onClick={onClose}>بستن</button>
    </div>
  );
};

export default EditProductModal;
