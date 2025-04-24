import axiosInstance from "../config/axios_conf";

// Hotel APIs
export const getAllHotels = () => axiosInstance.get("/hotels/");
export const createHotel = (data) => axiosInstance.post("/hotels/create/", data);
export const updateHotel = (id, data) => axiosInstance.put(`/hotels/update/${id}/`, data);
export const getHotelDetail = (id) => axiosInstance.get(`/hotels/detail/${id}/`);
export const deleteHotel = (id) => axiosInstance.delete(`/hotels/delete/${id}/`);
export const filterHotelsByStars = (stars) => axiosInstance.get(`/hotels/hotelfilter/${stars}/`);

// Room APIs
export const getAllRooms = () => axiosInstance.get("/hotels/roomlist/");
export const createRoom = (data) => axiosInstance.post("/hotels/roomcreate/", data);
export const updateRoom = (id, data) => axiosInstance.put(`/hotels/roomupdate/${id}/`, data);
export const deleteRoom = (id) => axiosInstance.delete(`/hotels/roomdelete/${id}/`);
export const getRoomDetail = (id) => axiosInstance.get(`/hotels/roomdetail/${id}/`);
export const filterRoomsByType = (roomType) => axiosInstance.get(`/hotels/roomfilter/${roomType}/`);

// Image APIs
export const createHotelImage = (formData) => axiosInstance.post("/hotels/createimage/", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const updateHotelImage = (id, formData) => axiosInstance.put(`/hotels/updateimage/${id}/`, formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const deleteHotelImage = (id) => axiosInstance.delete(`/hotels/deleteimage/${id}/`);
export const listHotelImages = () => axiosInstance.get("/hotels/listimages/");

// Notification APIs
export const getNotifications = () => axiosInstance.get("/hotels/notifications/");
export const markNotificationAsRead = (id) => axiosInstance.put(`/hotels/notifications/mark-read/${id}/`);
export const deleteNotification = (id) => axiosInstance.delete(`/hotels/notifications/delete/${id}/`);

// Email APIs
export const sendConfirmEmail = (data) => axiosInstance.post("/hotels/send-email/", data);

// Reviews APIs
export const getAllReviews = () => axiosInstance.get("/reviews/");
export const createReview = (data) => axiosInstance.post("/reviews/", data);
export const getReviewDetail = (id) => axiosInstance.get(`/reviews/${id}/`);
export const getHotelReviews = (hotelId) => axiosInstance.get(`/hotels/${hotelId}/reviews/`);


// Bookings APIs
export const createBooking = (data) => axiosInstance.post("/bookings/create/", data);
export const getBookingDetail = (id) => axiosInstance.get(`/bookings/details/${id}/`);


// Get all payments
export const getAllPayments = () => axiosInstance.get("/payments/");

// Create a new payment
export const createPayment = (data) => axiosInstance.post("/payments/", data);

// Get single payment by id
export const getPayment = (id) => axiosInstance.get(`/payments/${id}/`);

// Update payment by id
export const updatePayment = (id, data) => axiosInstance.put(`/payments/${id}/`, data);

// Delete payment by id
export const deletePayment = (id) => axiosInstance.delete(`/payments/${id}/`);

// Process a specific payment
export const processPayment = (id) => axiosInstance.post(`/payments/${id}/process_payment/`);

// Refund a specific payment
export const refundPayment = (id) => axiosInstance.post(`/payments/${id}/refund_payment/`);

// Create a payment for a reservation (reservation_id + payment_method + is_deposit)
export const createPaymentForReservation = (data) => axiosInstance.post(`/payments/create_payment_for_reservation/`, data);

// ------ Payment Settings APIs ------

// Get all payment settings
export const getAllPaymentSettings = () => axiosInstance.get("/payment-settings/");

// Create a new payment setting
export const createPaymentSetting = (data) => axiosInstance.post("/payment-settings/", data);

// Get single payment setting by id
export const getPaymentSetting = (id) => axiosInstance.get(`/payment-settings/${id}/`);

// Update payment setting by id
export const updatePaymentSetting = (id, data) => axiosInstance.put(`/payment-settings/${id}/`, data);

// Delete payment setting by id
export const deletePaymentSetting = (id) => axiosInstance.delete(`/payment-settings/${id}/`);

// USER functions
export const getAllUsers = () => axiosInstance.get("/accounts/user/");
export const getUserDetail = (id) => axiosInstance.get(`/accounts/user/${id}/`);
export const updateUser = (id, data) => axiosInstance.put(`/accounts/user/${id}/`, data);
export const deleteUser = (id) => axiosInstance.delete(`/accounts/user/${id}/`);

// Register user (hotel owner or customer)
export const registerUser = (data) => axiosInstance.post("/accounts/user/register/", data);
// Update current logged-in user's data
export const updateCurrentUser = (data) => axiosInstance.put("/accounts/user/data", data);
// AUTH functions (Login, Refresh, Logout)
export const refreshToken = (data) => axiosInstance.post("/accounts/login/refresh/", data); // data = { refresh: "token" }
export const logoutUser = (data) => axiosInstance.post("/accounts/logout/", data); // data = { refresh: "token" }

