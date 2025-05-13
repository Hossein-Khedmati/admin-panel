import React from "react";
import styles from "./RegisterPage.module.css";
import logo from "../assets/Union.png";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../features/auth/validationOnSchema";
import { useRegister } from "../features/auth/useRegister";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { mutate, isLoading, isError, error } = useRegister();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("ثبت‌نام با موفقیت انجام شد 🎉");
        navigate("/login");
      },
      onError: (err) => {
        const message =err.response?.data?.message==="User already exists"?"نام کابری قبلا انتخاب شده." :"خطا در ثبت‌نام"
        toast.error(message);
      },
    });
  };

  return (
    <>
      <p className={styles.title}>بوت کمپ بوتواستارت</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.RegisterForm}>
        <div className={styles.formTitle}>
          <img src={logo} alt="logo.png" />
          <p>فرم ثبت نام</p>
        </div>
        <input
          type="text"
          {...register("username")}
          className={`${styles.inputs} ${
            errors.username ? styles.inputError : ""
          }`}
          placeholder="نام کاربری"
        />
        <p className={styles.error}>{errors.username?.message}</p>
        <input
          type="password"
          {...register("password")}
          className={`${styles.inputs} ${
            errors.password ? styles.inputError : ""
          }`}
          placeholder="رمز عبور"
        />
        <p className={styles.error}>{errors.password?.message}</p>
        <input
          type="password"
          {...register("confirmPassword")}
          className={`${styles.inputs} ${
            errors.confirmPassword ? styles.inputError : ""
          }`}
          placeholder="تکرار رمز عبور"
        />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
        <button className={styles.submit} disabled={isLoading}>
          {isLoading ? "در حال ارسال..." : "ثبت نام"}
        </button>
      </form>
    </>
  );
}

export default RegisterPage;
