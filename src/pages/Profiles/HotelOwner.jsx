import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  editCurrentUser,
  clearError,
} from "../../store/slices/accounts";
import { fetchOwnerHotelBookings } from "../../store/slices/booking";
import { Modal, Button, Form, Table, Badge } from "react-bootstrap";
import styles from './HotelOwner.module.css';

export default function HotelOwner() {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.accounts);
  const { bookings } = useSelector((state) => state.bookings);
  const { loading, formError } = useSelector((state) => state.accounts);
  console.log("formError from hotel owner page", formError);

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
    try {
      const resultAction = await dispatch(editCurrentUser(formData));
      if (editCurrentUser.fulfilled.match(resultAction)) {
        console.log("User updated successfully:", resultAction.payload);
        setshowUserDataEditForm(false);
        dispatch(fetchCurrentUser());
        clearError();
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      // await dispatch(editCurrentUser(formData));
      // dispatch(fetchCurrentUser());
      // setshowUserDataEditForm(false);
    }
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
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button
          className={styles.sidebarButton}
          onClick={() => setActiveSection("personal")}
        >
          Hotel Owner Personal Data
        </button>
        <button
          className={styles.sidebarButton}
          onClick={() => setActiveSection("bookings")}
        >
          Bookings
        </button>
      </div>

      <div className={styles.content}>
        {activeSection === "personal" && (
          <div className={styles.profileSection}>
            <h2 className={styles.h2}>Hotel Owner Personal Info</h2>
            {userDetail ? (
              <div>
                <p className={styles.paragraph}>
                  <strong>Name:</strong> {userDetail.username}
                </p>
                <p className={styles.paragraph}>
                  <strong>Email:</strong> {userDetail.email}
                </p>
                <p className={styles.paragraph}>
                  <strong>Phone:</strong> {userDetail.phone}
                </p>
                <p className={styles.paragraph}>
                  <strong>Role:</strong> {userDetail.role}
                </p>
                <button
                  className={styles.editButton}
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
                    {formError && (
                      <p style={{ color: "red" }}>{formError.username}</p>
                    )}
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
                    {formError && (
                      <p style={{ color: "red" }}>{formError.email}</p>
                    )}
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
                    {formError && (
                      <p style={{ color: "red" }}>{formError.phone}</p>
                    )}
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
                    {formError && (
                      <p style={{ color: "red" }}>{formError.password}</p>
                    )}
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
                    {formError && (
                      <p style={{ color: "red" }}>{formError.password2}</p>
                    )}
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
          <div>
            <h2 className={styles.h2}>Bookings</h2>

            <div className={styles.filters}>
              <select
                onChange={handleBookingStatusFilterChange}
                value={bookingStatusFilter}
                className={styles.select}
              >
                <option value="all">All Bookings</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </select>

              <select
                onChange={handleHotelFilterChange}
                value={hotelFilter}
                className={styles.select}
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
              <Table striped bordered hover responsive className={styles.table}>
                <thead className={styles.tableHead}>
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
                      <td className={styles.tableCellBold}>
                        ${booking.total_price}
                      </td>
                      <td>{getStatusBadge(booking.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className={styles.noBookings}>No bookings found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
