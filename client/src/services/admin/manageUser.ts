import baseUrl from "@/api";
import { Users } from "@/interface/DataInter";

// Fetch all users
export const getAllUsers = async (): Promise<Users[]> => {
  try {
    const response = await baseUrl.get("users");
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    throw new Error(`Failed to fetch users`);
  }
};

// Create a new user
export const createUser = async (newUser: Users): Promise<Users> => {
  try {
    const response = await baseUrl.post("users", newUser);
    return response.data;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    throw new Error(`Failed to create user`);
  }
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
  try {
    const response = await baseUrl.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
    throw new Error(`Failed to delete user`);
  }
};

// Update user role
export const updateUserRole = async (id: number, role: number): Promise<void> => {
  try {
    const response = await baseUrl.patch(`users/${id}`, { role });
    return response.data;
  } catch (error) {
    console.error(`Error updating user role: ${error}`);
    throw new Error(`Failed to update user role`);
  }
};

// Toggle user lock/unlock status
export const toggleUserLock = async (id: number): Promise<void> => {
  try {
    const userResponse = await baseUrl.get(`users/${id}`);
    const currentStatus = userResponse.data.status;
    const response = await baseUrl.patch(`users/${id}`, { status: !currentStatus });
    return response.data;
  } catch (error) {
    console.error(`Error toggling user lock status: ${error}`);
    throw new Error(`Failed to toggle user lock status`);
  }
};

// Search users
export const searchUsers = async (query: string): Promise<Users[]> => {
  try {
    const response = await baseUrl.get(`users`, {
      params: {
        username_like: query // Adjust parameter based on your API
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching users: ${error}`);
    throw new Error(`Failed to search users`);
  }
};

// Sort users
export const sortUsers = async (order: string, field: string): Promise<Users[]> => {
  try {
    const response = await baseUrl.get(`users`, {
      params: {
        _sort: field,
        _order: order
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error sorting users: ${error}`);
    throw new Error(`Failed to sort users`);
  }
};
