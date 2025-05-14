import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup.string().max(20,"نام کاربری بیش از 20 آیتم غیر قابل قبول است.").required("نام کاربری اجباری است"),
  password: yup.string().min(8, "رمز باید حداقل ۸ کاراکتر باشد").required("رمز عبور اجباری است"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "رمز و تکرار رمز یکسان نیستند")
    .required("تکرار رمز عبور اجباری است"),
});
export const loginSchema = yup.object({
  username: yup.string().required("نام کاربری اجباری است"),
  password: yup.string().required("رمز عبور اجباری است"),
});

export const productSchema = yup.object().shape({
  name: yup.string().required("نام کالا اجباری است"),
  stock: yup
    .number()
    .typeError("موجودی باید عدد باشد")
    .positive("موجودی باید مثبت باشد")
    .integer("موجودی باید عدد صحیح باشد")
    .required("موجودی اجباری است"),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .positive("قیمت باید مثبت باشد")
    .required("قیمت اجباری است"),
});

