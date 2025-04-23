import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookingDetail, updateBooking } from '../../store/slices/booking';
import { getAllHotels } from '../../services/api'; // Assuming you have an API file with this function.
import { FaCalendarAlt, FaBed, FaMoneyBillWave, FaHotel } from 'react-icons/fa';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const selectedBooking = useSelector((state) => state.bookings.selectedBooking);
  const loading = useSelector((state) => state.bookings.loading);
  const error = useSelector((state) => state.bookings.error);

  const [formData, setFormData] = useState({
    check_in: '',
    check_out: '',
    hotel: '',
    room: '',
    roomPrice: 0,
    totalPrice: 0,
  });

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState([]);
  const [statusError, setStatusError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access');
    if (!storedUser || !storedToken) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, [navigate]);

  useEffect(() => {
    if (user && token) {
      // Fetch booking details and hotels
      dispatch(fetchBookingDetail(id));

      getAllHotels()  // Use your own API call function here
        .then((res) => setHotels(res.data))
        .catch((err) => console.log("Failed to load hotels", err));
    }
  }, [id, user, token, dispatch]);

  useEffect(() => {
    if (selectedBooking) {
      // Pre-fill the form data with the selected booking details
      setFormData({
        check_in: selectedBooking.check_in,
        check_out: selectedBooking.check_out,
        hotel: selectedBooking.hotel, 
        room: selectedBooking.room,   
        roomPrice: selectedBooking.room.price_per_night || 0,
        totalPrice: calculateTotalPrice(selectedBooking.check_in, selectedBooking.check_out, selectedBooking.room.price_per_night),
      });
    }
  }, [selectedBooking]);

  useEffect(() => {
    const selectedHotel = hotels.find((h) => h.id === Number(formData.hotel));
    setRooms(selectedHotel?.rooms || []);
  }, [formData.hotel, hotels]);

  useEffect(() => {
    const selectedRoom = rooms.find((r) => r.id === Number(formData.room));
    setFormData((prevState) => ({
      ...prevState,
      roomPrice: selectedRoom?.price_per_night || 0,
    }));
  }, [formData.room, rooms]);

  useEffect(() => {
    if (formData.check_in && formData.check_out && formData.roomPrice) {
      setFormData((prevState) => ({
        ...prevState,
        totalPrice: calculateTotalPrice(formData.check_in, formData.check_out, formData.roomPrice),
      }));
    }
  }, [formData.check_in, formData.check_out, formData.roomPrice]);

  const calculateTotalPrice = (checkIn, checkOut, roomPrice) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = (end - start) / (1000 * 60 * 60 * 24);
    return nights > 0 ? nights * roomPrice : 0;
  };

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
  
    dispatch(updateBooking({ id, data: updatedData, headers }))
      .then(() => {
        navigate('/my-bookings');
      })
      .catch((err) => {
        console.log(err.response); // Log the error response to see more details.
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
  

  if (loading) return <p>Loading...</p>;
  if (statusError) {
    return (
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
              {/* Hotel */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  <FaHotel className="me-2 text-warning" /> Hotel
                </label>
                <select
                  className="form-select"
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Hotel</option>
                  {hotels.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>

              {/* Room */}
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  <FaBed className="me-2 text-warning" /> Room
                </label>
                <select
                  className="form-select"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.name} – ${r.price_per_night}/night</option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
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
                <div className="col-md-6">
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
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">
                  <FaMoneyBillWave className="me-2 text-warning" /> Total Price
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={`$${formData.totalPrice || 0}`}
                  readOnly
                />
              </div>

              {/* Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: '#B45F3A',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0.6rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  Update Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;
