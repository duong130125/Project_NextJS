"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/app/layout/Footer";
import Header from "@/app/layout/Header";
import { getAllCarts, deleteCartItem } from "@/services/user/userCart";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [userId, setUserId] = useState<any>();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId)?.id || null);
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchCartItems = async () => {
        try {
          const products = await getAllCarts();
          const filteredProducts = products.filter(
            (item: any) => item.userId === userId
          );
          setCartItems(filteredProducts);
        } catch (err) {
          setError("Failed to load cart items");
        } finally {
          setLoading(false);
        }
      };
      fetchCartItems();
    }
  }, [userId]);

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      setError("Failed to delete item");
    }
  };

  const handleCheckout = () => {
    router.push("/order");
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Giỏ hàng</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ảnh đại diện
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thành tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.nameProduct}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-right font-bold text-xl"
                >
                  Tổng tiền: {""}
                  {totalAmount.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className={`font-bold py-2 px-4 rounded ${
                      cartItems.length === 0
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    } text-white`}
                  >
                    Mua hàng
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
