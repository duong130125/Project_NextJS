"use client";

import { useState, useEffect } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { getUserApi, updateUserApi } from "@/services/user/userProfile";

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [updatedUser, setUpdatedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Tải dữ liệu người dùng khi component được render lần đầu
    const fetchUser = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(String(localStorage.getItem("user")));
        const data = await getUserApi(storedUser.id);
        setUser(data);
        setUpdatedUser(data); // Khởi tạo trạng thái chỉnh sửa
      } catch (error: any) {
        setError(error.message || "Đã xảy ra lỗi khi tải người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    return `${name.substring(0, 3)}${"*".repeat(name.length - 3)}@${domain}`;
  };

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    // Cập nhật trạng thái ngay lập tức
    setUser(updatedUser);

    try {
      await updateUserApi(user.id, updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Cập nhật localStorage
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message || "Đã xảy ra lỗi khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!user) {
    return <p>Không tìm thấy dữ liệu người dùng.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5e7d3]">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src={user.avatar}
                alt="Ảnh đại diện"
                className="w-32 h-32 rounded-full object-cover mx-auto border-2 border-gray-200"
              />
            </div>
            <div className="md:w-2/3 md:pl-8 text-center md:text-left">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">
                  Tên người dùng:
                </label>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.username}
                </h2>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email:
                </label>
                <p className="text-gray-600">{maskEmail(user.email)}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Giới thiệu
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleEditClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6">Chỉnh sửa hồ sơ</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Tên người dùng:
              </label>
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Ảnh đại diện:
              </label>
              <input
                type="text"
                name="avatar"
                value={updatedUser.avatar}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
