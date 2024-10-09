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
        <label>Expérience:</label>
        <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Lieu:</label>
        <input type="text" value={lieu} onChange={(e) => setLieu(e.target.value)} />
      </div>
      <div>
        <label>Services:</label>
        <input
          type="text"
          placeholder="Services (séparés par des virgules)"
          value={services}
          onChange={(e) => setServices(e.target.value)}
        />
      </div>
      <div>
        <label>Diplômes:</label>
        <input
          type="text"
          placeholder="Diplômes (séparés par des virgules)"
          value={diplomes}
          onChange={(e) => setDiplomes(e.target.value)}
        />
      </div>
      <div>
        <label>Disponibilités:</label>
        <input
          type="text"
          placeholder="Disponibilités (séparés par des virgules)"
          value={disponibilites}
          onChange={(e) => setDisponibilites(e.target.value)}
        />
      </div>
      <div>
        <label>Galerie de Photos:</label>
        <input
          type="file"
          multiple
          onChange={(e) => setGaleriePhotos([...e.target.files])}
        />
      </div>
      <button type="submit">Envoyer la demande</button>
    </form>
  );
};

export default DemandeCoachingForm;
