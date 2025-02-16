import apiClient from "./apiClient";

export const signup = async (userData) => {
  const response = await apiClient.post("/auth/signup", userData);
  localStorage.setItem("token", response.data.token); // Store JWT
  return response.data;
};

export const logout = () => {
    localStorage.removeItem("token"); // Remove token on logout
};
