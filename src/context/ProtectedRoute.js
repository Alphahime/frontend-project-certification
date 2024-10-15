// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
