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
  const [profilVerifie, setProfilVerifie] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('user_id'); 
    if (!userId || isNaN(userId)) {
      alert("L'ID utilisateur est invalide. Veuillez vous connecter.");
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('experience', experience);
    formData.append('description', description);
    formData.append('lieu', lieu);
    formData.append('services', services);

    // Convertir galeriePhotos en une chaîne JSON avant de l'ajouter à FormData
    if (galeriePhotos.length > 0) {
      formData.append('galerie_photos', JSON.stringify(galeriePhotos)); 
    } else {
      formData.append('galerie_photos', null); // Ou une chaîne vide selon vos besoins
    }

    formData.append('diplomes', diplomes);
    formData.append('disponibilites', disponibilites);
    formData.append('profil_verifie', profilVerifie ? 1 : 0); // Convertir en entier (1 ou 0)

    onSubmit(formData);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setGaleriePhotos(files);
  };

  const handleCheckboxChange = (e) => {
    setProfilVerifie(e.target.checked);
  };

  return (
    <form onSubmit={handleSubmit} className="demande-coaching-form">
      <label htmlFor="experience">Expérience :</label>
      <input
        type="text"
        id="experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />
      
      <label htmlFor="description">Description :</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      
      <label htmlFor="lieu">Lieu :</label>
      <input
        type="text"
        id="lieu"
        value={lieu}
        onChange={(e) => setLieu(e.target.value)}
        required
      />
      
      <label htmlFor="services">Services :</label>
      <input
        type="text"
        id="services"
        value={services}
        onChange={(e) => setServices(e.target.value)}
        required
      />
      
      <label htmlFor="galerie_photos">Galerie de photos :</label>
      <input
        type="file"
        id="galerie_photos"
        multiple
        onChange={handleFileChange}
      />
      
      <label htmlFor="diplomes">Diplômes :</label>
      <input
        type="text"
        id="diplomes"
        value={diplomes}
        onChange={(e) => setDiplomes(e.target.value)}
        required
      />
      
      <label htmlFor="disponibilites">Disponibilités :</label>
      <input
        type="text"
        id="disponibilites"
        value={disponibilites}
        onChange={(e) => setDisponibilites(e.target.value)}
        required
      />
      
      <label htmlFor="profil_verifie">Profil Vérifié :</label>
      <input
        type="checkbox"
        id="profil_verifie"
        checked={profilVerifie}
        onChange={handleCheckboxChange}
      />
      
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default DemandeCoachingForm;
