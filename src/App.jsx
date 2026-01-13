import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// Actions
import { checkAuth } from './store/slices/login';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/LoginModal';
import ChatbotWidget from './components/Chat/ChatbotWidget';
import ProtectedRoute from './components/Routing/ProtectedRoute';
import BookingForm from './components/BookingForm';
import BookingDetail from './components/BookingDetailsView';
import ImageForm from './components/ImageForm';
import AddRoom from './components/AddRoomForm';
import AddType from './components/AddTypeForm';
import AddRoomImage from './components/AddRoomImageForm';
import RoomDetails from './components/roomdetails';
import HotelFormModal from './components/HotelFormModal';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import RegisterUserForm from './pages/register';

// Hotel Pages
import All_hotels from './pages/Hotel/all_hotels';
import HotelDetails from './pages/Hotel/hoteldetails';
import RoomsPage from './pages/Hotel/Rooms';

// Review Pages
import ReviewList from './pages/Review/ReviewList';
import ReviewDetail from './pages/Review/ReviewDetail';
import HotelReviews from './pages/Review/HotelReviews';
import AddReview from './pages/Review/AddReview';

// Payment Pages
import ClientInfoPayment from './pages/payment/ClientInfoPayment';
import PaymentMethod from './pages/payment/PaymentMethod';

// Profiles
import CustomerProfile from './pages/Profiles/Customer';
import HotelOwner from './pages/Profiles/HotelOwner';
import AdminPanel from './pages/Profiles/AdminPanel';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Header />
        <main className="flex-grow-1 mb-5">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUserForm />} />
            
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reviews/:reviewId" element={<ReviewDetail />} />
            
            <Route path="/hotels" element={<All_hotels />} />
            <Route path="/hotels/detail/:id" element={<HotelDetails />} />
            <Route path="/hotels/:ID" element={<RoomsPage />} />
            <Route path="/hotels/:hotelId/reviews" element={<HotelReviews />} />
            <Route path="/roomdetails/:_id" element={<RoomDetails />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/adminpanel" element={<AdminPanel />} />
                <Route path="/customerprofile" element={<CustomerProfile />} />
                <Route path="/hotelownerprofile" element={<HotelOwner />} />
                
                <Route path="/hotels/:hotelId/add-review" element={<AddReview />} />
                <Route path="/addhotel" element={<HotelFormModal />} />
                <Route path="/edithotel/:HOTEL_ID" element={<HotelFormModal />} />
                
                <Route path="/addroom/:HotelId" element={<AddRoom />} />
                <Route path="/addtype/:hotel_id" element={<AddType />} />
                <Route path="/addroomimage/:room_id" element={<AddRoomImage />} />
                <Route path="/editroom/:HotelId/:roomId/" element={<AddRoom />} />
                <Route path="/createImage/:Id" element={<ImageForm />} />
                
                <Route path="/addbooking/:hotel_Id" element={<BookingForm />} />
                <Route path="/bookingdetails/:UserId" element={<BookingDetail />} />
                
                <Route path="/payment/client-info/:bookingId" element={<ClientInfoPayment />} />
                <Route path="/payment-method/:paymentId" element={<PaymentMethod />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
        </main>
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
