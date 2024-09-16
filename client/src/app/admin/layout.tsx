"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaBell,
  FaBook,
  FaBorderAll,
  FaCog,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user); // Parse JSON để lấy dữ liệu người dùng
      if (userData.role === 0) {
        // Nếu role bằng 0, chuyển hướng về trang chủ
        router.push("/");
      }
    } else {
      // Nếu không có thông tin người dùng, chuyển hướng tới trang đăng nhập
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2024-09-10_220844-removebg-preview.png?alt=media&token=72f5b53c-a2f1-4c02-ac90-36a892e728da"
              alt="logo admin"
              className="w-28 h-14 mr-4"
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              Bảng điều khiển Admin
            </span>
          </h1>
          <div className="flex items-center space-x-4">
            <FaBell className="text-white text-xl" />
            <span className="text-white">Chào mừng, Admin</span>
            <img
              src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
              alt="Avatar người dùng"
              className="rounded-full w-10 h-10"
            />
            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-100 flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex">
        <nav className="w-64 bg-gradient-to-b from-white to-gray-200 shadow-lg min-h-screen p-4">
          <ul className="space-y-4">
            <li className="flex items-center p-2 hover:bg-blue-200 rounded-md text-blue-500">
              <Link href="/admin/users" className="flex">
                <FaUsers className="mr-2" /> Người dùng
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-green-200 rounded-md text-green-500">
              <Link href="/admin/category" className="flex">
                <FaBook className="mr-2" /> Danh mục
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-green-200 rounded-md text-amber-600">
              <Link href="/admin/order" className="flex">
                <FaBorderAll className="mr-2" /> Đơn hàng
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-200 rounded-md text-gray-500">
              <FaCog className="mr-2" /> Cài đặt
            </li>
          </ul>
        </nav>

        <main className="flex-grow p-6">{children}</main>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white w-96 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Xác nhận đăng xuất
            </h2>
            <p className="mb-8 text-gray-600">
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
