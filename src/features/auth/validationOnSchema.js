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
