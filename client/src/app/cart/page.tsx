"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/app/layout/Footer";
import Header from "@/app/layout/Header";
import { getAllCarts } from "@/services/user/userCart";

const ShoppingCart = () => {
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});
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

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleDeleteAll = () => {
    // Logic to delete all selected items
    console.log("Delete all selected items");
  };

  const handleCheckout = () => {
    router.push("/order"); // Navigate to the order page
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity * (selectedItems[item.id] ? 1 : 0),
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
                  Chọn
                </th>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
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
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="px-6 py-4 text-left">
                  <button
                    onClick={handleDeleteAll}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Xóa tất cả
                  </button>
                </td>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-right font-bold text-xl"
                >
                  Tổng tiền:
                  {totalAmount.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={handleCheckout}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
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
