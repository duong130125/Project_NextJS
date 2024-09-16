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
