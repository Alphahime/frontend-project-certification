// src/components/Ressource/Ressource.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ressource = () => {
    const [ressources, setRessources] = useState([]);
    const [error, setError] = useState(null); // État pour gérer les erreurs

    useEffect(() => {
        const fetchRessources = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ressources');
                setRessources(response.data.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des ressources', error);
                setError(error); // Enregistrer l'erreur dans l'état
            }
        };

        fetchRessources();
    }, []);

    return (
        <div>
            <h1>Ressources</h1>
            <div className="banner">
                <h2>Bienvenue sur la page des ressources</h2>
            </div>
            {error && <p style={{ color: 'red' }}>Erreur de chargement des ressources.</p>} {/* Message d'erreur */}
            <ul>
                {ressources.map((ressource) => (
                    <li key={ressource.id}>
                        <h3>{ressource.titre}</h3>
                        <p>{ressource.description}</p>
                        <a href={ressource.lien} target="_blank" rel="noopener noreferrer">Voir plus</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ressource;
