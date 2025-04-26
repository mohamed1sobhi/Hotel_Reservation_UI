import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelDetail } from "../store/slices/hotels";
import { addBooking } from "../store/slices/booking";
import { fetchHotelRoomsType } from "../store/slices/rooms";

export default function BookingForm() {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  console.log("userid " , userId)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotel_Id } = useParams(); 
  const { hotel } = useSelector((state) => state.hotels);
  const { hotelRoomTypes } = useSelector((state) => state.rooms);

  const [checkIn, setCheckIn] = useState("");
  const [days, setDays] = useState(1);

  const [items, setItems] = useState([
    { room_type_id: "", quantity: 1 },
  ]);

  useEffect(() => {
    dispatch(fetchHotelDetail(hotel_Id));
    dispatch(fetchHotelRoomsType(hotel_Id));
  }, [dispatch, hotel_Id]);

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { room_type_id: "", quantity: 1 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user: userId,
      hotel: parseInt(hotel_Id),
      check_in: checkIn,
      days: parseInt(days),
      item_inputs: items.map((item) => ({
        room_type_id: parseInt(item.room_type_id),
        quantity: parseInt(item.quantity),
      })),
    };

    dispatch(addBooking(data))
      navigate(`/bookingdetails/${userId}/`);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div>
        <label>Check-in Date:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Days:</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />
      </div>

      <h4>Room Items</h4>
      {items.map((item, index) => (
        <div key={index}>
          <label>Room Type:</label>
  <select
    name="room_type_id"
    value={item.room_type_id}
    onChange={(e) => handleItemChange(index, e)}
    required
    >
      <option value="">Select Room Type</option>
      {hotelRoomTypes.map((type) => (
        <option key={type.id} value={type.id}>
          {type.room_type}
        </option>
      ))}
    </select>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addItem}>
        + Add Room
      </button>

      <button type="submit">Book Now</button>
    </form>
  );
}

