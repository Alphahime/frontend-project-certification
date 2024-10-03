import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const UtilisateursGestion = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/utilisateurs')
      .then(response => response.json())
      .then(data => setUtilisateurs(data.data));
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <h1>Gestion des Utilisateurs</h1>
        <ul>
          {utilisateurs.map(utilisateur => (
            <li key={utilisateur.id}>
              {utilisateur.nom} - {utilisateur.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UtilisateursGestion;
