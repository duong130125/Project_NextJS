import baseUrl from "@/api";

// Fetch all categories
export const getAllCategorys = async () => {
  try {
    const response = await baseUrl.get("categorys");
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};

// Create a new category
export const createCategory = async (category: any) => {
  try {
    const response = await baseUrl.post("categorys", category);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating category: ${error}`);
  }
};

// Delete a category
export const deleteCategory = async (id: number) => {
  try {
    const response = await baseUrl.delete(`categorys/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error deleting category: ${error}`);
  }
};

// Update a category
export const updateCategory = async (id: number, updatedCategory: any) => {
  try {
    const response = await baseUrl.put(`categorys/${id}`, updatedCategory);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating category: ${error}`);
  }
};
