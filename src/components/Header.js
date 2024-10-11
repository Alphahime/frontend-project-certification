import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin est correct
import './Header.css';

const Header = () => {
  const { user } = useAuth(); // Récupère l'utilisateur connecté
  const navigate = useNavigate();

  const handleDevenirCoachClick = () => {
    if (user) {
      navigate('/demande-coaching'); // Redirige directement vers le formulaire de demande de coaching si l'utilisateur est connecté
    } else {
      navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        {/* Placeholder pour le logo */}
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
      {/* Redirige vers /demande-coaching si connecté, sinon vers /login */}
      <button className="devenir-coach" onClick={handleDevenirCoachClick}>
        Devenir Coach
      </button>
    </nav>
  );
}

export default Header;
