import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProgrammeEntrainement.css';

const ProgrammeEntrainementDetail = () => {
  const { id } = useParams();
  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProgrammeDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/programme-entrainements/${id}`);
        setProgramme(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des détails du programme.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammeDetails();
  }, [id]);

  if (loading) {
    return <p className="loading">Chargement en cours...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  // Function to handle button click
  const handleFollowProgram = () => {
    // Redirect to the performance page
    navigate('/performance');
  };

  return (
    <div className="programme-detail">
      {programme && (
        <>
          {programme.images && (
            <img
              src={programme.images} 
              alt={programme.nom}
            />
          )}
          <h2>{programme.nom}</h2>
          <p><strong>Description:</strong> {programme.description}</p>
          <p><strong>Durée:</strong> {programme.duree}</p>
          <p><strong>Fréquence:</strong> {programme.frequence}</p>
          <p><strong>Niveau de difficulté:</strong> {programme.niveau_difficulte}</p>
          <p><strong>Status:</strong> {programme.status}</p>
          <p><strong>Type de programme:</strong> {programme.type_programme}</p>
          <p><strong>Date de création:</strong> {programme.date_creation}</p>
          <p><strong>Date de mise à jour:</strong> {programme.date_mise_a_jour}</p>
          <p><strong>Catégorie ID:</strong> {programme.categorie_id}</p>
          <p><strong>Domaine Sportif ID:</strong> {programme.domaine_sportif_id}</p>
          
        
          <button onClick={handleFollowProgram} className="follow-button">
            Suivre ce programme
          </button>
        </>
      )}
    </div>
  );
};

export default ProgrammeEntrainementDetail;
