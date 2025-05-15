import React from "react";
import styles from "./LoginPage.module.css";
import logo from "../assets/Union.png";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../features/validationOnSchema";
import { useLogin } from "../features/auth/useLogin";
import { jwtDecode } from "jwt-decode";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { mutate, isLoading } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: (res) => {
        console.log(res);

        toast.success("ورود موفق ✅");
        localStorage.setItem("token", res.token);
        // decode token to get username
        const decoded = jwtDecode(res.token);
        const username = decoded.username;
        localStorage.setItem("username", username);
        navigate("/dashboard");
      },
      onError: (err) => {
        const message = err.response?.data?.message || "خطا در ورود";
        toast.error(message);
      },
    });
  };

  return (
    <>
      <p className={styles.title}>بوت کمپ بوتواستارت</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.LoginForm}>
        <div className={styles.formTitle}>
          <img src={logo} alt="logo.png" />
          <p>فرم ورود</p>
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
        <button className={styles.submit} disabled={isLoading}>
          {isLoading ? "در حال ورود..." : "ورود"}
        </button>
        <Link className={styles.toRegister} to="/">ایجاد حساب کاربری!</Link>
      </form>
    </>
  );
}

export default LoginPage;
