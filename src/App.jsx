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
  )
}

export default App
