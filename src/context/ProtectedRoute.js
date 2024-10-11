// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  // Vérifiez si l'utilisateur est authentifié et a le rôle autorisé
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
