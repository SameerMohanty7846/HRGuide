import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('role');

  if (!userRole) {
    alert('Please login to access this page.');
    return <Navigate to="/login" />;
  }

  // Support role as string or array of strings
  if (Array.isArray(role)) {
    if (!role.includes(userRole)) {
      alert('You do not have permission to access this page.');
      return <Navigate to="/login" />;
    }
  } else {
    if (userRole !== role) {
      alert('You do not have permission to access this page.');
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRoute;
