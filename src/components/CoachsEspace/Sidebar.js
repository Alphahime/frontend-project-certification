// src/components/CoachsEspace/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDumbbell, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
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
          <Link to="/coachs/gestion-reservations">
            <FontAwesomeIcon icon={faCalendarAlt} /> Gestion des Réservations
          </Link>
        </li>
        <li>
          <Link to="/coachs/gestion-programmes">
            <FontAwesomeIcon icon={faDumbbell} /> Gestion des Programmes
          </Link>
        </li>
        <li>
          <Link to="/coachs/gestion-messages">
            <FontAwesomeIcon icon={faEnvelope} /> Gestion des Messages
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
