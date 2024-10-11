import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import JitsiVideoCall from '../JitsiVideoCall'; 
import './CoachList.css'; 
import ChatBoard from '../ChatBoard'; 
import Header from '../Header'; 
import Footer from '../Footer'; 

const CoachDetails = () => {
    const { id } = useParams();
    const [coach, setCoach] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [showChatBoard, setShowChatBoard] = useState(false);

    const handleStartVideoCall = () => {
        setRoomName(`coach-${Date.now()}`); 
        setShowVideoCall(true); 
    };

    const handleShowChatBoard = () => {
        setShowChatBoard(true);
    };

    const handleBookSession = () => {
        // Implement the logic to book a session
        // This could involve redirecting to a booking page,
        // opening a modal, or making an API call.
        alert('Session réservée !'); // Placeholder alert, replace with actual logic
    };

    useEffect(() => {
        const fetchCoachDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/coaches/${id}`);
                console.log(response.data);
                setCoach(response.data.coach); 
                setLoading(false);
            } catch (err) {
                setError(`Erreur lors de la récupération des détails du coach : ${err.message}`);
                setLoading(false);
            }
        };

        fetchCoachDetails();
    }, [id]);

    if (loading) return <p>Chargement des détails du coach...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <Header />
            {coach && (
                <div className="banner-coach-details">
                    <div className="banner-right">
                        <img 
                            className="coach-profile-photo" 
                            src={coach.user?.photo_profil || 'default_photo_url'} 
                            alt={`${coach.user?.nom} ${coach.user?.prenom}`} 
                        />
                        <p>{coach.experience}</p>
                    </div>
                    <div className="banner-left">
                        <h1>{coach.user?.nom} {coach.user?.prenom}</h1>
                        <div className="validation-icon">
                            <i className="fas fa-check-circle"></i>
                            <span>Profil vérifié</span>
                        </div>
                        <button onClick={handleShowChatBoard} className="send-message-button">
                            Envoyer un message
                        </button>
                    </div>
                </div>
            )}

            <div className="coach-details-container">
                <div className="details-grid">
                    <div className="details-card">
                        <h4>Services</h4>
                        {coach.services ? (
                            coach.services.split(',').map((service, index) => (
                                <div key={index}>
                                    <p><strong>{service.trim()}</strong></p>
                                </div>
                            ))
                        ) : (
                            <p>Aucun service disponible.</p>
                        )}
                    </div>

                    <div className="details-card">
                        <h4>Diplômes</h4>
                        {coach.diplomes ? (
                            coach.diplomes.split(',').map((diplome, index) => (
                                <div key={index}>
                                    <p><strong>{diplome.trim()}</strong></p>
                                </div>
                            ))
                        ) : (
                            <p>Aucun diplôme disponible.</p>
                        )}
                    </div>

                    <div className="details-card">
                        <h4>Disponibilités</h4>
                        {coach.disponibilites ? (
                            coach.disponibilites.split(',').map((disponibilite, index) => (
                                <div key={index}>
                                    <p>{disponibilite.trim()}</p>
                                </div>
                            ))
                        ) : (
                            <p>Aucune disponibilité renseignée.</p>
                        )}
                    </div>

                    <div className="details-card">
                        <h4>Lieu</h4>
                        <p>{coach.lieu}</p>
                        <div className="button-container">
                            <button onClick={handleStartVideoCall} className="start-video-call-button">
                                Démarrer un appel vidéo
                            </button>
                            <button onClick={handleBookSession} className="book-session-button">
                                Réserver une séance
                            </button>
                        </div>
                        {showVideoCall && <JitsiVideoCall roomName={roomName} />}
                    </div>
                </div>
            </div>

            {showChatBoard && <ChatBoard coachId={id} />}

          
            <Footer />
        </div>
    );
};

export default CoachDetails;
