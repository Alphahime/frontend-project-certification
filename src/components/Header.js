import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        {/* Logo Placeholder */}
        <div className="logo-placeholder" />
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/programmes-entrainement">Programmes</Link> {/* Redirige vers /programmes-entrainement */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/coaches">Coachs</Link> {/* Redirige vers /coaches */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/recettes">Recettes</Link> {/* Redirige vers /recettes */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blog">Blog</Link> {/* Redirige vers /blog */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link> {/* Redirige vers /contact (ajoutez cette route si nécessaire) */}
          </li>
        </ul>
      </div>
      <Link to="/demande-coaching" className='devenir-coach'>Devenir Coach</Link> {/* Redirige vers /demande-coaching */}
    </nav>
  );
}

export default Header;
