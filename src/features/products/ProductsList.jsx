import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./productService";
import AddProductModal from "./AddProductModal";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دریافت دیتا از React Query بر اساس page
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts({ page, limit }),
    keepPreviousData: false,
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت محصولات</p>;

  const totalPages = Math.ceil(data.totalProducts / limit);

  return (
    <>
    <button onClick={() => setIsModalOpen(true)}>➕ افزودن محصول</button>

      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}
      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.data.length === 0 ? (
            <tr>
              <td colSpan="5">محصولی برای نمایش وجود ندارد</td>
            </tr>
          ) : (
            data.data.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>{product.price} تومان</td>
                <td>{product.id}</td>
                <td>
                  <button>📝</button>
                  <button>🗑</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isFetching && <p>در حال دریافت اطلاعات جدید...</p>}

      <div style={{ marginTop: "10px" }}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            style={{
              fontWeight: page === idx + 1 ? "bold" : "normal",
              margin: "0 5px",
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductList;
