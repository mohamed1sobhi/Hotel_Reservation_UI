import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Modal, Button } from "react-bootstrap";
import "./AdminPanel.css";

import {
  fetchCurrentAdmin,
  fetchUsers,
  fetchBookings,
  fetchHotels,
  logout,
  clearError,
} from "../../store/slices/accounts";

import api from "../../services/api";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminDashboard from "../../components/Admin/AdminDashboard";
import AdminProfile from "../../components/Admin/AdminProfile";
import UserTable from "../../components/Admin/UserTable";
import BookingTable from "../../components/Booking/BookingTable";
import HotelTable from "../../components/Hotel/HotelTable";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    admin,
    users,
    bookings,
    hotels,
    status,
    error,
  } = useSelector((state) => state.accounts);

  const [counts, setCounts] = useState({
    users: 0,
    hotels: 0,
    bookings: 0,
    revenue: 0,
  });
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchCounts = async () => {
    try {
      const response = await api.get("/admin/count/");
      setCounts(response.data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentAdmin());
    dispatch(fetchUsers());
    dispatch(fetchBookings());
    dispatch(fetchHotels());
    fetchCounts();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  
  const toggleSidebar = () => {
      setSidebarCollapsed(!sidebarCollapsed);
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard users={users} bookings={bookings} hotels={hotels} />;
      case "personal":
        return <AdminProfile userDetail={admin} />;
      case "users":
        return <UserTable users={users} />;
      case "bookings":
        return <BookingTable bookings={bookings} />;
      case "hotels":
        return <HotelTable hotels={hotels} />;
      default:
        return <div className="placeholder-content">Section under construction</div>;
    }
  };

  const getPageTitle = () => {
      switch(activeSection) {
          case "dashboard": return "Dashboard Overview";
          case "personal": return "My Profile";
          case "users": return "User Management";
          case "bookings": return "Booking Management";
          case "hotels": return "Hotel Management";
          default: return "Admin Panel";
      }
  }

  return (
    <div className="admin-dashboard">
      <Helmet>
        <title>Admin Panel | Hotel Reservation</title>
      </Helmet>

      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        admin={admin}
        onLogout={() => setShowLogoutModal(true)}
      />

      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        <header className="dashboard-header">
          <div className="page-title">
            <h1>{getPageTitle()}</h1>
          </div>
        </header>

        <div className="content-wrapper">
             {renderContent()}
        </div>
      </div>

      <Modal 
        show={showLogoutModal} 
        onHide={() => setShowLogoutModal(false)}
        centered
        className="delete-confirmation-modal" 
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
