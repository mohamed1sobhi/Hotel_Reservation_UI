import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingDetail, deleteBooking } from '../../store/slices/booking';
import { getAllHotels } from '../../services/api';
import { FaCalendarAlt, FaArrowRight, FaTimesCircle, FaEdit, FaMoneyBillWave, FaCheckCircle, FaArrowLeft, FaHome, FaDollarSign } from 'react-icons/fa';
import { format } from 'date-fns';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const booking = useSelector((state) => state.bookings.selectedBooking);
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);  // State to toggle modal visibility

  const token = localStorage.getItem('access');
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
    } else {
      dispatch(fetchBookingDetail(id));
      getAllHotels()
        .then((res) => {
          setHotels(res.data);
        })
        .catch(() => console.error('Failed to load hotels.'));
    }
  }, [id, navigate, dispatch, token, user]);

  const getBookingTitle = (hotelId, roomId) => {
    const hotel = hotels.find(h => h.id === Number(hotelId));
    if (!hotel) return `Hotel ${hotelId} – Room ${roomId}`;
  
    const room = hotel.rooms?.find(r => r.id === Number(roomId));
    if (!room) return `${hotel.name} – Room ${roomId}`;
  
    return `${hotel.name} – ${room.room_type}`;
  };

  const handleDelete = () => {
    dispatch(deleteBooking(id)).then(() => {
      navigate('/my-bookings');
    }).catch((err) => {
      console.error('Delete Booking Error:', err);
    });
    setShowModal(false);  // Close the modal after deletion
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

  const isDisabled = booking.status === 'confirmed';

  return (
    <div className="container py-5" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="card shadow-lg" style={{ backgroundColor: '#F9F5F1', borderRadius: '12px' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-4">
            <button
              className="btn text-white"
              style={{ backgroundColor: '#8A8A8A', fontWeight: 'bold', padding: '0.6rem 1.5rem', borderRadius: '8px' }}
              onClick={() => navigate('/my-bookings')}
            >
              <FaArrowLeft className="me-2" /> My Bookings
            </button>

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

          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item d-flex justify-content-between">
              <span><FaDollarSign className="me-2 text-success" />Total Price:</span>
              <span className="fw-bold" style={{ color: '#B45F3A' }}>${booking.total_price}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span><FaCheckCircle className="me-2 text-info" />Status:</span>
              <span className="text-capitalize">{booking.status}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span><FaMoneyBillWave className="me-2 text-success" />Payment:</span>
              <span className="text-capitalize">{booking.payment_status}</span>
            </li>
          </ul>

          {/* Status-based messages */}
          {booking.status === 'pending' && (
            <div className="alert alert-warning mt-4" role="alert" style={{ fontSize: '1rem', backgroundColor: '#FFF3CD', borderColor: '#FFEEBA', color: '#856404' }}>
              📢 This booking is currently marked as <strong>Pending</strong>. It is <u>not confirmed</u> and may still be booked by others.<br />
              To secure your stay, please complete the <strong>payment</strong> below.
            </div>
          )}

          {booking.status === 'confirmed' && (
            <div className="alert alert-success mt-4" role="alert" style={{ fontSize: '1rem', backgroundColor: '#D4EDDA', borderColor: '#C3E6CB', color: '#155724' }}>
              🎉 Your booking is <strong>Confirmed</strong>!<br />
              Thank you for choosing us — we look forward to hosting you.<br />
              🛏️ Wishing you a pleasant and relaxing stay!
            </div>
          )}

          <div className="d-flex justify-content-between flex-wrap gap-3">
            {!isDisabled && (
              <button
                className="btn text-white flex-fill"
                style={{ backgroundColor: '#CD9A5E' }}
                onClick={() => navigate(`/my-bookings/${id}/edit`)}
              >
                <FaEdit className="me-2" /> Edit Booking
              </button>
            )}

            {!isDisabled && (
              <button
                className="btn text-white flex-fill"
                style={{ backgroundColor: '#B45F3A' }}
              >
                💳 Pay Now
              </button>
            )}

            {!isDisabled && (
              <button
                className="btn text-white flex-fill"
                style={{ backgroundColor: '#8A8A8A' }}
                onClick={() => setShowModal(true)}  // Open modal on button click
              >
                <FaTimesCircle className="me-2" /> Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Confirm Cancellation</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to cancel this booking?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ backgroundColor: '#B45F3A' }}>Close</button>
                <button type="button" className="btn btn-secondary" onClick={handleDelete} style={{ backgroundColor: '#8A8A8A' }}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
