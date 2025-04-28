import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelDetail } from "../store/slices/hotels";
import { addBooking } from "../store/slices/booking";
import { fetchHotelRoomsType } from "../store/slices/rooms";

export default function BookingForm() {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotel_Id } = useParams();
  const { hotel } = useSelector((state) => state.hotels);
  const { hotelRoomTypes } = useSelector((state) => state.rooms);

  const [checkIn, setCheckIn] = useState("");
  const [days, setDays] = useState(1);
  const [items, setItems] = useState([{ room_type_id: "", quantity: 1 }]);
  const [errorMessages, setErrorMessages] = useState("");

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

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
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

    try {
      const response = await dispatch(addBooking(data)).unwrap();
      console.log("Booking created successfully:", response);

      const bookingId = response.booking_id;
      navigate(`/bookingdetails/${bookingId}/`);
    } catch (error) {
      console.error("Error creating booking:", error);

      if (error?.response?.data) {
        const errorData = error.response.data;

        if (errorData?.non_field_errors) {
          setErrorMessages(errorData.non_field_errors.join(", "));
        } else {
          setErrorMessages("An unexpected error occurred. Please try again later.");
        }
      } else {
        setErrorMessages("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="booking-form mx-auto p-4 shadow">
        <h2 className="text-center mb-4 booking-title">Book Your Stay</h2>

        {errorMessages && (
          <div className="alert alert-danger text-center">
            <strong>Error: </strong>
            {errorMessages}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Check-in Date */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Check-in Date:</label>
            <input
              type="date"
              className="form-control"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>

          {/* Days */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Days:</label>
            <input
              type="number"
              className="form-control"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
            />
          </div>

          {/* Room Items */}
          <h4 className="mb-3">Room Items</h4>
          {items.map((item, index) => (
            <div key={index} className="row mb-3 align-items-center">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Room Type:</label>
                <select
                  name="room_type_id"
                  className="form-select"
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
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
              </div>
              <div className="col-md-2 text-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeItem(index)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </div>
          ))}

          <button type="button" className="btn btn-secondary mb-3" onClick={addItem}>
            + Add Room
          </button>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn booking-btn">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
