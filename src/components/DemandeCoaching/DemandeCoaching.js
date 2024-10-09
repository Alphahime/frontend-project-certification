import React, { useState } from 'react';
import DemandeCoachingForm from './DemandeCoachingForm';
import './DemandeCoaching.css';

const DemandeCoaching = () => {
  const [demandeStatus, setDemandeStatus] = useState('');

  const handleDemandeSubmit = (formData) => {
    fetch('http://127.0.0.1:8000/api/coaches', {
      method: 'POST',
      headers: {
    
        'Accept': 'application/json',
      },
      body: formData, 
    })
      .then((response) => {
        return response.text().then((text) => {
          console.log('Réponse brute du serveur:', text); 

          if (!response.ok) {
            throw new Error(`Erreur lors de l'envoi de la demande: ${text}`);
          }
          return JSON.parse(text);
        });
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
