"use client";
import { useEffect, useState } from "react";
import NewUserForm from "@/components/admin/FormNewUser";
import { notification } from "antd";
import {
  deleteUser,
  getAllUsers,
  createUser,
} from "@/services/admin/manageUser";
import { Users } from "@/interface/DataInter";

export default function ManageUser() {
  const [users, setUsers] = useState<Users[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      notification.error({
        message: "Failed to fetch users",
        description: "An error occurred while fetching users.",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = async (newUser: any) => {
    try {
      await createUser(newUser);
      notification.success({
        message: "User added successfully",
      });
      fetchUsers();
      setModalVisible(false);
    } catch (error: any) {
      notification.error({
        message: "Failed to add user",
        description: error.message || "An error occurred.",
      });
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      notification.success({
        message: "User deleted successfully",
      });
      fetchUsers();
    } catch (error: any) {
      notification.error({
        message: "Failed to delete user",
        description: error.message || "An error occurred.",
      });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const filteredAndSortedUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quản Lý người dùng</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setModalVisible(true)}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thêm mới
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">STT</th>
            <th className="py-3 px-6 text-center">Họ và tên</th>
            <th className="py-3 px-6 text-center">Hình đại diện</th>
            <th className="py-3 px-6 text-center">Vai trò</th>
            <th className="py-3 px-6 text-center">Trạng thái</th>
            <th className="py-3 px-6 text-center">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedUsers.map((user, index) => (
            <tr
              className="hover:bg-gray-100 border-b border-gray-200 py-10"
              key={user.user_id}
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {index + 1}
              </td>
              <td className="py-3 px-6 text-center">{user.username}</td>
              <td className="py-3 px-6 text-center">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="rounded-full w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="py-3 px-6 text-center">
                {user.role === 1 ? "Quản trị viên" : "Người dùng"}
              </td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`${
                    user.status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.status ? "Hoạt động" : "Đã khóa"}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDeleteUser(user.user_id)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalVisible && (
        <NewUserForm
          setModalVisible={setModalVisible}
          onUserAdded={handleUserAdded}
        />
      )}
    </>
  );
}
