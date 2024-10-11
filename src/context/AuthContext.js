// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Optionnel : supprimer le token lors de la déconnexion
    localStorage.removeItem('user'); // Optionnel : supprimer les données utilisateur
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
