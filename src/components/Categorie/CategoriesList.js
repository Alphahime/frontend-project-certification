import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoriesList.css'; // Import du fichier CSS

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // État pour la catégorie sélectionnée

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories'); 
                setCategories(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error.message}</div>;

    return (
        <div className="categories-container">
         
            {categories.map((category) => (
                <div key={category.id} className="category-card" onClick={() => setSelectedCategory(category)}>
                    <h2 className="category-title">{category.nom}</h2>
                    <p>{category.description}</p>
                </div>
            ))}

           
            {selectedCategory && (
                <div className="programs-container">
                    <h3>Programmes d'Entraînement pour {selectedCategory.nom}</h3>
                    {selectedCategory.programme_entrainements.length > 0 ? (
                        selectedCategory.programme_entrainements.map((programme) => (
                            <div key={programme.id} className="program-card">
                                <h4 className="program-title">{programme.nom}</h4>
                                <p className="program-details">{programme.description}</p>
                                <p className="program-details"><strong>Durée:</strong> {programme.duree}</p>
                                <p className="program-details"><strong>Fréquence:</strong> {programme.frequence}</p>
                                <p className="program-details"><strong>Niveau de difficulté:</strong> {programme.niveau_difficulte}</p>
                                <p className="program-details"><strong>Type de programme:</strong> {programme.type_programme}</p>

                                {/* Affichage des séances d'entraînement pour ce programme */}
                                <div className="seances-container">
                                    <h4>Sessions d'Entraînement</h4>
                                    {programme.seances && programme.seances.length > 0 ? (
                                        programme.seances.map((seance) => (
                                            <div key={seance.id} className="seance-card">
                                                <h5 className="seance-title">{seance.nom}</h5>
                                                <p className="seance-details">{seance.description}</p>
                                                <p className="seance-details"><strong>Durée:</strong> {seance.duree}</p>
                                                <p className="seance-details"><strong>Chronomètre:</strong> {seance.chronometre}</p>
                                                <p className="seance-details"><strong>Ordre:</strong> {seance.ordre}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Aucune séance d'entraînement disponible.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun programme d'entraînement disponible.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoriesList;
