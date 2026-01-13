import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Common/Loader';

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.auth);

  if (!isInitialized) {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Loader />
        </div>
    );
  }

  if (!isAuthenticated) {
    // You might want to trigger the Login Modal here instead of redirecting
    // For now, redirect to Home
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
