import axiosInstance from "../config/axios_conf";

export const registerUser = (data) => axiosInstance.post("/accounts/user/register/", data);
export const registerUserForAdmin = (data) => axiosInstance.post("/accounts/user/", data);
export const refreshToken = (data) => axiosInstance.post("/accounts/login/refresh/", data);
export const logoutUser = (data) => axiosInstance.post("/accounts/logout/", data);
