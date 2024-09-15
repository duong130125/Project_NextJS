import baseUrl from "@/api";
import { Products } from "@/interface/DataInter";

export const getAllProducts = async (): Promise<Products[]> => {
  try {
    const response = await baseUrl.get("products");
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error(`Failed to fetch users`);
  }
};

export const getAllCategories = async (): Promise<Products[]> => {
  try {
    const response = await baseUrl.get("categorys");
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error(`Failed to fetch users`);
  }
};

export const getProductsByCategory = async (
  categoryId: number
): Promise<Products[]> => {
  try {
    const response = await baseUrl.get(`products?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};
