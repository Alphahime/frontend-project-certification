import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './ProgrammeEntrainement.css';

const ProgrammeList = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/programme-entrainements');
        setProgrammes(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des programmes.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleVoirSeance = (programmeId) => {
    navigate(`/programmes-entrainement/${programmeId}`); 
  };

  return (
    <div className="programme-list">
      <h2>Liste des Programmes d'Entraînement</h2>
      <ul>
        {programmes.map((programme) => (
          <li key={programme.id} className="programme-item">
            <h3>{programme.nom}</h3>
            {/* Affichage de l'image */}
            {programme.images && (
              <img 
                src={programme.images} 
                alt={programme.nom} 
                className="programme-image" 
              />
            )}
            <p>{programme.description}</p>
            <p><strong>Durée:</strong> {programme.duree}</p>
            <p><strong>Fréquence:</strong> {programme.frequence}</p>
            <p><strong>Niveau de difficulté:</strong> {programme.niveau_difficulte}</p>
            <p><strong>Type:</strong> {programme.type_programme}</p>
            <p><strong>Status:</strong> {programme.status}</p>
            <button onClick={() => handleVoirSeance(programme.id)}>Voir Séance</button> {/* Bouton pour voir la séance */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgrammeList;
