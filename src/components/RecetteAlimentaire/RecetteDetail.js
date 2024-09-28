import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecetteDetail.css';

const RecetteDetail = () => {
    const { id } = useParams();
    const [recette, setRecette] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecetteDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/recettes/${id}`);
                setRecette(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRecetteDetail();
    }, [id]);

    if (loading) return <p>Chargement des détails de la recette...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="recette-detail">
            {recette && (
                <>
                    <h1>{recette.nom}</h1>
                    <p>{recette.description}</p>
                    <p>Type d'alimentation : {recette.type_alimentation}</p>
                    <p>Calories : {recette.calories_totale}</p>
                </>
            )}
        </div>
    );
};

export default RecetteDetail;
