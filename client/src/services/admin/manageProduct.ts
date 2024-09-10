import baseUrl from "@/api";
import { Products } from "@/interface/DataInter";

// Fetch products by category ID with optional search and price range filtering
export const getAllProductsByCategory = async (
  categoryId: number,
  searchTerm: string = "",
  minPrice: number = 0,
  maxPrice: number = Infinity
): Promise<Products[]> => {
  try {
    const response = await baseUrl.get(`categories/${categoryId}/products`, {
      params: {
        // Include search term if provided
        name_like: searchTerm,
        // Filter by price range if min or max price is specified
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


// Create a new product
export const createProduct = async (newProduct: Omit<Products, 'id'>): Promise<Products> => {
  try {
    const response = await baseUrl.post("products", newProduct);
    return response.data;
  } catch (error) {
    console.error(`Error creating product: ${error}`);
    throw new Error(`Failed to create product`);
  }
};

// Update a product by ID
export const updateProduct = async (id: number, updatedProduct: Omit<Products, 'id'>): Promise<Products> => {
  try {
    const response = await baseUrl.put(`products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Error updating product: ${error}`);
    throw new Error(`Failed to update product`);
  }
};

// Delete a product by ID
export const deleteProduct = async (id: number) => {
  try {
    const response = await baseUrl.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete product`);
  }
};

