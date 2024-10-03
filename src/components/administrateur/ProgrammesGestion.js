import React from 'react';
import Sidebar from './Sidebar'; // Chemin corrigé

const ProgrammesGestion = () => {
  // Add logic to fetch and display program data similar to CoachsGestion
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <h1>Gestion des Programmes</h1>
        {/* Add content here */}
      </div>
    </div>
  );
};

export default ProgrammesGestion;
