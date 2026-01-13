import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookingDetail, updateBooking } from '../../store/slices/booking';
import { getAllHotels } from '../../services/hotel.service'; // Assuming you have an API file with this function.
import { FaCalendarAlt, FaBed, FaMoneyBillWave, FaHotel } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  const selectedBooking = useSelector((state) => state.bookings.selectedBooking);

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

  useEffect(() => {
    if (errors.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [errors]);

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

    // Reset errors
    setErrors([]);
    setStatusError('');

    // Validate dates before submitting
    const { check_in, check_out, room } = formData;
    if (!check_in || !check_out || !room) {
      setErrors(['All fields are required']);
      return;
    }

    if (new Date(check_in) >= new Date(check_out)) {
      setErrors(['Check-out date must be after check-in date']);
      return;
    }

    const updatedData = {
      check_in,
      check_out,
      room,
    };

    dispatch(updateBooking({ id, data: updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Booking updated successfully!', {
          style: {
            background: 'var(--bs-primary)', // Warm gold
            color: '#fff',         // White text
            fontWeight: 'bold',
          }
        });        
        setTimeout(() => {
          navigate(`/my-bookings/${id}`);
        }, 1000); 
      })
      .catch((err) => {
        console.error("Update Booking Error:", err);

        if (typeof err === 'string') {
          setErrors([err]);
        } else if (typeof err === 'object') {
          const messages = Object.values(err).flat();
          setErrors(messages);
        } else {
          setErrors(['Update failed. Please check your inputs.']);
        }
      });
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#F4EFE6', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="p-4 shadow rounded" style={{ backgroundColor: '#FFFDF8', border: '1px solid #e7ddd2' }}>
            <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--bs-primary)' }}>
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

              {/* Buttons for navigation */}
              <div className="text-center my-4 ">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-3"
                  onClick={() => navigate(`/my-bookings/${id}`)}
                >
                  🔍 Booking Details
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => navigate('/my-bookings')}
                >
                  📋 Your Bookings List
                </button>
              </div>

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
                    <option key={r.id} value={r.id}>
                      {r.room_type} – ${r.price_per_night}/night
                    </option>
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
