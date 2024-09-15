import baseUrl from "@/api";

// Fetch all categories
export const getAllOrders = async () => {
  try {
    const response = await baseUrl.get("orders"); // Update with your API endpoint
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error}`);
  }
};
