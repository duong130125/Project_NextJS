import baseUrl from "@/api";
import { Products } from "@/interface/DataInter";

export const getAllProductsByCategory = async (
  categoryId: number,
  searchTerm: string = "",
  minPrice: number = 0,
  maxPrice: number = Infinity
): Promise<Products[]> => {
  try {
    const response = await baseUrl.get(`categories/${categoryId}/products`, {
      params: {
        name_like: searchTerm,
        price_gte: minPrice,
        price_lte: maxPrice
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products by category: ${error}`);
    throw new Error(`Failed to fetch products by category`);
  }
};

export const createProduct = async (newProduct: Omit<Products, 'id'>): Promise<Products> => {
  try {
    const response = await baseUrl.post("products", newProduct);
    return response.data;
  } catch (error) {
    console.error(`Error creating product: ${error}`);
    throw new Error(`Failed to create product`);
  }
};

export const updateProduct = async (id: number, updatedProduct: Omit<Products, 'id'>): Promise<Products> => {
  try {
    const response = await baseUrl.put(`products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error updating product: ${error}`);
    throw new Error(`Failed to update product`);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await baseUrl.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete product`);
  }
};

