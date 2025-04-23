import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./slices/hotels";
import roomsReducer from "./slices/rooms";
import reviewsReducer from './slices/reviews';
import imagesReducer from "./slices/images";
import roomImagesReducer from "./slices/room_images";
const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    rooms: roomsReducer,
    reviews: reviewsReducer,
    images: imagesReducer,
    roomImages: roomImagesReducer,
  },
});

export default store;
