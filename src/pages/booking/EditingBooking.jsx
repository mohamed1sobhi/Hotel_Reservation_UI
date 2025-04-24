import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaDoorOpen } from 'react-icons/fa';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('access');
  const user = localStorage.getItem('user'); // Or wherever your user data is stored

  const [formData, setFormData] = useState({
    check_in: '',
    check_out: '',
    room: '',
  });
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState([]);
  const [statusError, setStatusError] = useState('');
  const [bookingNotFound, setBookingNotFound] = useState(false);

  useEffect(() => {
    if (!token || !user) {
        console.log('User not logged in, redirecting to login...');
        navigate('/login');
    }

    axios.get(`/api/bookings/${id}/`)
      .then(res => {
        const data = res.data;
        if (data.user !== user) {
          // Check if the logged-in user matches the booking user
          setStatusError("⚠️ You cannot edit this booking. It's not your booking.");
        } else if (['confirmed', 'cancelled'].includes(data.status)) {
          setStatusError("⛔ Cannot edit a confirmed or cancelled booking.");
        } else {
          setFormData({
            check_in: data.check_in,
            check_out: data.check_out,
            room: data.room,
          });
        }
      })
      .catch(() => setStatusError("⚠️ Failed to load booking."));

    axios.get('/api/rooms/')
      .then(res => setRooms(res.data));
  }, [id, user, navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    axios.put(`/api/bookings/${id}/`, formData)
      .then(() => navigate('/bookings'))
      .catch(err => {
        const data = err.response?.data;
        if (typeof data === 'string') {
          setErrors([data]);
        } else if (typeof data === 'object') {
          const messages = Object.values(data).flat();
          setErrors(messages);
        } else {
          setErrors(['Update failed. Please check your inputs.']);
        }
      });
  };

  if (statusError) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">{statusError}</div>
      </div>
    );
  }

  if (bookingNotFound) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">
          <p>No booking available to edit. Please check your booking details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ backgroundColor: '#F4EFE6', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="p-4 shadow rounded" style={{ backgroundColor: '#FFFDF8', border: '1px solid #e7ddd2' }}>
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#CD9A5E' }}>
              ✏️ Edit Your Booking
            </h2>

            {errors.length > 0 && (
              <div className="alert alert-warning">
                <ul className="mb-0">
                  {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  <FaCalendarAlt className="me-2 text-warning" /> Check-in
                </label>
                <input
                  type="date"
                  name="check_in"
                  value={formData.check_in}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  <FaCalendarAlt className="me-2 text-warning" /> Check-out
                </label>
                <input
                  type="date"
                  name="check_out"
                  value={formData.check_out}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">
                  <FaDoorOpen className="me-2 text-warning" /> Room
                </label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Room --</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} – ${room.price_per_night}/night
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn w-100 text-white fw-bold"
                style={{ backgroundColor: '#B87333' }}
              >
                Update Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;
