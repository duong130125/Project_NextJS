import baseUrl from "@/api";

// Hàm lấy thông tin người dùng theo ID
export const getUserApi = async (userId: number) => {
  try {
    const response = await baseUrl.get(`users/${userId}`);
    return response.data; // Dữ liệu người dùng trả về từ server
  } catch (error: any) {
    console.error(`Error fetching user: ${error}`);
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

// Hàm cập nhật thông tin người dùng
export const updateUserApi = async (userId: number, updatedUser: any) => {
  try {
    const response = await baseUrl.patch(`users/${userId}`, updatedUser);
    return response.data; // Dữ liệu trả về từ server (thường là user sau khi cập nhật)
  } catch (error: any) {
    console.error(`Error updating user: ${error}`);
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};
