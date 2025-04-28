import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingsCard from "../../components/BookingCard/BookingsCard";
import {
  fetchCurrentUser,
  editCurrentUser,
  clearError,
} from "../../store/slices/accounts";
import "./Customer.css";
import { fetchUserBookings } from "../../store/slices/booking";
import { Link } from "react-router-dom";

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const { userDetail, loading, error } = useSelector((state) => state.accounts);
  const { bookings } = useSelector((state) => state.bookings);

  console.log(bookings, "bookings");

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // fetch user bookings
  useEffect(() => {
    if (userDetail) {
      dispatch(fetchUserBookings());
    }
  }, [dispatch, userDetail]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000); // Clear after 5 seconds

      return () => clearTimeout(timer); // Cleanup on unmount or re-run
    }
  }, [error, dispatch]);

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => setShowForm(true);

  const handleFormSuccess = (e) => {
    e.preventDefault(); // prevent default form submission
    const formData = {
      username: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      password: document.querySelector('input[name="Password"]').value,
      password2: document.querySelector('input[name="confirmPassword"]').value,
    };
    dispatch(editCurrentUser(formData));
    setShowForm(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
      </div>
      <div className="profile-details">
        {userDetail ? (
          <>
            <p>
              <strong>Name:</strong> {userDetail.username}
            </p>
            <p>
              <strong>Email:</strong> {userDetail.email}
            </p>
            <p>
              <strong>Phone:</strong> {userDetail.phone}
            </p>
            <p>
              <strong>Address:</strong> {userDetail.address}
            </p>
            <p>
              <strong>Role:</strong> {userDetail.role}
            </p>
            {!showForm ? (
              <button className="btn btn-custom" onClick={handleButtonClick}>
                Edit
              </button>
            ) : (
              <button
                className="btn btn-custom"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            )}

            {showForm && (
              <form className="mt-4" onSubmit={handleFormSuccess}>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="name"
                  placeholder="Name"
                  defaultValue={userDetail.name}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  name="email"
                  placeholder="Email"
                  defaultValue={userDetail.email}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="phone"
                  placeholder="Phone"
                  defaultValue={userDetail.phone}
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  name="Password"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <button type="submit" className="btn btn-custom">
                  Update
                </button>
              </form>
            )}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}

            {/*   hotelimage,
                  hotelname,
                  roomtype,
                  roomnumber,

                  hoteladdress,
                  hotelrating,

                  bookingPrice,
                  bookingDate,
                  checkinDate,
                  checkOutDate,
                  bookingStatus,
            */}

            <div className="mt-5">
              <h2>Your Bookings</h2>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Link
                    to={`/my-bookings/${booking.id}`}
                    className="text-decoration-none text-dark"
                    key={booking.id}
                  >
                    <BookingsCard
                      key={booking.id}
                      hotelimage={booking.hotel_image}
                      bookingDate={booking.created_at}
                      hotelname={booking.hotel_name}
                      hoteladdress={booking.hotel_address}
                      roomtype={booking.room_type}
                      checkinDate={booking.check_in}
                      checkOutDate={booking.check_out}
                      hotelrating={booking.hotelRating}
                      bookingPrice={booking.total_price}
                      bookingStatus={booking.status}
                    />
                  </Link>
                ))
              ) : (
                <p>No bookings Yet.</p>
              )}
            </div>
          </>
        ) : (
          <p>No user details found.</p>
        )}
      </div>
    </div>
  );
}
