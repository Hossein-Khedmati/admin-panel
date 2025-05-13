import axios from "../axiosInstance";


export const getProducts = async ({ page = 1, limit = 10 }) => {
  const response = await axios.get(`http://localhost:3000/products?page=${page}&limit=${limit}`);
  return response.data;
};
export const addProduct = async (newProduct) => {
  const response = await axios.post("http://localhost:3000/products", newProduct);
  return response.data;
};
export const editProduct = async ({ id, data }) => {
  const response = await axios.put(`http://localhost:3000/products/${id}`, data);
  return response.data;
};
export const deleteProduct = async (id) => {
  const response = await axios.delete(`http://localhost:3000/products/${id}`);
  return response.data;
};

