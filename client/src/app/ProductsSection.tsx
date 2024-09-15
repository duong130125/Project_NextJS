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

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  loading,
  error,
  onProductClick,
}) => {
  const [id, setId] = useState<any>();

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      setId(JSON.parse(userId));
    }
  }, []);

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
        userId: id.id, // ID người dùng đang đăng nhập
        productId: product.id, // ID của sản phẩm
        nameProduct: product.name, // Tên sản phẩm
        price: product.price, // Giá sản phẩm
        quantity: 1, // Mặc định là 1, có thể cho người dùng chọn số lượng
        image: product.image, // Hình ảnh sản phẩm
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

  return (
    <section className="w-full md:w-3/4">
      <h2 className="text-2xl font-semibold mb-4">SẢN PHẨM CỦA CHÚNG TÔI</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
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
    </section>
  );
};

export default ProductsSection;
