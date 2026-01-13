import axiosInstance from "../config/axios_conf";

// User APIs
export const getAllUsers = () => axiosInstance.get("/accounts/user/");
export const getCurrentAdmin = () => axiosInstance.get("/accounts/user/admin/");
export const editCurrentAdmin = (data) => axiosInstance.patch("/accounts/user/admin/", data);
export const getUserDetail = (id) => axiosInstance.get(`/accounts/user/${id}/`);
export const getCurrentUser = () => axiosInstance.get("/accounts/user/data");
export const updateUser = (id, data) => axiosInstance.put(`/accounts/user/${id}/`, data);
export const deleteUser = (id) => axiosInstance.delete(`/accounts/user/${id}/`);
export const updateCurrentUser = (data) => axiosInstance.patch("/accounts/user/data", data);

// Chat APIs
export const sendQuestion = (question, model = 'gemini') => axiosInstance.post('/chat/query/', { question, model });
export const fetchQueryHistory = (modelFilter = null) => {
  const url = modelFilter ? `/chat/history/?model=${modelFilter}` : '/history/';
  return axiosInstance.get(url);
};
