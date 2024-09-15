"use client";

import React, { useState, useEffect } from "react";
import { HeartFilled, PhoneFilled } from "@ant-design/icons";
import { FiRefreshCcw } from "react-icons/fi";
import { Products } from "@/interface/DataInter";
import { getAllProductDetail } from "@/services/user/userProduct";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import { useParams } from "next/navigation";

const ProductDetail = (props: any) => {
  const { params } = props;

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getAllProductDetail(params.id);
        setProduct(products);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product data");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <>
      <Header />

      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <img
                src={product.image || "/api/placeholder/400/400"}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">★★★★☆</span>
                <span className="text-gray-600 ml-2">Đã bán: {0}</span>
              </div>
              <div className="mb-4">
                <span className="text-red-500 text-2xl font-bold">
                  {product.price?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-gray-700">
                  Số lượng còn lại: {product.stock}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-16 h-8 text-center border-t border-b border-gray-200"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex space-x-4 mb-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  THÊM VÀO GIỎ HÀNG
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  MUA NGAY
                </button>
                <button
                  className={`border-0 p-2 rounded ${
                    liked ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={() => setLiked(!liked)}
                >
                  <HeartFilled />
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <PhoneFilled className="mr-2" />
                Đổi trả cực dễ chỉ cần số điện thoại
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FiRefreshCcw className="mr-2" />7 ngày đổi trả vì bất kỳ lý do
                gì
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
