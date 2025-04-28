import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageForm from "./components/ImageForm";
import BookingForm from "./components/addbooking";
import BookingDetail from "./components/bookingdetails";
import AddRoom from "./components/addroom";
import AddType from "./components/addtype";
import AddRoomImage from "./components/addroomimage";
import RoomDetails from "./components/roomdetails";
import Login from "./components/login";

const Home = React.lazy(() => import("./pages/Home"));
const AllHotels = React.lazy(() => import("./pages/Hotel/all_hotels"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const ReviewList = React.lazy(() => import("./pages/Review/ReviewList"));
const ReviewDetail = React.lazy(() => import("./pages/Review/ReviewDetail"));
const HotelReviews = React.lazy(() => import("./pages/Review/HotelReviews"));
const AddReview = React.lazy(() => import("./pages/Review/AddReview"));
const RegisterUserForm = React.lazy(() => import("./pages/register"));
const CustomerProfile = React.lazy(() => import("./pages/Profiles/Customer"));
const AdminPanel = React.lazy(() => import("./pages/Profiles/AdminPanel"));
const HotelOwner = React.lazy(() => import("./pages/Profiles/HotelOwner"));
const AddBooking = React.lazy(() => import("./pages/booking/AddBooking"));
const BookingsList = React.lazy(() => import("./pages/booking/BookingList"));
const BookingDetails = React.lazy(() =>
  import("./pages/booking/BookingDetails")
);
const EditBooking = React.lazy(() => import("./pages/booking/EditingBooking"));
const RoomsPage = React.lazy(() => import("./pages/Hotel/Rooms"));
const ClientInfoPayment = React.lazy(() =>
  import("./pages/payment/ClientInfoPayment")
);
const PaymentMethod = React.lazy(() => import("./pages/payment/PaymentMethod"));
const HotelDetails = React.lazy(() => import("./pages/Hotel/hoteldetails"));

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        {/* suspense , header, footer  */}
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <Header />
          <main className="flex-grow-1 mb-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterUserForm />} />
              <Route path="/customerprofile" element={<CustomerProfile />} />
              <Route path="/hotelownerprofile" element={<HotelOwner />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/reviews" element={<ReviewList />} />
              <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
              <Route path="/hotels/all" element={<AllHotels />} />
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
              <Route path="/hotels/:ID" element={<RoomsPage />} />
              <Route path="/createImage/:Id" element={<ImageForm />} />
              <Route path="/hotels" element={<AllHotels />} />
              <Route path="/hotels/detail/:id" element={<HotelDetails />} />
              <Route path="/addroom/:HotelId" element={<AddRoom />} />
              <Route path="/addtype/:hotel_id" element={<AddType />} />
              <Route path="/addroomimage/:room_id" element={<AddRoomImage />} />
              <Route path="/roomdetails/:_id" element={<RoomDetails />} />
              <Route path="/editroom/:roomId/" element={<AddRoom />} />
              <Route path="/addbooking/:hotel_Id" element={<BookingForm />} />
              <Route
                path="/bookingdetails/:UserId"
                element={<BookingDetail />}
              />
              <Route
                path="/payment/client-info/:bookingId"
                element={<ClientInfoPayment />}
              />
              <Route
                path="/payment-method/:paymentId"
                element={<PaymentMethod />}
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-center" autoClose={3000} />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
