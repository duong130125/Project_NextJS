import baseUrl from "@/api";
import { Products } from "@/interface/DataInter";

export const getAllProductDetail = async (id: any): Promise<Products[]> => {
  try {
    const response = await baseUrl.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    throw new Error(`Failed to fetch products`);
  }
};

export const addFavorite = async (productId: any) => {
  try {
    const response = await baseUrl.post("favorites", productId);
    return response.data;
  } catch (error) {
    console.error("Error adding product to favorites:", error);
    throw error;
  }
};

export const getFavorite = async () => {
  try {
    const response = await baseUrl.get("favorites");
    return response.data;
  } catch (error) {
    console.error("Error adding product to favorites:", error);
    throw error;
  }
};

export const deleteFavoriteProduct = async (id: number) => {
  try {
    const response = await baseUrl.delete(`/favorites/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting favorite product: ${error}`);
    throw new Error(`Failed to delete favorite product`);
  }
};
