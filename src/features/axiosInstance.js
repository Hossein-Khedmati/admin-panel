import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // timestamp in seconds

      if (decoded.exp < now) {
        toast.error("نشست شما به پایان رسیده است. لطفاً دوباره وارد شوید.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect فوری
        return Promise.reject(new Error("Token expired"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.error("Error decoding token", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(new Error("Invalid token"));
    }
  }

  return config;
});

export default instance;
