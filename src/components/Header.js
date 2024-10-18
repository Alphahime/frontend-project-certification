import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const handleDevenirCoachClick = () => {
    if (user) {
      navigate('/demande-coaching');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='contain-navbar'>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <div className="logo-placeholder" />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/programmes-entrainement">Programmes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coaches">Coachs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recettes">Recettes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <button className="devenir-coach" onClick={handleDevenirCoachClick}>
          Devenir Coach
        </button>
      </nav>
    </div>
  );
}

export default Header;
