import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../../store/slices/booking';
import { FaCalendarAlt, FaArrowRight, FaTrash, FaEdit, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('access');
  const user = localStorage.getItem('user'); // Or wherever your user data is stored

  useEffect(() => {
    if (!token || !user) {
        console.log('User not logged in, redirecting to login...');
        navigate('/login');
    }
    else {
      axios.get(`/api/bookings/${id}/`)
        .then(res => setBooking(res.data))
        .catch(() => setError('Failed to load booking details'));
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      dispatch(deleteBooking(id));
      navigate('/bookings');
    }
  };

  const calculateNights = () => {
    const start = new Date(booking.check_in);
    const end = new Date(booking.check_out);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  if (!booking) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const formattedCheckInDate = format(new Date(booking.check_in), 'MMM dd, yyyy');
  const formattedCheckOutDate = format(new Date(booking.check_out), 'MMM dd, yyyy');

  return (
    <div className="container py-5" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="card shadow-lg" style={{ backgroundColor: '#F9F5F1', borderRadius: '12px' }}>
        <div className="card-body">
          <h3 className="text-center fw-bold mb-4" style={{ color: '#CD9A5E' }}>
            {booking.hotel} – Room {booking.room}
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
            <button
              className="btn text-white flex-fill"
              style={{ backgroundColor: '#CD9A5E' }}
              onClick={() => navigate(`/bookings/${id}/edit`)}
            >
              <FaEdit className="me-2" />Edit Booking
            </button>

            <button
              className="btn text-white flex-fill"
              style={{ backgroundColor: '#B45F3A' }}
              onClick={handleDelete}
            >
              <FaTrash className="me-2" />Delete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
