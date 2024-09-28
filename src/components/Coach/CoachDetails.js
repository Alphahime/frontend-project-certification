import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import JitsiVideoCall from '../JitsiVideoCall'; 
import './CoachList.css'; 
import ChatBoard from '../ChatBoard'; // Assure-toi que ChatBoard est bien importé

const CoachDetails = () => {
    const { id } = useParams();
    const [coach, setCoach] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // État pour gérer l'affichage de l'appel vidéo
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [roomName, setRoomName] = useState('');
    
    // État pour gérer l'affichage du chatboard
    const [showChatBoard, setShowChatBoard] = useState(false);

    // Fonction pour démarrer l'appel vidéo
    const handleStartVideoCall = () => {
        setRoomName(`coach-${Date.now()}`); 
        setShowVideoCall(true); 
    };

    // Fonction pour afficher le chat
    const handleShowChatBoard = () => {
        setShowChatBoard(true);
    };

    useEffect(() => {
        const fetchCoachDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/coaches/${id}`);
                setCoach(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCoachDetails();
    }, [id]);

    if (loading) return <p>Chargement des détails du coach...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            {/* Banner */}
            {coach && (
                <div className="banner-coach-details">
                    <div className="banner-right">
                        <img
                            className="coach-profile-photo"
                            src={coach.profile_photo_url}
                            alt=""
                        />
                        <p>Coach sportif</p>
                    </div>
                    <div className="banner-left">
                        <div className="validation-icon">
                            <i className="fas fa-check-circle"></i> {/* Font Awesome icon */}
                        </div>
                        <h1>Coach expérimenté</h1>
                        <div className="validation-icon">
                            <i className="fas fa-check-circle"></i> {/* Font Awesome icon */}
                        </div>
                        <h1>Profil et diplômes vérifiés</h1>
                        <button onClick={handleShowChatBoard} className="send-message-button">Envoyer un message</button>
                    </div>
                </div>
            )}

            {/* Main content with details */}
            <div className="coach-details-container">
                <div className="details-grid">
                    {/* Services Section */}
                    <div className="details-card">
                        <h4>Services</h4>
                        {coach.services && Object.entries(JSON.parse(coach.services)).map(([service, details], index) => (
                            <div key={index}>
                                <p><strong>{service}</strong></p>
                                <p>Tarif : {details.tarif} FCFA</p>
                                <p>Durée : {details.duree}</p>
                                <p>Nombre de personnes : {details.nombre_personnes}</p>
                                <p>Endroit : {details.endroit}</p>
                            </div>
                        ))}
                    </div>

                    {/* Diplomas Section */}
                    <div className="details-card">
                        <h4>Diplômes</h4>
                        {coach.diplomes && JSON.parse(coach.diplomes).map((diplome, index) => (
                            <div key={index}>
                                <p><strong>{diplome.diplome}</strong> - {diplome.institution} ({diplome.date_obtention})</p>
                            </div>
                        ))}
                    </div>

                    {/* Availability Section */}
                    <div className="details-card">
                        <h4>Disponibilités</h4>
                        {coach.disponibilites && Object.entries(JSON.parse(coach.disponibilites)).map(([jour, horaires], index) => (
                            <div key={index}>
                                <p>{jour} : {horaires}</p>
                            </div>
                        ))}
                    </div>

                    {/* Location Section */}
                    <div className="details-card">
                        <h4>Lieu</h4>
                        <p>{coach.lieu}</p>

                        {/* Ajouter le bouton pour démarrer l'appel vidéo */}
                        <button onClick={handleStartVideoCall} className="start-video-call-button">
                            Démarrer un appel vidéo
                        </button>

                        {/* Affichage de l'appel vidéo */}
                        {showVideoCall && <JitsiVideoCall roomName={roomName} />}
                    </div>
                </div>
            </div>

            {/* Affichage du ChatBoard */}
            {showChatBoard && <ChatBoard coachId={id} />}
        </div>
    );
};

export default CoachDetails;
