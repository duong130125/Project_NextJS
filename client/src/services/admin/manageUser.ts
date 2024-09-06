import baseUrl from "@/api";

export const getAllUsers = async () => {
  try {
    const response = await baseUrl.get("users");
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};

export const createUser = async (newUser: any) => {
  try {
    const response = await baseUrl.post("users", newUser);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await baseUrl.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
};