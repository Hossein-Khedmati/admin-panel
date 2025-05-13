import axios from "axios";

export const registerUser = async (formData) => {
  const response = await axios.post("http://localhost:3000/auth/register", formData);
  return response.data;
};
export const loginUser = async (formData) => {
  const response = await axios.post("http://localhost:3000/auth/login", formData);
  return response.data;
};