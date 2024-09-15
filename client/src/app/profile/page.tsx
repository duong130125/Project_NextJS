"use client";

import { useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false); // Control edit modal
  const [user, setUser] = useState<any>(
    JSON.parse(String(localStorage.getItem("user")))
  );
  const [updatedUser, setUpdatedUser] = useState(user);

  const maskEmail = (email: any) => {
    const [name, domain] = email.split("@");
    return `${name.substring(0, 3)}${"*".repeat(name.length - 1)}@${domain}`;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: any) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Save updated user to localStorage
    setUser(updatedUser); // Update the user state
    setIsEditing(false); // Close the modal
  };

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
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
