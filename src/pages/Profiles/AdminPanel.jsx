import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentAdmin, // tmam
  fetchUsers, // tmam
  clearError, // tmam
  editCurrentAdmindata, // tmam
  createUserForAdmin, // tmam
} from "../../store/slices/accounts";
import { fetchAllBookings } from "../../store/slices/booking";
import { fetchHotels } from "../../store/slices/hotels";
import { Modal, Button, Form, Table } from "react-bootstrap";
import "./AdminPanel.css";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { userDetail, error, users } = useSelector((state) => state.accounts);
  const { bookings } = useSelector((state) => state.bookings);
  const { hotels } = useSelector((state) => state.hotels);

  console.log("userDetail", userDetail);

  // Admin's personal data and form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "hotel_owner",
    password: "",
    password2: "",
  });

  const [showUserDataEditForm, setshowUserDataEditForm] = useState(false);
  const [showUserRegisterForm, setshowUserRegisterForm] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");

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

  // Handle filtering logic for users and bookings
  const handleUserRoleFilterChange = (e) => {
    setUserRoleFilter(e.target.value);
  };

  const handleBookingStatusFilterChange = (e) => {
    setBookingStatusFilter(e.target.value);
  };

  const handleHotelFilterChange = (e) => {
    setHotelFilter(e.target.value);
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

  // Filter hotels by stars
  const filteredHotels = hotels.filter((hotel) => {
    if (hotelFilter === "all") return true;
    return hotel.stars === parseInt(hotelFilter);
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleFormSuccess = async (e) => {
    e.preventDefault();
    await dispatch(editCurrentAdmindata(formData));
    dispatch(fetchCurrentAdmin());
    setshowUserDataEditForm(false);
  };

  const handleUserRegisterFormSuccess = async (e) => {
    e.preventDefault();
    await dispatch(createUserForAdmin(registerFormData));
    dispatch(fetchUsers());
    setshowUserRegisterForm(false);
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
                <button
                  className="btn btn-custom"
                  onClick={() => setshowUserDataEditForm(!showUserDataEditForm)}
                >
                  {showUserDataEditForm ? "Cancel" : "Edit"}
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <Modal
              show={showUserDataEditForm}
              onHide={() => setshowUserDataEditForm(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Admin Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFormSuccess}>
                  <Form.Group controlId="username">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Name"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="password2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password2"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        setFormData({ ...formData, password2: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        )}

        {activeSection === "users" && (
          <div className="users-section">
            <h2>Users</h2>
            <button
              className="btn btn-custom show-user-register-form"
              onClick={() => setshowUserRegisterForm(!showUserRegisterForm)}
            >
              {showUserRegisterForm ? "Cancel" : "Register New User"}
            </button>
            <Modal
              show={showUserRegisterForm}
              onHide={() => setshowUserRegisterForm(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Register New User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleUserRegisterFormSuccess}>
                  <Form.Group controlId="username">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Name"
                      onChange={(e) =>
                        setRegisterFormData({
                          ...registerFormData,
                          username: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) =>
                        setRegisterFormData({
                          ...registerFormData,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      onChange={(e) =>
                        setRegisterFormData({
                          ...registerFormData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setRegisterFormData({
                          ...registerFormData,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="password2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password2"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        setRegisterFormData({
                          ...registerFormData,
                          password2: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      name="role"
                      onChange={(e) =>
                        setRegisterFormData({
                          ...registerFormData,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="customer">Client</option>
                      <option value="hotel_owner">Hotel Owner</option>
                      <option value="admin">Admin</option>
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

            <select
              onChange={handleUserRoleFilterChange}
              value={userRoleFilter}
              className="form-select my-3"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="hotel_owner">Hotel Owner</option>
              <option value="customer">Client</option>
            </select>

            {users && users.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address || "N/A"}</td>
                      <td>{user.role}</td>
                      <td>{user.status ? "Active" : "Blocked"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}

        {activeSection === "bookings" && (
          <div className="bookings-section">
            <h2>Bookings</h2>
            <select
              onChange={handleBookingStatusFilterChange}
              value={bookingStatusFilter}
              className="form-select my-3"
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>

            {bookings && bookings.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Hotel Name</th>
                    <th>Hotel Address</th>
                    <th>Client Name</th>
                    <th>Client Email</th>
                    <th>Room Type</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Booking Date</th>
                    <th>Hotel Rating</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.hotel_name}</td>
                      <td>{booking.hotel_address}</td>
                      <td>{booking.client_name}</td>
                      <td>{booking.client_email}</td>
                      <td>{booking.room_type}</td>
                      <td>{booking.check_in}</td>
                      <td>{booking.check_out}</td>
                      <td>
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                      <td>{booking.hotelRating} ★</td>
                      <td>${booking.total_price}</td>
                      <td>{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}

        {activeSection === "hotels" && (
          <div className="hotels-section">
            <h2>Hotels</h2>
            <select
              onChange={handleHotelFilterChange}
              value={hotelFilter}
              className="form-select my-3"
            >
              <option value="all">All Hotels</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
              <option value="6">6 Stars</option>
              <option value="7">7 Stars</option>
            </select>

            {hotels && hotels.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Stars</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHotels.map((hotel) => (
                    <tr key={hotel.id}>
                      <td>{hotel.name}</td>
                      <td>{hotel.description}</td>
                      <td>{hotel.address}</td>
                      <td>{hotel.email}</td>
                      <td>{hotel.phone}</td>
                      <td>{hotel.stars} ★</td>
                      <td>{new Date(hotel.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No hotels found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
