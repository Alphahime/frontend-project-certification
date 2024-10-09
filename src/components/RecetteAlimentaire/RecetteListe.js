import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; 
import Header from '../Header'; 
import Footer from '../Footer'; 
import './RecetteListe.css';

const RecetteListe = () => {
    const [recettes, setRecettes] = useState([]);
    const [likedRecipes, setLikedRecipes] = useState(new Set()); // Use a Set to track liked recipes
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plans-nutritionnels');
                setRecettes(response.data);
            } catch (error) {
                setError(error);
                console.error('Erreur lors de la récupération des recettes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecettes();
    }, []);

    // Fonction pour gérer le clic sur l'icône "J'aime"
    const handleLike = (id) => {
        if (!likedRecipes.has(id)) { // Check if the recipe is already liked
            setLikedRecipes((prevLikes) => new Set(prevLikes).add(id)); // Add the recipe ID to the Set
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Erreur: {error.message}</div>;
    }

    // Filtrer les recettes en fonction du terme de recherche
    const filteredRecettes = recettes.filter(recette =>
        recette.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Header />
            
            <div className="recette-liste">
                <div className="banner">
                    <h1>Trouvez vos recettes</h1>
                </div>
                <input 
                    type="text" 
                    placeholder="Rechercher une recette..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-bar" 
                />
                <div className="recette-cards">
                    {filteredRecettes.map(recette => (
                        <div className="recette-card" key={recette.id}>
                            <img src={recette.image} alt={recette.nom} className="recette-image" />
                            <h2>{recette.nom}</h2>
                            <p>{recette.description}</p>
                            <p>Type d'alimentation: {recette.type_alimentation}</p>
                            <p>Calories Totales: {recette.calories_totale}</p>
                            
                            <div className="likes-section">
                                <FaHeart 
                                    className={`heart-icon ${likedRecipes.has(recette.id) ? 'liked' : ''}`} 
                                    onClick={() => handleLike(recette.id)} 
                                />
                                <span>{likedRecipes.has(recette.id) ? 'J\'aime' : 'Aimer'} </span>
                            </div>
                            
                            <Link to={`/recettes/${recette.id}`} className="lire-btn">Lire la recette</Link>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default RecetteListe;
