import baseUrl from "@/api";
import { Carts } from "@/interface/DataInter";

export const getAllCarts = async (): Promise<Carts[]> => {
  try {
    const response = await baseUrl.get("carts");
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error(`Failed to fetch users`);
  }
};

// Thêm sản phẩm vào giỏ hàng với thông tin đầy đủ
export const addToCart = async (cartItem: {
  userId: number;
  productId: number;
  nameProduct: string;
  price: number;
  quantity: number;
  image: string;
}): Promise<void> => {
  try {
    const response = await baseUrl.post("carts", cartItem);
    return response.data;
  } catch (error) {
    console.error(`Error adding product to cart: ${error}`);
    throw new Error(`Failed to add product to cart`);
  }
};

export const getByIdProductandUser = async (
  idProduct: any,
  userId: any
): Promise<Carts[]> => {
  try {
    const response = await baseUrl.get(
      `carts/?productId=${idProduct}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error(`Failed to fetch users`);
  }
};

export const updateCart = async (cart: any): Promise<Carts[]> => {
  try {
    const response = await baseUrl.patch(`carts/${cart.id}`, cart);
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error(`Failed to fetch users`);
  }
};
