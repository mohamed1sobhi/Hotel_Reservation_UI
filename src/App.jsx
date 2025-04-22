<<<<<<< HEAD
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Footer from './components/Common/Footer';

function App() {


  return (

<div className="d-flex flex-column min-vh-100">
  <main className="flex-grow-1">
    {
      /*add ur components hereeeeee pleaseee here and ONLY HEREEE*/
    }
  </main>
  <Footer />
</div>


=======
import React, {useEffect} from 'react'
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
import 

function App() {

  return (
    <>
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
    </Routes>
    </BrowserRouter>
      
    </>
>>>>>>> origin/Atyya
  )
}

export default App
