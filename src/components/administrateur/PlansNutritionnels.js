import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './PlansNutritionnels.css';

const PlansNutritionnels = () => {
  const [recettes, setRecettes] = useState([]);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newRecette, setNewRecette] = useState({
    nom: '',
    description: '',
    type_alimentation: '',
    calories_totale: '',
    ingredients: '',
    etapes: '',
    image: '',
  });

  // Fonction pour récupérer les recettes depuis l'API Laravel
  const fetchRecettes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/plans-nutritionnels');
      setRecettes(response.data);

      const initialLikes = {};
      response.data.forEach((recette) => {
        initialLikes[recette.id] = 0;
      });
      setLikes(initialLikes);
    } catch (error) {
      setError(error);
      console.error('Erreur lors de la récupération des recettes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour charger les recettes lors du montage du composant
  useEffect(() => {
    fetchRecettes();
  }, []);

  // Gestion des likes
  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] + 1,
    }));
  };

  // Toggle pour afficher/masquer le formulaire d'ajout
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecette((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire pour ajouter une nouvelle recette
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Conversion des ingrédients et étapes en JSON avant d'envoyer à l'API
      const recetteAvecJSON = {
        ...newRecette,
        ingredients: JSON.stringify(newRecette.ingredients.split(',')),
        etapes: JSON.stringify(newRecette.etapes.split(',')),
      };

      await axios.post('http://127.0.0.1:8000/api/plans-nutritionnels', recetteAvecJSON);

      // Réinitialisation du formulaire après soumission
      setNewRecette({
        nom: '',
        description: '',
        type_alimentation: '',
        calories_totale: '',
        ingredients: '',
        etapes: '',
        image: '',
      });

      toggleForm(); // Fermer le formulaire
      fetchRecettes(); // Mettre à jour les recettes après ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
    }
  };

  // Si les données sont en cours de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si une erreur s'est produite lors du chargement des données
  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  // Filtrer les recettes en fonction du terme de recherche
  const filteredRecettes = recettes.filter((recette) =>
    recette.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Gestion des Recettes</h1>

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-bar"
        />

        {/* Bouton pour ajouter une recette */}
        <button className="add-recipe-btn" onClick={toggleForm}>
          Ajouter Recette
        </button>

        {/* Formulaire pour ajouter une nouvelle recette */}
        {showForm && (
          <div className="popup-form">
            <div className="form-content">
              <h2>Ajouter une Recette</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Nom de la Recette:
                  <input type="text" name="nom" value={newRecette.nom} onChange={handleChange} required />
                </label>
                <label>
                  Description:
                  <textarea name="description" value={newRecette.description} onChange={handleChange} required></textarea>
                </label>
                <label>
                  Type d'Alimentation:
                  <input type="text" name="type_alimentation" value={newRecette.type_alimentation} onChange={handleChange} required />
                </label>
                <label>
                  Calories Totales:
                  <input type="number" name="calories_totale" value={newRecette.calories_totale} onChange={handleChange} required />
                </label>
                <label>
                  Ingrédients (séparés par des virgules):
                  <input type="text" name="ingredients" value={newRecette.ingredients} onChange={handleChange} />
                </label>
                <label>
                  Étapes (séparées par des virgules):
                  <input type="text" name="etapes" value={newRecette.etapes} onChange={handleChange} />
                </label>
                <label>
                  Image URL:
                  <input type="text" name="image" value={newRecette.image} onChange={handleChange} />
                </label>
                <button type="submit">Ajouter</button>
              </form>
              <button className="close-form-btn" onClick={toggleForm}>Fermer</button>
            </div>
          </div>
        )}

        {/* Liste des recettes filtrées */}
        <div className="admin-recette-cards">
          {filteredRecettes.map((recette) => (
            <div className="admin-recette-card" key={recette.id}>
              <img src={recette.image} alt={recette.nom} className="admin-recette-image" />
              <h2>{recette.nom}</h2>
              <p>{recette.description}</p>
              <p>Type: {recette.type_alimentation}</p>
              <p>Calories: {recette.calories_totale}</p>
              <p>
                Ingrédients: {recette.ingredients ? JSON.parse(recette.ingredients).join(', ') : 'Aucun ingrédient'}
              </p>
              <p>
                Étapes: {recette.etapes ? JSON.parse(recette.etapes).join(', ') : 'Aucune étape'}
              </p>

              {/* Gestion des likes */}
              <div className="likes-section">
                <FaHeart className="heart-icon" onClick={() => handleLike(recette.id)} />
                <span>{likes[recette.id]} J'aime</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansNutritionnels;
