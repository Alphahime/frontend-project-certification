import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SeanceEntrainement.css';

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
        <div className="container">
            <h1>Seances d'Entrainement</h1>
            <div className="seance-list">
                {seances.map(seance => (
                    <div 
                        key={seance.id} 
                        className="seance-card" 
                        onClick={() => handleSeanceClick(seance)} 
                        style={{ cursor: 'pointer' }}>
                        <h2>{seance.nom}</h2>
                        <p>{seance.description}</p>
                        <p>Durée: {seance.duree}</p>
                    </div>
                ))}
            </div>

            {selectedSeance && (
                <div className="selected-seance">
                    <h2>Détails de la Séance</h2>
                    <img src={selectedSeance.imageUrl} alt={selectedSeance.nom} className="seance-image" />
                    <div className="chrono-container">
                        <h3>Chronomètre: {time}s</h3>
                        <div className="chrono-controls">
                            <button onClick={handlePause}>{isActive ? 'Pause' : 'Reprendre'}</button>
                            <button onClick={handleReset}>Réinitialiser</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeanceEntrainement;
