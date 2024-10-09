import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecetteDetail.css';

const RecetteDetail = () => {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les détails d'une recette par son ID
  const fetchRecetteDetail = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/plans-nutritionnels/${id}`);
      setRecette(response.data);
    } catch (error) {
      setError(error);
      console.error('Erreur lors de la récupération de la recette:', error);
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour charger les détails de la recette lors du montage du composant
  useEffect(() => {
    fetchRecetteDetail();
  }, [id]);

  // Si les données sont en cours de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  const parseJSONSafely = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Erreur de parsing JSON:', error);
      return []; // Retourne un tableau vide en cas d'erreur
    }
  };

  return (
    <div className="recette-detail-container">
      {recette ? (
        <>
          <h1>{recette.nom}</h1>
          <img src={recette.image} alt={recette.nom} className="recette-detail-image" />
          <p><strong>Description:</strong> {recette.description}</p>
          <p><strong>Type d'Alimentation:</strong> {recette.type_alimentation}</p>
          <p><strong>Calories Totales:</strong> {recette.calories_totale}</p>
          <p>
            <strong>Ingrédients:</strong> 
            {Array.isArray(parseJSONSafely(recette.ingredients)) ? 
              parseJSONSafely(recette.ingredients).join(', ') : 'Aucun ingrédient'}
          </p>
          <p>
            <strong>Étapes:</strong> 
            {Array.isArray(parseJSONSafely(recette.etapes)) ? 
              parseJSONSafely(recette.etapes).join(', ') : 'Aucune étape'}
          </p>
        </>
      ) : (
        <div>Recette non trouvée.</div>
      )}
    </div>
  );
};

export default RecetteDetail;
