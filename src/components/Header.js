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
            <Link className="nav-link" to="/programmes">Programmes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/coachs">Coachs</Link>
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
      <button className='devenir-coach'>Devenir Coach</button>
    </nav>
  );
}

export default Header;
