import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, editCurrentUser } from "../../store/slices/accounts";
import { fetchOwnerHotelBookings } from "../../store/slices/booking";
import { Modal, Button, Form, Table, Badge } from "react-bootstrap";
import "./AdminPanel.css";

export default function HotelOwner() {
  const dispatch = useDispatch();
  const { userDetail, error } = useSelector((state) => state.accounts);
  const { bookings } = useSelector((state) => state.bookings);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const [showUserDataEditForm, setshowUserDataEditForm] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchOwnerHotelBookings());
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

  const filteredBookings = bookings.filter((booking) => {
    if (bookingStatusFilter === "all") return true;
    return booking.status === bookingStatusFilter;
  });

  const filteredBookingsByHotel = filteredBookings.filter((booking) => {
    if (hotelFilter === "all") return true;
    return booking.hotel_name === hotelFilter;
  });

  const handleBookingStatusFilterChange = (e) => {
    setBookingStatusFilter(e.target.value);
  };

  const handleHotelFilterChange = (e) => {
    setHotelFilter(e.target.value);
  };

  const handleFormSuccess = async (e) => {
    e.preventDefault();
    await dispatch(editCurrentUser(formData));
    dispatch(fetchCurrentUser());
    setshowUserDataEditForm(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge bg="success">Confirmed</Badge>;
      case "pending":
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
      case "cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="admin-panel-container">
      <div className="sidebar">
        <button onClick={() => setActiveSection("personal")}>
          Hotel Owner Personal Data
        </button>
        <button onClick={() => setActiveSection("bookings")}>Bookings</button>
      </div>

      <div className="content">
        {activeSection === "personal" && (
          <div className="profile-section">
            <h2>Hotel Owner Personal Info</h2>
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
                <Modal.Title>Edit Hotel Owner Info</Modal.Title>
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

                  <Button variant="primary" type="submit" className="mt-3">
                    Update
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        )}

        {activeSection === "bookings" && (
          <div className="bookings-section">
            <h2>Bookings</h2>

            <div
              className="filters"
              style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
            >
              <select
                onChange={handleBookingStatusFilterChange}
                value={bookingStatusFilter}
                className="form-select"
              >
                <option value="all">All Bookings</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </select>

              <select
                onChange={handleHotelFilterChange}
                value={hotelFilter}
                className="form-select"
              >
                <option value="all">All Hotels</option>
                {Array.from(new Set(bookings.map((b) => b.hotel_name))).map(
                  (hotelName, index) => (
                    <option key={`${hotelName}-${index}`} value={hotelName}>
                      {hotelName}
                    </option>
                  )
                )}
              </select>
            </div>

            {filteredBookingsByHotel.length > 0 ? (
              <Table
                striped
                bordered
                hover
                responsive
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #dee2e6",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th>Hotel Name</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Booking Date</th>
                    <th>Client Name</th>
                    <th>Client Email</th>
                    <th>Client Phone</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookingsByHotel.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.hotel_name}</td>
                      <td>{new Date(booking.check_in).toLocaleDateString()}</td>
                      <td>
                        {new Date(booking.check_out).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                      <td>{booking.client_name}</td>
                      <td>{booking.client_email}</td>
                      <td>{booking.client_phone}</td>
                      <td style={{ fontWeight: "bold" }}>
                        ${booking.total_price}
                      </td>
                      <td>{getStatusBadge(booking.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
