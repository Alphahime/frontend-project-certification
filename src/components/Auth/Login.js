import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_role', data.role); 

      
        switch (data.role) {
          case 'super admin':
            navigate('/administrateur/coaches');
            break;
          case 'coach':
            navigate('/coachs');
            break;
          case 'client':
            navigate('/demande-coaching'); 
            break;
          default:
            navigate('/');
        }
      } else {
        setError(data.message || 'Erreur de connexion.');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="mot_de_passe">Mot de passe:</label>
            <input
              type="password"
              id="mot_de_passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <div className="register-redirect">
          <p>Pas encore inscrit? <span className="register-link" onClick={() => navigate('/register')}>S'inscrire ici</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
