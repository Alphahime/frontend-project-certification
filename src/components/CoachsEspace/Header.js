// src/components/CoachsEspace/Header.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Header = ({ userName }) => {
  return (
    <div className="header">
      <div className="header-content">
        <FontAwesomeIcon icon={faBell} className="notification-icon" />
        <span className="user-name">{userName}</span>
      </div>
    </div>
  );
};

export default Header;
