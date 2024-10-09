import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      console.log('Token JWT:', data.token);
     
    
      navigate('/demande-coaching'); 

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2> {/* Title at the top of the form */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="mot_de_passe"
            placeholder="Mot de passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            required
          />
          <button type="submit">Se connecter</button>

          {/* Link to Registration Page at the bottom of the form */}
          <div className="register-redirect">
            <p>Vous n'avez pas de compte ? 
              <span 
                className="register-link" 
                onClick={() => navigate('/register')} 
              >
                S'inscrire
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
