import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecetteListe.css';

const RecetteListe = () => {
    const [recettes, setRecettes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Erreur: {error.message}</div>;
    }

    return (
        <div className="recette-liste">
            <h1>Liste des Recettes</h1>
            <ul>
                {recettes.map(recette => (
                    <li key={recette.id}>
                        <h2>{recette.nom}</h2>
                        <p>{recette.description}</p>
                        <p>Type d'alimentation: {recette.type_alimentation}</p>
                        <p>Calories Totales: {recette.calories_totale}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecetteListe;
