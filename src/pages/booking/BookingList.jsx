import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings, deleteBooking } from '../../store/slices/booking';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaCalendarCheck, FaCalendarTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';

const BookingsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const token = localStorage.getItem('access');
  const user = localStorage.getItem('user'); // Or wherever your user data is stored

  useEffect(() => {
    if (!token || !user) {
        console.log('User not logged in, redirecting to login...');
        navigate('/login');
    }
    else {
      dispatch(fetchAllBookings());
    }
  }, [dispatch, user, navigate]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      dispatch(deleteBooking(id));
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  // Ensure bookings is an array before mapping over it
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className="text-center mt-5">No bookings available.</p>;
  }

  return (
    <div className="container py-5" style={{ backgroundColor: '#F9F5F1', minHeight: '100vh' }}>
      <h1 className="text-center mb-5 fw-bold" style={{ color: '#CD9A5E', fontFamily: 'Segoe UI' }}>
        🛎️ Your Bookings
      </h1>

      <div className="row g-4">
        {bookings.map((booking) => {
          const formattedCheckIn = format(new Date(booking.check_in), 'MMM dd, yyyy');
          const formattedCheckOut = format(new Date(booking.check_out), 'MMM dd, yyyy');

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
                      {booking.hotel} – Room {booking.room}
                    </h5>
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

                    <button
                      className="btn btn-sm d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        backgroundColor: '#B45F3A',
                        color: 'white',
                        flex: 1,
                        opacity: ['confirmed', 'cancelled'].includes(booking.status) ? 0.6 : 1,
                        cursor: ['confirmed', 'cancelled'].includes(booking.status) ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => navigate(`/my-bookings/${booking.id}/edit`)}
                      disabled={['confirmed', 'cancelled'].includes(booking.status)}
                    >
                      <FaEdit className="me-2" /> Edit
                    </button>

                    <button
                      className="btn btn-sm d-flex align-items-center justify-content-center fw-bold"
                      style={{ backgroundColor: '#8A8A8A', color: 'white', flex: 1 }}
                      onClick={() => handleDelete(booking.id)}
                    >
                      <FaTrash className="me-2" /> Delete
                    </button>
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
