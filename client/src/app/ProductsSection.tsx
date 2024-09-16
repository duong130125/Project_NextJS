"use client";

import { Products } from "@/interface/DataInter";
import {
  addToCart,
  getByIdProductandUser,
  updateCart,
} from "@/services/user/userCart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

interface ProductsSectionProps {
  products: Products[];
  loading: boolean;
  error: string;
  onProductClick: (productId: number, product: Products) => void;
}

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-blue-500 hover:bg-blue-100"
            } border border-gray-300`}
          >
            ‹
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              } border-t border-b border-gray-300`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-r-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-blue-500 hover:bg-blue-100"
            } border border-gray-300`}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  loading,
  error,
  onProductClick,
}) => {
  const [id, setId] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [filteredProducts, setFilteredProducts] =
    useState<Products[]>(products);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      setId(JSON.parse(userId));
    }
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, minPrice, maxPrice]);

  const handleAddToCart = async (product: Products) => {
    const cartItem = await getByIdProductandUser(product.id, id.id);
    if (cartItem[0]) {
      const exsty = {
        ...cartItem[0],
        quantity: cartItem[0].quantity + 1,
      };
      await updateCart(exsty);
    } else {
      const cartItemNew = {
        userId: id.id,
        productId: product.id,
        nameProduct: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      };

      try {
        await addToCart(cartItemNew);
        console.log("Product added to cart successfully!");
      } catch (error) {
        console.error("Failed to add product to cart", error);
      }
    }
  };

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="w-full md:w-3/4">
      <h2 className="text-2xl font-semibold mb-4">SẢN PHẨM CỦA CHÚNG TÔI</h2>
      <div className="flex items-center justify-end space-x-2 mb-4">
        <input
          type="text"
          className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
          onChange={(e) => {
            const [min, max] = e.target.value.split("-");
            setMinPrice(Number(min));
            setMaxPrice(Number(max) === Infinity ? Infinity : Number(max));
          }}
        >
          <option value="0-Infinity">Tất cả giá</option>
          <option value="0-100000">Dưới 100,000</option>
          <option value="100000-500000">100,000 - 500,000</option>
          <option value="500000-1000000">500,000 - 1,000,000</option>
          <option value="1000000-Infinity">Trên 1,000,000</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#f4eee5] rounded-lg shadow overflow-hidden relative"
          >
            <img
              src={product.image}
              alt={product.name}
              onClick={() => onProductClick(product.id, product)}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-red-600 font-bold mt-2">
                {product.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <button
              className="absolute bottom-2 right-2 text-orange-700 p-2 rounded-full transition duration-300"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCartOutlined className="text-xl" />
            </button>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
        onPageChange={paginate}
      />
    </section>
  );
};

export default ProductsSection;
