import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDumbbell, faUsers, faNewspaper, faUserShield } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import logo from '../../assets/images/logo.png'; // Ajustez le chemin selon votre structure de projet

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <Link to="/administrateur/coaches">
              <FontAwesomeIcon icon={faUser} className="icon" /> Coaches
            </Link>
          </li>
         <li>
  <Link to="/administrateur/programmes-entrainement">
    <FontAwesomeIcon icon={faDumbbell} className="icon" /> Programmes
  </Link>
</li>
          <li>
            <Link to="/administrateur/plans-nutritionnels">
              <FontAwesomeIcon icon={faDumbbell} className="icon" /> Recettes
            </Link>
          </li>
          <li>
            <Link to="/administrateur/utilisateurs">
              <FontAwesomeIcon icon={faUsers} className="icon" /> Utilisateurs
            </Link>
          </li>
          <li>
            <Link to="/administrateur/articles">
              <FontAwesomeIcon icon={faNewspaper} className="icon" /> Articles
            </Link>
          </li>
          <li>
            <Link to="/administrateur/roles">
              <FontAwesomeIcon icon={faUserShield} className="icon" /> Rôles
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
