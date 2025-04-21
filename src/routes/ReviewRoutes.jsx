import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReviewList from '../pages/Review/ReviewList';
import HotelReviews from '../pages/Review/HotelReviews';
import AddReview from '../pages/Review/AddReview';

const ReviewRoutes = () => {
  return (
    <Routes>
      <Route path="/reviews" element={<ReviewList />} />
      <Route path="/hotels/:hotelId/reviews" element={<HotelReviews />} />
      <Route path="/hotels/:hotelId/add-review" element={<AddReview />} />
    </Routes>
  );
};

export default ReviewRoutes;