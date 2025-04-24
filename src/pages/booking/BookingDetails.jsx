import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingDetail, deleteBooking } from '../../store/slices/booking';
import { getAllHotels } from '../../services/api';
import { FaCalendarAlt, FaArrowRight, FaTrash, FaEdit, FaMoneyBillWave, FaCheckCircle, FaArrowLeft, FaHome } from 'react-icons/fa';
import { format } from 'date-fns';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux states for booking and loading/error
  const booking = useSelector((state) => state.bookings.selectedBooking);
  const [hotels, setHotels] = useState([]);

  const token = localStorage.getItem('access');
  const user = localStorage.getItem('user'); // Or wherever your user data is stored

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    } else {
      dispatch(fetchBookingDetail(id)); // Dispatch Redux action to fetch booking detail
          getAllHotels()
         .then((res) => {
           console.log("Hotels data:", res.data); // 🔍 Check structure here
           setHotels(res.data);
         })
           .catch(() => console.error('Failed to load hotels.'));
       }
     }, [id, navigate, dispatch, token, user]);

  const getBookingTitle = (hotelId, roomId) => {
    const hotel = hotels.find(h => h.id === Number(hotelId));
    if (!hotel) return `Hotel ${hotelId} – Room ${roomId}`;
  
    const room = hotel.rooms?.find(r => r.id === Number(roomId));
    if (!room) {
      console.warn(`Room ${roomId} not found in hotel ${hotelId}`);
      return `${hotel.name} – Room ${roomId}`;
    }
  
    return `${hotel.name} – ${room.room_type}`;
  };

const handleDelete = () => {
  if (window.confirm('Are you sure you want to delete this booking?')) {
    dispatch(deleteBooking(id)).then(() => {
      navigate('/my-bookings');
      })
      .catch((err) => {
        console.error('Delete Booking Error:', err);
      });
  }
};


  const calculateNights = () => {
    if (!booking) return 0;
    const start = new Date(booking.check_in);
    const end = new Date(booking.check_out);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  if (!booking) {
    return <div className="text-center mt-4">Booking not found</div>;
  }

  const formattedCheckInDate = booking.check_in
    ? format(new Date(booking.check_in), 'MMM dd, yyyy')
    : 'Invalid date';

  const formattedCheckOutDate = booking.check_out
    ? format(new Date(booking.check_out), 'MMM dd, yyyy')
    : 'Invalid date';

  // Check if the booking status is either cancelled or confirmed
  const isDisabled = ['cancelled', 'confirmed'].includes(booking.status);

  return (
    <div className="container py-5" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="card shadow-lg" style={{ backgroundColor: '#F9F5F1', borderRadius: '12px' }}>
        <div className="card-body">
          {/* Navigation buttons */}
          <div className="d-flex justify-content-between mb-4">
            {/* Back to My Bookings Button */}
            <button
              className="btn text-white"
              style={{ backgroundColor: '#8A8A8A', fontWeight: 'bold', padding: '0.6rem 1.5rem', borderRadius: '8px' }}
              onClick={() => navigate('/my-bookings')}
            >
              <FaArrowLeft className="me-2" /> My Bookings
            </button>

            {/* Home Button */}
            <button
              className="btn text-white"
              style={{ backgroundColor: '#8A8A8A', fontWeight: 'bold', padding: '0.6rem 1.5rem', borderRadius: '8px' }}
              onClick={() => navigate('/')}
            >
              <FaHome className="me-2" /> Home
            </button>
          </div>

          <h3 className="text-center fw-bold mb-4" style={{ color: '#CD9A5E' }}>
          {getBookingTitle(booking.hotel, booking.room)}
          </h3>

          {/* Date Section */}
          <div className="row text-center mb-4 g-3">
            <div className="col-md-4">
              <div className="p-3 rounded" style={{ backgroundColor: '#E8DFD5' }}>
                <FaCalendarAlt className="mb-2" size={20} color="#CD9A5E" />
                <div><strong>Check-in:</strong></div>
                <div>{formattedCheckInDate}</div>
              </div>
            </div>

            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
              <FaArrowRight size={24} color="#CD9A5E" />
              <span className="mt-2">{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
            </div>

            <div className="col-md-4">
              <div className="p-3 rounded" style={{ backgroundColor: '#E8DFD5' }}>
                <FaCalendarAlt className="mb-2" size={20} color="#CD9A5E" />
                <div><strong>Check-out:</strong></div>
                <div>{formattedCheckOutDate}</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item d-flex justify-content-between">
              <span><FaMoneyBillWave className="me-2 text-success" />Total Price:</span>
              <span className="fw-bold" style={{ color: '#B45F3A' }}>${booking.total_price}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span><FaCheckCircle className="me-2 text-info" />Status:</span>
              <span className="text-capitalize">{booking.status}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span><FaMoneyBillWave className="me-2 text-primary" />Payment:</span>
              <span className="text-capitalize">{booking.payment_status}</span>
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex justify-content-between flex-wrap gap-3">
            {/* Edit Button */}
            {!isDisabled && (
              <button
                className="btn text-white flex-fill"
                style={{ backgroundColor: '#CD9A5E' }}
                onClick={() => navigate(`/my-bookings/${id}/edit`)}
              >
                <FaEdit className="me-2" /> Edit Booking
              </button>
            )}

            {/* Delete Button */}
            {!isDisabled && (
              <button
                className="btn text-white flex-fill"
                style={{ backgroundColor: '#B45F3A' }}
                onClick={() => handleDelete(booking.id)}
              >
                <FaTrash className="me-2" /> Delete Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
