// src/components/CoachsEspace/Messages.js
import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import Header from './Header';
const Messages = () => {
  return (
    <div>
         <Sidebar />
         <Header />
      <h2>Gestion des Messages</h2>
      {/* Ajoutez ici votre logique pour afficher et gérer les messages */}
    </div>
  );
};

export default Messages;
