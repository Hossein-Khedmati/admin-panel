import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./productService";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import styles from "./ProductList.module.css";

import search from "../../assets/search-normal.png";
import setting from "../../assets/setting-3.png"
import trash from "../../assets/trash.png"
import edit from "../../assets/edit.png"

const ProductList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts({ page, limit }),
    keepPreviousData: false,
  });

  const username = localStorage.getItem("username");

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت محصولات</p>;

  const totalPages = Math.ceil(data.totalProducts / limit);

  const filteredProducts = data.data.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(searchLower);
    const idMatch = product.id.toString().includes(searchLower);

    return nameMatch || idMatch;
  });

  return (
    <>
      <div className={styles.navbar} style={{}}>
        <img src={search} alt="search.png" />
        <input
          type="text"
          placeholder="جستجو  کالا"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>👤 {username}</div>
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              window.location.href = "/login";
            }}
            style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            خروج
          </button>
        </div>
      </div>

      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}
      <div className={styles.subject}>
        <div>
        <img src={setting} alt="setting.png" />
        <h1>مدیریت کالاها</h1>
        </div>
        <button onClick={() => setIsModalOpen(true)}>افزودن محصول</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="5">محصولی برای نمایش وجود ندارد</td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id} className={styles.productsRow}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price.toLocaleString('fa-IR')} تومان</td>
                <td>{product.id}</td>
                <td className={styles.buttonOptions}>
                  <button onClick={() => setSelectedProduct(product)}>
                    <img src={edit} alt="" />
                  </button>
                  <button onClick={() => setDeleteProduct(product)}>
                    <img src={trash} alt="" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isFetching && <p>در حال دریافت اطلاعات جدید...</p>}

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={page === idx + 1 ? styles.buttonActive : ""}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {deleteProduct && (
        <DeleteProductModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
        />
      )}
    </>
  );
};

export default ProductList;
