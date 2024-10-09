import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    telephone: '',
    localisation: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mot_de_passe !== formData.mot_de_passe_confirmation) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      console.log('Données à envoyer:', formData);
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur d\'inscription:', errorData);
        throw new Error(`Erreur lors de l'inscription: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('Inscription réussie:', data);

      // Redirigez vers la page de connexion après inscription réussie
      navigate('/login'); // Change the URL path to '/login'
      
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="formulaire-inscription">
        <h2>Inscription</h2> {/* Title for registration */}
        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-groups">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="mot_de_passe">Mot de passe</label>
            <input
              type="password"
              name="mot_de_passe"
              id="mot_de_passe"
              placeholder="Mot de passe"
              value={formData.mot_de_passe}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-groups">
            <label htmlFor="mot_de_passe_confirmation">Confirmer le mot de passe</label>
            <input
              type="password"
              name="mot_de_passe_confirmation"
              id="mot_de_passe_confirmation"
              placeholder="Confirmer le mot de passe"
              value={formData.mot_de_passe_confirmation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="tel"
              name="telephone"
              id="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-rows">
          <div className="form-groups">
            <label htmlFor="localisation">Localisation</label>
            <input
              type="text"
              name="localisation"
              id="localisation"
              placeholder="Localisation"
              value={formData.localisation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="register-button">S'inscrire</button> {/* Use the same class for styling */}
      </form>
    </div>
  );
};

export default Register;
