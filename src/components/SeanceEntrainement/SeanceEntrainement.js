import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeanceEntrainement = () => {
    const [seances, setSeances] = useState([]); // État pour stocker les séances
    const [loading, setLoading] = useState(true); // État de chargement
    const [error, setError] = useState(null); // État d'erreur
    const [selectedSeance, setSelectedSeance] = useState(null); // Séance sélectionnée
    const [isActive, setIsActive] = useState(false); // État pour savoir si le chronomètre est actif
    const [time, setTime] = useState(0); // Temps écoulé
    const [intervalId, setIntervalId] = useState(null); // ID de l'intervalle

    // Fonction pour récupérer les séances d'entraînement
    const fetchSeances = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/seance-entrainements');
            setSeances(response.data); // Stocker les données dans l'état
        } catch (err) {
            setError(err.message); // Capturer les erreurs
        } finally {
            setLoading(false); // Mettre à jour l'état de chargement
        }
    };

    // Utilisation de useEffect pour récupérer les données au chargement du composant
    useEffect(() => {
        fetchSeances();
    }, []);

    // Gestion du chronomètre
    const handleStart = () => {
        setIsActive(true);
        const id = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        setIntervalId(id);
    };

    const handlePause = () => {
        setIsActive(false);
        clearInterval(intervalId);
    };

    const handleReset = () => {
        setIsActive(false);
        clearInterval(intervalId);
        setTime(0);
    };

    const handleSeanceClick = (seance) => {
        setSelectedSeance(seance); // Définir la séance sélectionnée
        handleStart(); // Démarrer le chronomètre
    };

    // Affichage du composant
    if (loading) return <p>Chargement des séances...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div>
            <h1>Seances d'Entrainement</h1>
            <ul>
                {seances.map(seance => (
                    <li key={seance.id} onClick={() => handleSeanceClick(seance)} style={{ cursor: 'pointer' }}>
                        <h2>{seance.nom}</h2>
                        <p>{seance.description}</p>
                        <p>Durée: {seance.duree}</p>
                    </li>
                ))}
            </ul>

            {selectedSeance && (
                <div>
                    <h2>Détails de la Séance</h2>
                    <img src={selectedSeance.imageUrl} alt={selectedSeance.nom} style={{ maxWidth: '100%', height: 'auto' }} />
                    <div>
                        <h3>Chronomètre: {time}s</h3>
                        <button onClick={handlePause}>{isActive ? 'Pause' : 'Reprendre'}</button>
                        <button onClick={handleReset}>Réinitialiser</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeanceEntrainement;
