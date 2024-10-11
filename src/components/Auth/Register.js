import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [motDePasseConfirmation, setMotDePasseConfirmation] = useState('');
  const [telephone, setTelephone] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [role, setRole] = useState('client'); // Rôle par défaut
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Vérification de la confirmation du mot de passe
    if (motDePasse !== motDePasseConfirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nom, 
          prenom, 
          email, 
          mot_de_passe: motDePasse,
          mot_de_passe_confirmation: motDePasseConfirmation, 
          telephone, 
          localisation,
          role 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login'); 
        // Redirection vers la page de connexion après l'inscription
      } else {
        setError(data.error ? data.error : 'Erreur d\'inscription.'); 
        //  à jour le message d'erreur
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.'); 
      // Gestion l'erreur de connexion
    }
  };

  return (
    <div className="register-container">
   
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister} className="formulaire-inscription">
        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="nom">Nom:</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-groups">
            <label htmlFor="prenom">Prénom:</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-groups">
            <label htmlFor="mot_de_passe">Mot de passe:</label>
            <input
              type="password"
              id="mot_de_passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="mot_de_passe_confirmation">Confirmer le mot de passe:</label>
            <input
              type="password"
              id="mot_de_passe_confirmation"
              value={motDePasseConfirmation}
              onChange={(e) => setMotDePasseConfirmation(e.target.value)}
              required
            />
          </div>
          <div className="form-groups">
            <label htmlFor="telephone">Téléphone:</label>
            <input
              type="text"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="localisation">Localisation:</label>
            <input
              type="text"
              id="localisation"
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
              required
            />
          </div>
         
        </div>
        <button type="submit" className="register-button">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
