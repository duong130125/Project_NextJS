"use client";

import { Orders } from "@/interface/DataInter";
import { getAllOrders } from "@/services/admin/manageOrder";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching orders: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Đơn Hàng</h1>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tên Người Dùng</th>
            <th className="py-2 px-4 border-b">Địa Chỉ Người Dùng</th>
            <th className="py-2 px-4 border-b">Số Điện Thoại</th>
            <th className="py-2 px-4 border-b">Tổng Giá</th>
            <th className="py-2 px-4 border-b">Trạng Thái</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {order.userName}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {order.userAddress}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {order.userPhone}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {order.priceAll.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {order.status ? "Xác nhận" : "Chờ xác nhận"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  // onClick={() => handleEditOrder(order)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Duyệt
                </button>
                <button
                  // onClick={() => handleDeleteOrder(order.serial)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
