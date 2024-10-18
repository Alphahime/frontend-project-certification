// src/components/CoachsEspace/Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
//import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {
  const userName = "Coach Name"; 

  return (
    <div className="dashboard">
     
      <Sidebar />
      <div className="content-coach-space">
        <h3>Bienvenue dans votre tableau de bord</h3>
        
        {/* Section pour les réservations */}
        <section className="reservations">
          <h2>Réservations à venir</h2>
          <ul>
            <li>Réservation 1 - Date et Heure</li>
            <li>Réservation 2 - Date et Heure</li>
            <li>Réservation 3 - Date et Heure</li>
          </ul>
        </section>

        {/* Section pour la gestion des clients */}
        <section className="clients">
          <h2>Gestion des Clients</h2>
          <button>Voir tous les clients</button>
          <button>Ajouter un client</button>
        </section>

        {/* Section pour les statistiques */}
        <section className="statistics">
          <h2>Statistiques</h2>
          <p>Nombre total de réservations : X</p>
          <p>Évaluations moyennes : Y</p>
        </section>

        {/* Section pour les promotions */}
        <section className="promotions">
          <h2>Promotions en cours</h2>
          <ul>
            <li>Promotion 1 - Détails</li>
            <li>Promotion 2 - Détails</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
