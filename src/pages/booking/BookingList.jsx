import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings, deleteBooking } from '../../store/slices/booking';
import { useNavigate } from 'react-router-dom';
import { getAllHotels } from '../../services/api';
import { FaBed, FaCalendarCheck, FaCalendarTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';

const BookingsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const token = localStorage.getItem('access');
  const user = localStorage.getItem('user'); // Or wherever your user data is stored
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    } else {
      dispatch(fetchAllBookings());
      getAllHotels()
      .then((res) => {
        console.log("Hotels data:", res.data); // 🔍 Check structure here
        setHotels(res.data);
      })
        .catch(() => console.error('Failed to load hotels.'));
    }
  }, [dispatch, user, navigate]);

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
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      dispatch(deleteBooking(id));
    }
  };

  // Ensure bookings is an array before mapping over it
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className="text-center mt-5">No bookings available.</p>;
  }

  // Function to get the badge color based on the booking status
  const getBadgeColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#CD9A5E'; // Confirmed
      case 'cancelled':
        return '#B45F3A'; // Cancelled
      case 'pending':
        return '#8A8A8A'; // Pending
      default:
        return '#8A8A8A'; // Default to pending
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#F9F5F1', minHeight: '100vh' }}>
      <div className="mb-4">
        <button
          className="btn d-flex align-items-center fw-bold"
          style={{
            backgroundColor: '#E8DFD5',
            color: '#B45F3A',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px'
          }}
          onClick={() => navigate('/')}
        >
          <span style={{ transform: 'rotate(180deg)', display: 'inline-block', marginRight: '8px' }}>➜</span>
          Back Home
        </button>
      </div>
  
      <h1 className="text-center mb-5 fw-bold" style={{ color: '#CD9A5E', fontFamily: 'Segoe UI' }}>
        🛎️ Your Bookings
      </h1>
  

      <div className="row g-4">
        {bookings.map((booking) => {
          const formattedCheckIn = format(new Date(booking.check_in), 'MMM dd, yyyy');
          const formattedCheckOut = format(new Date(booking.check_out), 'MMM dd, yyyy');
          const badgeColor = getBadgeColor(booking.status); // Get badge color based on status

          return (
            <div key={booking.id} className="col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm"
                style={{ backgroundColor: '#E8DFD5', border: 'none', borderRadius: '15px' }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-dark">
                      <FaBed className="me-2" style={{ color: '#B45F3A' }} />
                      {getBookingTitle(booking.hotel, booking.room)}
                    </h5>
                    {/* Badge based on booking status */}
                    <span 
                      className="badge my-3"
                      style={{
                        backgroundColor: badgeColor,
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <p className="text-muted">
                      <FaCalendarCheck className="me-2" style={{ color: '#CD9A5E' }} />
                      Check-in: {formattedCheckIn} <br />
                      <FaCalendarTimes className="me-2" style={{ color: '#CD9A5E' }} />
                      Check-out: {formattedCheckOut}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between gap-2 mt-3">
                    <button
                      className="btn btn-sm d-flex align-items-center justify-content-center fw-bold"
                      style={{ backgroundColor: '#CD9A5E', color: 'white', flex: 1 }}
                      onClick={() => navigate(`/my-bookings/${booking.id}`)}
                    >
                      <FaEye className="me-2" /> View
                    </button>

                    {/* Conditionally render Edit button */}
                    {['confirmed', 'cancelled'].includes(booking.status) ? null : (
                      <button
                        className="btn btn-sm d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          backgroundColor: '#B45F3A',
                          color: 'white',
                          flex: 1
                        }}
                        onClick={() => navigate(`/my-bookings/${booking.id}/edit`)}
                      >
                        <FaEdit className="me-2" /> Edit
                      </button>
                    )}

                    {/* Conditionally render Delete button */}
                    {['confirmed', 'cancelled'].includes(booking.status) ? null : (
                      <button
                        className="btn btn-sm d-flex align-items-center justify-content-center fw-bold"
                        style={{ backgroundColor: '#8A8A8A', color: 'white', flex: 1 }}
                        onClick={() => handleDelete(booking.id)}
                      >
                        <FaTrash className="me-2" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsList;
