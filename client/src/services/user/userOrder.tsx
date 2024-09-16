import baseUrl from "@/api";

export const createOrder = async (orderData: any) => {
  try {
    const response = await baseUrl.post("orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    throw error;
  }
};

export const deleteCart = async (cartId: number) => {
  try {
    const response = await baseUrl.delete(`carts/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    throw error;
  }
};
