// src/components/CoachsEspace/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faDumbbell,
  faEnvelope,
  faHome,
  faUser,
  faClock,
  faHistory,
  faChartBar,
  faFileAlt,
  faTags,
  faBell,
  faCogs,
  faStar,         
  faDollarSign   
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/coachs">
            <FontAwesomeIcon icon={faHome} /> Tableau de bord
          </Link>
        </li>
        <li>
          <Link to="/coachs/gestion-profil">
            <FontAwesomeIcon icon={faUser} /> Gestion des Profils
          </Link>
        </li>
        <li>
          <Link to="/coachs/calendrier">
            <FontAwesomeIcon icon={faClock} /> Calendrier de Disponibilité
          </Link>
        </li>
        <li>
          <Link to="/coachs/historique">
            <FontAwesomeIcon icon={faHistory} /> Historique des Réservations
          </Link>
        </li>
        <li>
          <Link to="/coachs/gestion-clients">
            <FontAwesomeIcon icon={faEnvelope} /> Gestion des Clients
          </Link>
        </li>
        <li>
          <Link to="/coachs/evaluation-feedback">
            <FontAwesomeIcon icon={faStar} /> Évaluation et Feedback
          </Link>
        </li>
        <li>
          <Link to="/coachs/gestion-paiements">
            <FontAwesomeIcon icon={faDollarSign} /> Gestion des Paiements
          </Link>
        </li>
        <li>
          <Link to="/coachs/statistiques">
            <FontAwesomeIcon icon={faChartBar} /> Gestion des coachings
          </Link>
        </li>
        <li>
          <Link to="/coachs/promotions">
            <FontAwesomeIcon icon={faTags} /> Promotions et Offres
          </Link>
        </li>
        <li>
          <Link to="/coachs/ressources">
            <FontAwesomeIcon icon={faFileAlt} /> Ressources et Contenus
          </Link>
        </li>
        <li>
          <Link to="/coachs/notifications">
            <FontAwesomeIcon icon={faBell} /> Gestion des Notifications
          </Link>
        </li>
        <li>
          <Link to="/coachs/support">
            <FontAwesomeIcon icon={faCogs} /> Support et Assistance
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
