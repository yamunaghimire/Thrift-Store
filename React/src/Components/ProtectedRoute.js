// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ element, isAdminRoute }) => {
  const { isAuthenticated, role } = useAuth();

  // If user is not authenticated or is not an admin (for admin-only routes)
  if (isAdminRoute && role !== 'admin') {
    return <Navigate to="/login" />; // Redirect non-admin users to login
  }

  // If the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element; // If authenticated (and admin if needed), render the element
};

export default ProtectedRoute;
