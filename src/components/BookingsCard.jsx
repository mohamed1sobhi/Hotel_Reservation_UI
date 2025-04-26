import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./BookingsCard.css"; // External CSS for styling

export default function BookingsCard({
  hotelimage,
  hotelname,
  hotelId,
  roomtype,
  roomnumber,
  hoteladdress,
  hotelrating,
  bookingPrice,
  bookingDate,
  checkinDate,
  checkOutDate,
  bookingStatus,
}) {
  return (
    <div className="card booking-card d-flex flex-column flex-md-row align-items-start mb-4">
      <img src={hotelimage} alt="Hotel" className="img-fluid booking-image" />
      <div className="booking-details p-3">
        <h4 className="hotel-name">{hotelname}</h4>
        <p className="hotel-address">{hoteladdress}</p>
        <p> Room:{roomtype} </p>
        <p> Room Number: {roomnumber} </p>
        <p> Date: {bookingDate}</p>
        <p> Check In: {checkinDate}</p>
        <p> Check Out: {checkOutDate}</p>
        <p> Price: {bookingPrice} $</p>
        <p className={`status ${bookingStatus}` || ""}>
          Status: {bookingStatus}
        </p>
      </div>
    </div>
  );
}
