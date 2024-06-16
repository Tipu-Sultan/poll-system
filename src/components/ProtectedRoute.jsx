import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Parse stored user object

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
