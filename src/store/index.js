import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./slices/hotels";
import roomsReducer from "./slices/rooms";
import reviewsReducer from './slices/reviews';

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    rooms: roomsReducer,
    reviews: reviewsReducer,
  },
});

export default store;
