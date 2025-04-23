import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBooking, fetchBookingDetail } from '../../store/slices/booking';  // Import the update action
import axios from 'axios';
import { FaCalendarAlt, FaDoorOpen } from 'react-icons/fa';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('access');
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored as a JSON string

  const selectedBooking = useSelector((state) => state.bookings.selectedBooking);
  const loading = useSelector((state) => state.bookings.loading);
  const error = useSelector((state) => state.bookings.error);

  const [formData, setFormData] = useState({
    check_in: '',
    check_out: '',
    room: '',
  });

  const [statusError, setStatusError] = useState('');
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState([]); // Define the errors state

  useEffect(() => {
    if (!token || !user) {
      console.log('User not logged in, redirecting to login...');
      navigate('/login');
    }

    dispatch(fetchBookingDetail(id));  // Fetch the booking details when component mounts

    axios.get('/api/rooms/')
      .then(res => setRooms(res.data))
      .catch((err) => console.log("Failed to load rooms", err));
  }, [id, user, token, navigate, dispatch]);

  useEffect(() => {
    if (selectedBooking) {
      if (selectedBooking.user !== user.id) {
        setStatusError("⚠️ You cannot edit this booking. It's not your booking.");
      } else if (['confirmed', 'cancelled'].includes(selectedBooking.status)) {
        setStatusError("⛔ Cannot edit a confirmed or cancelled booking.");
      } else {
        setFormData({
          check_in: selectedBooking.check_in,
          check_out: selectedBooking.check_out,
          room: selectedBooking.room.id,  // Assuming room has an id
        });
      }
    }
  }, [selectedBooking, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      check_in: formData.check_in,
      check_out: formData.check_out,
      room: formData.room,
    };

    // Dispatch update booking action
    dispatch(updateBooking({ id, data: updatedData }))
      .then(() => {
        navigate('/bookings');  // Redirect after successful update
      })
      .catch((err) => {
        const data = err.response?.data;
        if (typeof data === 'string') {
          setErrors([data]); // Set the error messages
        } else if (typeof data === 'object') {
          const messages = Object.values(data).flat();
          setErrors(messages); // Handle object errors
        } else {
          setErrors(['Update failed. Please check your inputs.']); // General error
        }
      });
  };

  if (loading) return <p>Loading...</p>;
  if (statusError) {
    return (
      console.log(user),
      console.log(selectedBooking),
      console.log(selectedBooking.user),
      <div className="container text-center mt-5">
        <div className="alert alert-danger">{statusError}</div>
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;
  

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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Room --</option>
                  {Array.isArray(rooms) && rooms.map(room => (
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
