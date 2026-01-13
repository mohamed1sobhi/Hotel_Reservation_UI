import axiosInstance from "../config/axios_conf";

// Hotel APIs
export const getAllHotels = () => axiosInstance.get("/hotels/");
export const createHotel = (data) => axiosInstance.post("/hotels/create/", data);
export const updateHotel = (id, data) => {
  console.log(`Updating Hotel with ID ${id} and Data:`, data);
  return axiosInstance.put(`/hotels/update/${id}/`, data);
};
export const getHotelDetail = (id) => axiosInstance.get(`/hotels/detail/${id}/`);
export const deleteHotel = (id) => axiosInstance.delete(`/hotels/delete/${id}/`);
export const filterHotelsByStars = (stars) => axiosInstance.get(`/hotels/hotelfilter/${stars}/`);
export const getOwnerHotelDetails = () => axiosInstance.get("/hotels/details/ownerhoteldetails/");

// Room APIs
export const createRoom = (data) => axiosInstance.post("/hotels/roomcreate/", data);
export const hotelRoomstype = (id) => axiosInstance.get(`/hotels/hotelroometype/${id}/`);
export const createRoomType = (data) => axiosInstance.post("/hotels/roomcreatetype/", data);
export const updateRoom = (id, data) => axiosInstance.put(`/hotels/roomupdate/${id}/`, data);
export const deleteRoom = (id) => axiosInstance.delete(`/hotels/roomdelete/${id}/`);
export const getRoomDetail = (id) => axiosInstance.get(`/hotels/roomdetail/${id}/`);
export const filterRoomsByType = (roomType) => axiosInstance.get(`/hotels/roomfilter/${roomType}/`);
export const getRoomsByHotel = (hotelId) => axiosInstance.get(`/hotels/rooms/${hotelId}/`);

// Room Images APIs
export const createRoomImage = (data) => axiosInstance.post("/hotels/roomcreateimage/", data, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const updateRoomImage = (id, formData) => axiosInstance.put(`/hotels/roomupdateimage/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const deleteRoomImage = (id) => axiosInstance.delete(`/hotels/roomdeleteimage/${id}/`);
export const listRoomImages = (id) => axiosInstance.get(`/hotels/roomlistimages/${id}/`);

// Image APIs
export const createHotelImage = (formData) => axiosInstance.post("/hotels/createimage/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const updateHotelImage = (id, formData) => axiosInstance.put(`/hotels/updateimage/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
export const deleteHotelImage = (id) => axiosInstance.delete(`/hotels/deleteimage/${id}/`);
export const listHotelImages = () => axiosInstance.get(`/hotels/listimages/`);

// Notification APIs
export const getNotifications = () => axiosInstance.get("/hotels/notifications/");
export const markNotificationAsRead = (id) => axiosInstance.put(`/hotels/notifications/mark-read/${id}/`);
export const deleteNotification = (id) => axiosInstance.delete(`/hotels/notifications/delete/${id}/`);

// Email APIs
export const sendConfirmEmail = (data) => axiosInstance.post("/hotels/send-email/", data);

// Reviews APIs
export const getAllReviews = () => axiosInstance.get("/reviews/getall/");
export const createReview = (data) => axiosInstance.post("/reviews/create/", data);
export const getReviewDetail = (id) => axiosInstance.get(`/reviews/details/${id}/`);
export const getHotelReviews = (hotelId) => axiosInstance.get(`/reviews/hotels/${hotelId}/reviews/`);
