import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../store/slices/booking';
import { getAllHotels } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faBed, faCalendarAlt, faMoneyBillWave, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddBooking = () => {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState('');
  const [room, setRoom] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('access');
  const user = localStorage.getItem('user'); // Or wherever your user data is stored

  useEffect(() => {
    if (!token || !user) {
        console.log('User not logged in, redirecting to login...');
        navigate('/login');
    }

    getAllHotels()
      .then((res) => setHotels(res.data))
      .catch(() => setError('Failed to load hotels.'));
  }, [user, navigate]);

  useEffect(() => {
    const selectedHotel = hotels.find((h) => h.id === Number(hotel));
    setRooms(selectedHotel?.rooms || []);
    setRoom('');
    setRoomPrice(0);
  }, [hotel, hotels]);

  useEffect(() => {
    const selectedRoom = rooms.find((r) => r.id === Number(room));
    setRoomPrice(selectedRoom?.price_per_night || 0);
  }, [room, rooms]);

  useEffect(() => {
    if (checkIn && checkOut && roomPrice) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = (end - start) / (1000 * 60 * 60 * 24);
      setTotalPrice(nights > 0 ? nights * roomPrice : 0);
    } else {
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, roomPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!hotel || !room || !checkIn || !checkOut) {
      setError('All fields are required.');
      return;
    }

    try {
      await dispatch(
        addBooking({
          hotel,
          room,
          check_in: checkIn,
          check_out: checkOut,
        })
      ).unwrap();

      alert('🎉 Booking added successfully!');
      setHotel('');
      setRoom('');
      setCheckIn('');
      setCheckOut('');
      setTotalPrice(0);
      setRooms([]);
      navigate('/my-bookings');
    } catch (err) {
      const messages = typeof err === 'object' ? Object.values(err).flat().join(' | ') : 'Invalid data.';
      setError(messages);
    }
  };

  return (
    <div className="container py-5">
      <div className="mx-auto p-4 shadow" style={{
        backgroundColor: '#FDF6EC',
        maxWidth: '700px',
        borderRadius: '15px',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#2C1E1E'
      }}>
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Home
          </button>
        </div>

        <h2 className="text-center mb-4" style={{ color: '#CD9A5E', fontWeight: 'bold' }}>
          <FontAwesomeIcon icon={faHotel} className="me-2" />
          Book Your Stay
        </h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Hotel */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FontAwesomeIcon icon={faHotel} className="me-2 text-warning" />
              Hotel
            </label>
            <select className="form-select" value={hotel} onChange={(e) => setHotel(e.target.value)} required>
              <option value="">Select Hotel</option>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          {/* Room */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FontAwesomeIcon icon={faBed} className="me-2 text-warning" />
              Room
            </label>
            <select className="form-select" value={room} onChange={(e) => setRoom(e.target.value)} required>
              <option value="">Select Room</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>{r.name} – ${r.price_per_night}/night</option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label fw-semibold">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-warning" />
                Check-in
              </label>
              <input type="date" className="form-control" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-warning" />
                Check-out
              </label>
              <input type="date" className="form-control" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              <FontAwesomeIcon icon={faMoneyBillWave} className="me-2 text-warning" />
              Total Price
            </label>
            <input className="form-control" type="text" value={`$${totalPrice}`} readOnly />
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
                fontSize: '1rem'
              }}
            >
              <FontAwesomeIcon icon={faBed} className="me-2" />
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooking;
