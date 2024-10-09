import React, { useState } from 'react';
import './DemandeCoaching.css';

const DemandeCoachingForm = ({ onSubmit }) => {
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [services, setServices] = useState('');
  const [galeriePhotos, setGaleriePhotos] = useState([]);
  const [diplomes, setDiplomes] = useState('');
  const [disponibilites, setDisponibilites] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('user_id', 1); 
    formData.append('profil_verifie', '1');
    formData.append('experience', experience);
    formData.append('description', description);
    formData.append('lieu', lieu);
    formData.append('services', services);
    formData.append('diplomes', diplomes);
    formData.append('disponibilites', disponibilites);

    Array.from(galeriePhotos).forEach((file, index) => {
      formData.append(`galerie_photos[${index}]`, file);
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="demande-coaching-label">Expérience:</label>
        <input type="text" className="demande-coaching-input" value={experience} onChange={(e) => setExperience(e.target.value)} />
      </div>
      <div>
        <label className="demande-coaching-label">Description:</label>
        <textarea className="demande-coaching-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="demande-coaching-label">Lieu:</label>
        <input type="text" className="demande-coaching-input" value={lieu} onChange={(e) => setLieu(e.target.value)} />
      </div>
      <div>
        <label className="demande-coaching-label">Services:</label>
        <input
          type="text"
          className="demande-coaching-input"
          placeholder="Services (séparés par des virgules)"
          value={services}
          onChange={(e) => setServices(e.target.value)}
        />
      </div>
      <div>
        <label className="demande-coaching-label">Diplômes:</label>
        <input
          type="text"
          className="demande-coaching-input"
          placeholder="Diplômes (séparés par des virgules)"
          value={diplomes}
          onChange={(e) => setDiplomes(e.target.value)}
        />
      </div>
      <div>
        <label className="demande-coaching-label">Disponibilités:</label>
        <input
          type="text"
          className="demande-coaching-input"
          placeholder="Disponibilités (séparés par des virgules)"
          value={disponibilites}
          onChange={(e) => setDisponibilites(e.target.value)}
        />
      </div>
      <div>
        <label className="demande-coaching-label">Galerie de Photos:</label>
        <input
          type="file"
          className="demande-coaching-input"
          multiple
          onChange={(e) => setGaleriePhotos([...e.target.files])}
        />
      </div>
      <button type="submit" className="demande-coaching-button">Envoyer la demande</button>
    </form>
  );
};

export default DemandeCoachingForm;
