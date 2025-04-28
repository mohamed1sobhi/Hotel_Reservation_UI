import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentAdmin,
  fetchUsers,
  clearError,
} from "../../store/slices/accounts";
import { fetchAllBookings } from "../../store/slices/booking";
import { fetchHotels } from "../../store/slices/hotels";
import BookingsCard from "../../components/BookingCard/BookingsCard";
import UserCard from "../../components/UsersCard/UsersCard";
import "./AdminPanel.css";
import HotelCard from "../../components/HotelCard/HotelCard";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { userDetail, error, users } = useSelector((state) => state.accounts);
  const { bookings } = useSelector((state) => state.bookings);
  const { hotels } = useSelector((state) => state.hotels);

  console.log(bookings, "bookings");
  console.log(hotels, "hotels");

  // Admin's personal data and form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter state for users and bookings
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchCurrentAdmin());
    dispatch(fetchUsers());
    dispatch(fetchHotels());
    dispatch(fetchAllBookings());
  }, [dispatch]);

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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Handle filtering logic for users and bookings
  const handleUserRoleFilterChange = (e) => {
    setUserRoleFilter(e.target.value);
  };

  const handleBookingStatusFilterChange = (e) => {
    setBookingStatusFilter(e.target.value);
  };

  // Filter users by role
  const filteredUsers = users.filter((user) => {
    if (userRoleFilter === "all") return true;
    return user.role === userRoleFilter;
  });

  // Filter bookings by status
  const filteredBookings = bookings.filter((booking) => {
    if (bookingStatusFilter === "all") return true;
    return booking.status === bookingStatusFilter;
  });

  // Handle form submission for updating admin data
  const handleFormSuccess = (e) => {
    e.preventDefault();
    dispatch(editCurrentAdmindata(formData));
    setShowForm(false);
  };

  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <button onClick={() => setActiveSection("personal")}>
          Admin Personal Data
        </button>
        <button onClick={() => setActiveSection("users")}>Users</button>
        <button onClick={() => setActiveSection("bookings")}>Bookings</button>
        <button onClick={() => setActiveSection("hotels")}>Hotels</button>
      </div>

      <div className="content">
        {/* Admin Personal Data Section */}
        {activeSection === "personal" && (
          <div className="profile-section">
            <h2>Admin Personal Info</h2>
            {userDetail ? (
              <div>
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
                  <strong>Role:</strong> {userDetail.role}
                </p>
                <button>
                  <span onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Edit"}
                  </span>
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            {showForm && (
              <form onSubmit={handleFormSuccess}>
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setFormData({ ...formData, password2: e.target.value })
                  }
                />
                <button type="submit">Update</button>
              </form>
            )}
          </div>
        )}

        {/* Users Section */}
        {activeSection === "users" && (
          <div className="users-section">
            <h2>Users</h2>
            <select
              onChange={handleUserRoleFilterChange}
              value={userRoleFilter}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="hotel_owner">Hotel Owner</option>
              <option value="customer">Client</option>
            </select>
            {filteredUsers && filteredUsers.length > 0 ? (
              <div className="user-cards">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    username={user.username}
                    email={user.email}
                    role={user.role}
                    phone={user.phone}
                    address={user.address}
                    status={user.status ? "Active" : "Blocked"}
                  />
                ))}
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}

        {/* Bookings Section */}
        {activeSection === "bookings" && (
          <div className="bookings-section">
            <h2>Bookings</h2>
            <select
              onChange={handleBookingStatusFilterChange}
              value={bookingStatusFilter}
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>
            {filteredBookings && filteredBookings.length > 0 ? (
              <div className="bookings-list">
                {filteredBookings.map((booking) => (
                  <BookingsCard
                    key={booking.id}
                    hotelimage={booking.hotel_image}
                    hotelname={booking.hotel_name}
                    hoteladdress={booking.hotel_address}
                    bookingDate={booking.created_at}
                    clientName={booking.client_name}
                    clientEmail={booking.client_email}
                    roomtype={booking.room_type}
                    checkinDate={booking.check_in}
                    checkOutDate={booking.check_out}
                    hotelrating={booking.hotelRating}
                    bookingPrice={booking.total_price}
                    bookingStatus={booking.status}
                  />
                ))}
              </div>
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}

        {/* Hotels Section */}
        {activeSection === "hotels" && (
          <div className="hotels-section">
            <h2>Hotels</h2>
            {hotels && hotels.length > 0 ? (
              <div className="hotels-list">
                {hotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    name={hotel.name}
                    description={hotel.description}
                    address={hotel.address}
                    email={hotel.email}
                    phone={hotel.phone}
                    stars={hotel.stars}
                    created_at={hotel.created_at}
                  />
                ))}
              </div>
            ) : (
              <p>No hotels found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
