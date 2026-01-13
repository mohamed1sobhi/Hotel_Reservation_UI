import axiosInstance from "../config/axios_conf";

// Booking APIs
export const createBooking = (data) => axiosInstance.post("/bookings/create/", data);
export const getAllBookings = () => axiosInstance.get("/bookings/");
export const getBookingDetail = (id) => axiosInstance.get(`/bookings/${id}/`);
export const getCurrentUserBookings = () => axiosInstance.get("/bookings/userbookings/");
export const getHotelBookings = () => axiosInstance.get("/bookings/hotelbookings/");
export const updateBooking = (id, data) => axiosInstance.put(`/bookings/${id}/`, data);
export const deleteBooking = (id) => axiosInstance.delete(`/bookings/${id}/`);
export const getUserBookings = () => axiosInstance.get('/bookings/userbookings/');
export const getOwnerHotelBookings = () => axiosInstance.get(`/bookings/owner/hotels/`);

// Payment APIs
export const paymentData = (id) => axiosInstance.get(`/bookings/booking/payment/${id}/`);
export const getAllPayments = () => axiosInstance.get("/payments/create");
export const getPayment = (id) => axiosInstance.get(`/payments/${id}/`);
export const updatePayment = (id, data) => axiosInstance.put(`/payments/${id}/`, data);
export const deletePayment = (id) => axiosInstance.delete(`/payments/${id}/`);
export const processPayment = (id) => axiosInstance.post(`/payments/${id}/`, { process_payment: true });

// Payment Settings APIs
export const getAllPaymentSettings = () => axiosInstance.get("/payment-settings/");
export const updatePaymentSetting = (data) => axiosInstance.put("/payment-settings/", data);
export const deletePaymentSetting = (id) => axiosInstance.delete(`/payment-settings/${id}/`);
