"use client";

import { useEffect, useState } from "react";
import NewUserForm from "@/components/admin/FormNewUser";
import { notification, Select } from "antd";
import {
  deleteUser,
  getAllUsers,
  createUser,
  updateUserRole,
  toggleUserLock,
  searchUsers,
  sortUsers,
} from "@/services/admin/manageUser";
import { Users } from "@/interface/DataInter";
import Swal from "sweetalert2";

const { Option } = Select;

// Thành phần phân trang
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

export default function QuanLyNguoiDung() {
  const [users, setUsers] = useState<Users[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentUserRole, setCurrentUserRole] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      notification.error({
        message: "Không thể lấy danh sách người dùng",
        description: "Đã xảy ra lỗi khi lấy danh sách người dùng.",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = async (newUser: Users) => {
    try {
      const createdUser = await createUser(newUser);
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      notification.success({
        message: "Thêm mới thành công",
        description: "Người dùng đã được thêm thành công.",
      });
      setModalVisible(false);
    } catch (error: any) {
      notification.error({
        message: "Thêm người dùng thất bại",
        description: error.message || "Đã xảy ra lỗi.",
      });
    }
  };

  const handleDeleteUser = (id: number) => {
    Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa người dùng này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            notification.success({
              message: "Xóa người dùng",
              description: "Người dùng đã được xóa thành công.",
            });
          } catch (error: any) {
            notification.error({
              message: "Xóa người dùng thất bại",
              description: error.message || "Đã xảy ra lỗi.",
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error showing confirmation modal:", error);
      });
  };
  const handleRoleChange = async (id: number, role: number) => {
    try {
      await updateUserRole(id, role);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, role } : user))
      );
      notification.success({
        message: "Cập nhật vai trò thành công",
      });
    } catch (error: any) {
      notification.error({
        message: "Cập nhật vai trò thất bại",
        description: error.message || "Đã xảy ra lỗi.",
      });
    }
  };

  const handleToggleLock = async (id: number) => {
    try {
      await toggleUserLock(id);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: !user.status } : user
        )
      );
      notification.success({
        message: "Cập nhật trạng thái thành công",
      });
    } catch (error: any) {
      notification.error({
        message: "Cập nhật trạng thái thất bại",
        description: error.message || "Đã xảy ra lỗi.",
      });
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    try {
      const result = await searchUsers(query);
      setUsers(result);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm người dùng:", error);
      notification.error({
        message: "Tìm kiếm người dùng thất bại",
        description: "Đã xảy ra lỗi khi tìm kiếm người dùng.",
      });
    }
  };

  const handleSort = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value;
    setSortOrder(order);
    try {
      const result = await sortUsers(order, "username");
      setUsers(result);
    } catch (error) {
      console.error("Lỗi khi sắp xếp người dùng:", error);
      notification.error({
        message: "Sắp xếp người dùng thất bại",
        description: "Đã xảy ra lỗi khi sắp xếp người dùng.",
      });
    }
  };

  const filteredAndSortedUsers = users.filter((user) => {
    if (currentUserRole === 1) return true;
    return user.role === 0;
  });

  // Logic phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredAndSortedUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // Thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quản Lý Người Dùng</h1>
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
          {currentUsers.map((user, index) => (
            <tr
              className="hover:bg-gray-100 border-b border-gray-200 py-10"
              key={user.id}
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {indexOfFirstUser + index + 1}
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
                <Select
                  value={user.role}
                  onChange={(value) => handleRoleChange(user.id, value)}
                  style={{ width: 140 }}
                >
                  <Option value={0}>Người dùng</Option>
                  <Option value={1}>Quản trị viên</Option>
                </Select>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleToggleLock(user.id)}
                  className={`${
                    user.status
                      ? "text-green-500 hover:text-green-600"
                      : "text-red-500 hover:text-red-600"
                  }`}
                >
                  {user.status ? "Hoạt Động" : "Đã khóa"}
                </button>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredAndSortedUsers.length / usersPerPage)}
        onPageChange={paginate}
      />

      {isModalVisible && (
        <NewUserForm
          setModalVisible={setModalVisible}
          onUserAdded={handleUserAdded}
        />
      )}
    </>
  );
}
