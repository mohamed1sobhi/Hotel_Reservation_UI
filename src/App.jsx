import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import All_hotels from "./pages/Hotel/All_hotels";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ReviewList from "./pages/Review/ReviewList";
import ReviewDetail from "./pages/Review/ReviewDetail";
import HotelReviews from "./pages/Review/HotelReviews";
import AddReview from "./pages/Review/AddReview";
import Login from "./components/login";
import RegisterUserForm from "./pages/register";
import CustomerProfile from "./pages/Profiles/Customer";
import AdminPanel from "./pages/Profiles/AdminPanel.jsx";
import HotelOwner from "./pages/Profiles/HotelOwner";
// import BookingForm from './pages/booking/create';
// import PaymentsList from './pages/payment/paymentList';
// import PaymentSettings from './pages/payment/paymentSettings';
import AddBooking from "./pages/booking/AddBooking";
import BookingsList from "./pages/booking/BookingList";
import BookingDetails from "./pages/booking/BookingDetails.jsx";
import EditBooking from "./pages/booking/EditingBooking";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoomsPage from "./pages/Hotel/Rooms";
import ImageForm from "./components/ImageForm.jsx";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 mb-5">
        {
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<RegisterUserForm />} />
              <Route path="/customerprofile" element={<CustomerProfile />} />
              <Route path="/hotelownerprofile" element={<HotelOwner />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/reviews" element={<ReviewList />} />
              <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
              <Route
                path="/hotels/:hotelId/reviews"
                element={<HotelReviews />}
              />
              <Route
                path="/hotels/:hotelId/add-review"
                element={<AddReview />}
              />
              <Route path="/bookings" element={<AddBooking />} />
              <Route path="/my-bookings" element={<BookingsList />} />
              <Route path="/my-bookings/:id" element={<BookingDetails />} />
              <Route path="/my-bookings/:id/edit" element={<EditBooking />} />
              <Route path="/hotels" element={<All_hotels />}></Route>
              <Route path="/hotels/:id" element={<RoomsPage />} />
              <Route path="/createImage/:Id" element={<ImageForm />} />
            </Routes>
          </BrowserRouter>
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
