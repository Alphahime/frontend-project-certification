import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-title">À propos de nous</h2>
          <p>Nous sommes dédiés à fournir du contenu de qualité sur le sport et le bien être.</p>
        </div>
        <div className="footer-section links">
          <h2 className="footer-title">Liens rapides</h2>
          <ul>
            <li><a href="/about">À propos</a></li>
            <li><a href="/programmes">Programmes</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2 className="footer-title">Nous contacter</h2>
          <p>Email: info@alflux.com</p>
          <p>Téléphone: 77 675 48 07</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 alflux | Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default Footer;
