import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  editCurrentUser,
  clearError,
} from "../../store/slices/accounts";
import { fetchUserBookings } from "../../store/slices/booking";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap"; // Import React Bootstrap components

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const { userDetail, loading, error } = useSelector((state) => state.accounts);
  const { payments } = useSelector((state) => state.payments);

  console.log("bookings", bookings);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      password: document.querySelector('input[name="Password"]').value,
      password2: document.querySelector('input[name="confirmPassword"]').value,
    };
    dispatch(editCurrentUser(formData));
    setShowModal(false);
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileHeader}>
        <h1 style={{ color: "#cd9a5e" }}>Your Profile</h1>
      </div>

      <div>
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

            <Button
              variant="primary"
              style={styles.btnCustom}
              onClick={() => setShowModal(true)}
            >
              Edit
            </Button>

            {/* React Bootstrap Modal */}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              backdrop="static"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#cd9a5e" }}>
                  Edit Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      defaultValue={userDetail.username}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      defaultValue={userDetail.email}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhone">
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      defaultValue={userDetail.phone}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" style={styles.btnCustom}>
                      Update
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Bookings Section */}
            <div style={{ marginTop: "3rem" }}>
              <h2 style={{ color: "#cd9a5e" }}>Your Bookings</h2>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Link
                    to={
                      booking.status !== "confirmed"
                        ? `/bookingdetails/${booking.id}`
                        : ""
                    }
                    style={{ textDecoration: "none", color: "inherit" }}
                    key={booking.id}
                  >
                    <div style={styles.card}>
                      <img
                        src={booking.hotel_image}
                        alt="Hotel"
                        style={styles.cardImage}
                      />
                      <div style={styles.cardDetails}>
                        <h4 style={styles.cardTitle}>{booking.hotel_name}</h4>
                        <p>{booking.hotel_address}</p>
                        <p>Date: {booking.created_at}</p>
                        <p>Check In: {booking.check_in}</p>
                        <p>Check Out: {booking.check_out}</p>
                        <p>Price: {booking.total_price} $</p>
                        <p
                          style={{
                            fontWeight: "bold",
                            color: statusColors[booking.status] || "#8a8a8a",
                          }}
                        >
                          Status: {booking.status}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No bookings yet.</p>
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

const styles = {
  profileContainer: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#e8dfd5",
    borderRadius: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#1a1a1a",
  },
  profileHeader: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  btnCustom: {
    backgroundColor: "#cd9a5e",
    color: "white",
    border: "none",
    marginTop: "1rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f5f1",
    border: "1px solid #e8dfd5",
    borderRadius: "16px",
    padding: "20px",
    margin: "10px 0",
    boxShadow: "0 4px 10px rgba(26,26,26,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "12px",
  },
  cardDetails: {
    flex: 1,
    color: "#1a1a1a",
  },
  cardTitle: {
    marginBottom: "10px",
    fontSize: "1.7rem",
    color: "#cd9a5e",
  },
};

const statusColors = {
  confirmed: "#4caf50",
  pending: "#ff9800",
  cancelled: "#f44336",
};
