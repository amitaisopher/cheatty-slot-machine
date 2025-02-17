import apiClient from "./apiClient";


export const createSession = async (session) => {
    const response = await apiClient.post("/sessions", session);
    return response.data;
    }

export const getSession = async (id) => {
  const response = await apiClient.get(`/sessions/${id}`);
  if (response.status === 401) {
    // reload the page
    window.location.reload();
  }
  return response.data;
};

export const updateSession = async (id, session) => {
  const response = await apiClient.put(`/sessions/${id}`, session);
  return response.data;
};

export const cashoutSession = async (id) => {
  const response = await apiClient.post(`/sessions/cashout/${id}`);
  return response.data;
};

export const playSession = async (id) => {
  const response = await apiClient.get(`/sessions/play/${id}`);
  return response.data;
}
