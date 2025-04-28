import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-loaded components
const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const ReviewList = React.lazy(() => import('./pages/Review/ReviewList'));
const ReviewDetail = React.lazy(() => import('./pages/Review/ReviewDetail'));
const HotelReviews = React.lazy(() => import('./pages/Review/HotelReviews'));
const AddReview = React.lazy(() => import('./pages/Review/AddReview'));
const Login = React.lazy(() => import('./components/login'));
const ClientInfoPayment = React.lazy(() => import('./pages/payment/ClientInfoPayment'));
const PaymentMethod = React.lazy(() => import('./pages/payment/PaymentMethod'));
const AddBooking = React.lazy(() => import('./pages/booking/AddBooking'));
const BookingsList = React.lazy(() => import('./pages/booking/BookingList'));
const BookingDetails = React.lazy(() => import('./pages/booking/BookingDetails.jsx'));
const EditBooking = React.lazy(() => import('./pages/booking/EditingBooking'));
const Footer = React.lazy(() => import('./components/Footer'));
const RoomsPage = React.lazy(() => import('./pages/Hotel/Rooms'));
const ImageForm = React.lazy(() => import('./components/ImageForm'));
const Header = React.lazy(() => import('./components/Header'));
const Hotels = React.lazy(() => import('./pages/Hotel/all_hotels'));
const HotelDetails = React.lazy(() => import('./pages/Hotel/hoteldetails'));
const AddRoom = React.lazy(() => import('./components/addroom'));
const AddType = React.lazy(() => import('./components/addtype'));
const AddRoomImage = React.lazy(() => import('./components/addroomimage'));
const RoomDetails = React.lazy(() => import('./components/roomdetails'));
const BookingForm = React.lazy(() => import('./components/addbooking'));
const BookingDetail = React.lazy(() => import('./components/bookingdetails'));
const NotFound = React.lazy(() => import("./pages/NotFound"));
function App() {

      
  return (

    <div className="d-flex flex-column min-vh-100">
    <BrowserRouter>
      <Header />
      <main className="flex-grow-1 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path='/register' element={<RegisterUserForm />} /> */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
          <Route path="/hotels/:hotelId/reviews" element={<HotelReviews />} />
          <Route path="/hotels/:hotelId/add-review" element={<AddReview />} />
          <Route path="/bookings" element={<AddBooking />} />
          <Route path="/my-bookings" element={<BookingsList />} />
          <Route path="/my-bookings/:id" element={<BookingDetails />} />
          <Route path="/my-bookings/:id/edit" element={<EditBooking />} />
          <Route path="/hotels/:ID" element={<RoomsPage />} />
          <Route path="/createImage/:Id" element={<ImageForm />} />
          <Route path="/hotels" element= { <Hotels />} />
          <Route path="/hotels/detail/:id" element={<HotelDetails />} />
          <Route path="/addroom/:HotelId" element={<AddRoom />} />
          <Route path="/addtype/:hotel_id" element={< AddType />} />
          <Route path="/addroomimage/:room_id" element={<AddRoomImage />} />
          <Route path="/roomdetails/:_id" element={<RoomDetails />} />
          <Route path="/editroom/:roomId/" element={<AddRoom />} />
          <Route path="/addbooking/:hotel_Id" element={<BookingForm />} />
          <Route path="/bookingdetails/:UserId" element={< BookingDetail />}/>
          <Route path="/payment/client-info/:bookingId" element={<ClientInfoPayment />} />
          <Route path="/payment-method/:paymentId" element={<PaymentMethod />} />
          {/* <ToastContainer position="top-center" autoClose={3000} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </div>
 

  )
}

export default App
