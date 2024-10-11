import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDumbbell, faUsers, faNewspaper, faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import logo from '../../assets/images/logo.png'; // Adjust the path according to your project structure

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="sidebar-admin">
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
            <Link to="/administrateur/roles-permissions">
              <FontAwesomeIcon icon={faUserShield} className="icon" /> Rôles
            </Link>
          </li>
        </ul>
      </nav>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Deconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
