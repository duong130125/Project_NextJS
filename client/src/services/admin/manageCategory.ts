import baseUrl from "@/api";


export const getAllCategorys = async () => {
  try {
    const response = await baseUrl.get("categorys");
    return response;
  } catch (error) {
    throw new Error(`Error fetching categorys: ${error}`);
  }
};

export const createCategory = async (category: any) => {
  try {
    const response = await baseUrl.post("categorys", category);
    return response;
  } catch (error) {
    throw new Error(`Error fetching categorys: ${error}`);
  }
};

export const getCategoryById = async (id: any) => {
  try {
    const response = await baseUrl.get(`categorys/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching categorys: ${error}`);
  }
};

export const updateCategory = async (category: any) => {
  try {
    const response = await baseUrl.patch(`categorys/${category.id}`, category);
    return response;
  } catch (error) {
    throw new Error(`Error fetching categorys: ${error}`);
  }
};

export const deleteCategory = async (id: any) => {
  try {
    const response = await baseUrl.delete(`categorys/${id}`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching categorys: ${error}`);
  }
};