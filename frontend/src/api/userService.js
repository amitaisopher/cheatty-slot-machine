import apiClient from "./apiClient";


export const getUser = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await apiClient.put("/user/profile", userData);
  return response.data;
};