import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecetteDetail.css';
import Header from '../Header'; 
import Footer from '../Footer'; 
const RecetteDetail = () => {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchRecetteDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="recette-detail">
        <Header />
      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1>{recette.nom}</h1>
        </div>
      </div>
      <div className="ingredients-section">
        <strong>Ingrédients:</strong>
        <ul className="ingredients-list">
          {recette.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <img src={recette.image} alt={recette.nom} />
      <div className="etapes-section">
        <strong>Étapes:</strong>
        <ol className="etapes-list">
          {recette.etapes.map((etape, index) => (
            <li key={index}>{etape}</li>
          ))}
        </ol>
      </div>
      <div className="recette-info">
        <p><strong>Description:</strong> {recette.description}</p>
        <p><strong>Type d'Alimentation:</strong> {recette.type_alimentation}</p>
        <p><strong>Calories Totales:</strong> {recette.calories_totale}</p>
      </div>
      <Footer />
    </div>
  );
};

export default RecetteDetail;
