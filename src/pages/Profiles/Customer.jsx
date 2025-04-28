import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCurrentUser,
  editCurrentUser,
  clearError,
} from "../../store/slices/accounts";
import { fetchUserPayments } from "../../store/slices/payments";
import "./Customer.css";

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const { userDetail, loading, error } = useSelector((state) => state.accounts);
  const { payments } = useSelector((state) => state.payments);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const [paymentFilter, setPaymentFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // fetch user payments
  useEffect(() => {
    if (userDetail) {
      dispatch(fetchUserPayments());
    }
  }, [dispatch, userDetail]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (userDetail) {
      setFormData({
        username: userDetail.username || "",
        email: userDetail.email || "",
        phone: userDetail.phone || "",
        password: "",
        password2: "",
      });
    }
  }, [userDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editCurrentUser(formData));
    setShowForm(false);
  };

  // Get bookings from payments
  const bookings = payments?.map(payment => payment.booking).filter(Boolean);

  const filteredBookings = bookings?.filter((booking) => {
    if (paymentFilter === "all") return true;
    if (paymentFilter === "completed") {
      return payment.status.toLowerCase() === "completed";
    }
    if (paymentFilter === "pending") {
      return payment.status.toLowerCase() === "pending";
    }
    return booking.status.toLowerCase() === paymentFilter;
  });

  const getBookingStats = () => {
    if (!bookings || bookings.length === 0) return { total: 0, confirmed: 0, pending: 0, cancelled: 0 };
    
    return {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status.toLowerCase() === "confirmed").length,
      pending: bookings.filter(b => b.status.toLowerCase() === "pending").length,
      cancelled: bookings.filter(b => b.status.toLowerCase() === "cancelled").length,
    };
  };

  const getPaymentStats = () => {
    if (!payments || payments.length === 0) return { total: 0, completed: 0, pending: 0 };
    
    return {
      total: payments.length,
      completed: payments.filter(p => p.status.toLowerCase() === "completed").length,
      pending: payments.filter(p => p.status.toLowerCase() === "pending").length,
    };
  };

  const bookingStats = getBookingStats();
  const paymentStats = getPaymentStats();

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">Loading your profile...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Customer Dashboard</h1>
        {!showForm && (
          <button className="btn-custom" onClick={() => setShowForm(true)}>
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-details">
        {userDetail ? (
          <>
            <div className="stats-summary">
              <div className="stat-card">
                <div className="stat-value">{bookingStats.total}</div>
                <div className="stat-label">Total Bookings</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{bookingStats.confirmed}</div>
                <div className="stat-label">Confirmed</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{paymentStats.completed}</div>
                <div className="stat-label">Completed Payments</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{paymentStats.pending}</div>
                <div className="stat-label">Pending Payments</div>
              </div>
            </div>

            <div className="user-info-card">
              <div className="info-item">
                <strong>Name</strong>
                <p>{userDetail.username}</p>
              </div>
              <div className="info-item">
                <strong>Email</strong>
                <p>{userDetail.email}</p>
              </div>
              <div className="info-item">
                <strong>Phone</strong>
                <p>{userDetail.phone || "Not provided"}</p>
              </div>
              <div className="info-item">
                <strong>Address</strong>
                <p>{userDetail.address || "Not provided"}</p>
              </div>
              <div className="info-item">
                <strong>Role</strong>
                <p>{userDetail.role}</p>
              </div>
            </div>

            {showForm && (
              <div className="edit-profile-section">
                <div className="edit-form">
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-custom">
                        Update Profile
                      </button>
                      <button
                        type="button"
                        className="btn-custom btn-cancel"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="bookings-section">
              <div className="bookings-section-header">
                <h2>Your Bookings & Payments</h2>
                <div className="view-toggle">
                  <button 
                    className={viewMode === "cards" ? "active" : ""}
                    onClick={() => setViewMode("cards")}
                  >
                    Card View
                  </button>
                  <button 
                    className={viewMode === "table" ? "active" : ""}
                    onClick={() => setViewMode("table")}
                  >
                    Table View
                  </button>
                </div>
              </div>

              <div className="filter-controls">
                <select
                  className="filter-select"
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                >
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed Bookings</option>
                  <option value="completed">Completed Payments</option>
                  <option value="pending">Pending Payments</option>
                </select>
              </div>

              {payments && payments.length > 0 ? (
                viewMode === "cards" ? (
                  <div className="bookings-grid">
                    {payments.map((payment) => {
                      const booking = payment.booking;
                      if (!booking) return null;
                      
                      return (
                        <Link
                          to={`/my-bookings/${booking.id}`}
                          className="booking-card-link"
                          key={payment.id}
                        >
                          <div className="booking-card">
                            <div className="booking-image">
                              <img
                                src={booking.hotel_image || "/hotel-placeholder.jpg"}
                                alt={booking.hotel_name}
                              />
                              <div
                                className={`booking-status status-${booking.status.toLowerCase()}`}
                              >
                                {booking.status}
                              </div>
                              <div
                                className={`payment-status status-${payment.status.toLowerCase()}`}
                              >
                                Payment: {payment.status}
                              </div>
                            </div>
                            <div className="booking-details">
                              <h3 className="hotel-name">{booking.hotel_name}</h3>
                              <p className="hotel-address">
                                {booking.hotel_address}
                              </p>
                              
                              <div className="booking-info">
                                <div className="booking-date">
                                  <strong>Check-in</strong>
                                  {formatDate(booking.check_in)}
                                </div>
                                <div className="booking-date">
                                  <strong>Check-out</strong>
                                  {formatDate(booking.check_out)}
                                </div>
                                <div className="room-info">
                                  <strong>Room Type</strong>
                                  {booking.room_type}
                                </div>
                              </div>
                              
                              <div className="price-rating">
                                <div className="price">
                                  ${payment.amount}
                                </div>
                                <div className="payment-method">
                                  {payment.payment_method.replace('_', ' ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="data-table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Hotel</th>
                          <th>Room Type</th>
                          <th>Dates</th>
                          <th>Payment</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => {
                          const booking = payment.booking;
                          if (!booking) return null;
                          
                          return (
                            <tr key={payment.id}>
                              <td>
                                <div className="hotel-cell">
                                  <div className="hotel-name">{booking.hotel_name}</div>
                                  <div className="hotel-address">{booking.hotel_address}</div>
                                </div>
                              </td>
                              <td>{booking.room_type}</td>
                              <td>
                                <div className="dates-cell">
                                  <div>Check-in: {formatDate(booking.check_in)}</div>
                                  <div>Check-out: {formatDate(booking.check_out)}</div>
                                </div>
                              </td>
                              <td>
                                <div className="price-cell">
                                  <div className="price-amount">${payment.amount}</div>
                                  <div className="payment-method">{payment.payment_method.replace('_', ' ')}</div>
                                  <div className="payment-date">{formatDate(payment.payment_date)}</div>
                                </div>
                              </td>
                              <td>
                                <div className="status-badges">
                                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                    Booking: {booking.status}
                                  </span>
                                  <span className={`status-badge ${payment.status.toLowerCase()}`}>
                                    Payment: {payment.status}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="action-buttons">
                                  <Link to={`/my-bookings/${booking.id}`}>
                                    <button className="icon-button view">View</button>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="empty-state">
                  <p>You haven't made any bookings yet.</p>
                  <Link to="/hotels">
                    <button className="btn-custom">Browse Hotels</button>
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>No user details found. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}