import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ReviewList from './pages/Review/ReviewList';
import HotelReviews from './pages/Review/HotelReviews';
import AddReview from './pages/Review/AddReview';
import Login from './components/login';
import RegisterUserForm from './pages/register';
import CreatePayment from './pages/payment/PaymentForm';
import PaymentsList from './pages/payment/paymentList';
import PaymentSettings from './pages/payment/paymentSettings';
import AddBooking from './pages/booking/AddBooking';
import BookingsList from './pages/booking/BookingList';
import BookingDetails from './pages/booking/BookingDetails.jsx';
import EditBooking from './pages/booking/EditingBooking';
import Footer from './components/Footer';

function App() {


  return (

<div className="d-flex flex-column min-vh-100">
  <main className="flex-grow-1 mb-5">
    {
    <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home />} ></Route>
     <Route path='/login' element={<Login />} ></Route>
     <Route path='/register' element={<RegisterUserForm />} ></Route>
     <Route path="/about" element={<AboutUs />} />
     <Route path="/contact" element={<ContactUs />} />
     <Route path="/reviews" element={<ReviewList />} />
     <Route path="/hotels/:hotelId/reviews" element={<HotelReviews />} />
     <Route path="/hotels/:hotelId/add-review" element={<AddReview />} />
     <Route path="/bookings" element={<AddBooking />} />
     <Route path="/my-bookings" element={<BookingsList />} />
     <Route path="/my-bookings/:id" element={<BookingDetails />} />
     <Route path="/my-bookings/:id/edit" element={<EditBooking />} />
   </Routes>
   </BrowserRouter>
    }
  </main>
  <Footer />
</div>


  )
}

export default App
