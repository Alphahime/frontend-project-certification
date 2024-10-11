import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import DemandeCoachingForm from './DemandeCoachingForm';
import './DemandeCoaching.css';

const DemandeCoaching = () => {
  const [demandeStatus, setDemandeStatus] = useState('');
  const navigate = useNavigate();

  const handleDemandeSubmit = (formData) => {
    const userId = localStorage.getItem('user_id'); // Récupérer l'ID utilisateur

    if (!userId || isNaN(userId)) {
      alert("L'ID utilisateur est invalide. Veuillez vous connecter.");
      return;
    }

    formData.append('user_id', userId); // Ajouter l'ID utilisateur aux données du formulaire

    fetch('http://127.0.0.1:8000/api/coaches', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Erreur lors de l'envoi de la demande: ${text}`);
          });
        }
        return response.json(); // Modifié pour retourner des données JSON
      })
      .then((data) => {
        console.log('Données retournées par le serveur:', data);
        setDemandeStatus('Votre demande a été transférée avec succès !');
      })
      .catch((error) => {
        setDemandeStatus(`Erreur lors de l'envoi de la demande: ${error.message}`);
      });
  };

  return (
    <div className="demande-coaching-body">
      <button className="back-button" onClick={() => navigate('/')}>
        &#8592; Retour
      </button>
      <div className="demande-coaching-container">
        <div className="demande-coaching-form-container">
          <h2 className="demande-coaching-title">Demande de Coaching</h2>
          <DemandeCoachingForm onSubmit={handleDemandeSubmit} />
          {demandeStatus && <p className="demande-coaching-popup-message">{demandeStatus}</p>}
        </div>
        <div className="demande-coaching-image-container">
          <div className="demande-coaching-image" />
        </div>
      </div>
    </div>
  );
};

export default DemandeCoaching;
