import React from "react";
import "./BookingsCard.css"; // External CSS for styling

export default function BookingsCard({
  hotelimage,
  hotelname,
  hoteladdress,
  hotelrating,
  bookingPrice,
  bookingDate,
  bookingStatus,
}) {
  return (
    <div className="card booking-card d-flex flex-column flex-md-row align-items-start mb-4">
      <img src={hotelimage} alt="Hotel" className="img-fluid booking-image" />
      <div className="booking-details p-3">
        <h4 className="hotel-name">{hotelname}</h4>
        <p className="hotel-address">{hoteladdress}</p>
        <p>⭐ Rating: {hotelrating}</p>
        <p>💵 Price: {bookingPrice}</p>
        <p>📅 Date: {bookingDate}</p>
        <p className={`status ${bookingStatus.toLowerCase()}`}>
          Status: {bookingStatus}
        </p>
      </div>
    </div>
  );
}
