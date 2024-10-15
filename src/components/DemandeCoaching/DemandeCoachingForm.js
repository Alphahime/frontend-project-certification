import React, { useState } from 'react';
import './DemandeCoaching.css';

const DemandeCoachingForm = ({ onSubmit }) => {
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [lieu, setLieu] = useState('');
  const [services, setServices] = useState('');
  const [galeriePhotos, setGaleriePhotos] = useState([]);
  const [diplomes, setDiplomes] = useState('');
  const [jourDebut, setJourDebut] = useState('lundi');
  const [jourFin, setJourFin] = useState('vendredi');
  const [heureDebut, setHeureDebut] = useState('09:00');
  const [heureFin, setHeureFin] = useState('17:00');
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
    formData.append('disponibilites', `Du ${jourDebut} au ${jourFin} de ${heureDebut} à ${heureFin}`); // Intervalle de disponibilités
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
      <div>
        <label htmlFor="jourDebut">Du :</label>
        <select
          id="jourDebut"
          value={jourDebut}
          onChange={(e) => setJourDebut(e.target.value)}
        >
          <option value="lundi">Lundi</option>
          <option value="mardi">Mardi</option>
          <option value="mercredi">Mercredi</option>
          <option value="jeudi">Jeudi</option>
          <option value="vendredi">Vendredi</option>
          <option value="samedi">Samedi</option>
          <option value="dimanche">Dimanche</option>
        </select>
        <label htmlFor="jourFin">Au :</label>
        <select
          id="jourFin"
          value={jourFin}
          onChange={(e) => setJourFin(e.target.value)}
        >
          <option value="lundi">Lundi</option>
          <option value="mardi">Mardi</option>
          <option value="mercredi">Mercredi</option>
          <option value="jeudi">Jeudi</option>
          <option value="vendredi">Vendredi</option>
          <option value="samedi">Samedi</option>
          <option value="dimanche">Dimanche</option>
        </select>
        <label htmlFor="heureDebut">De :</label>
        <input
          type="time"
          id="heureDebut"
          value={heureDebut}
          onChange={(e) => setHeureDebut(e.target.value)}
        />
        <label htmlFor="heureFin">À :</label>
        <input
          type="time"
          id="heureFin"
          value={heureFin}
          onChange={(e) => setHeureFin(e.target.value)}
        />
      </div>
      
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
