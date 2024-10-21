import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import JitsiVideoCall from '../JitsiVideoCall';
import ChatBoard from '../ChatBoard';
import Header from '../Header';
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faEnvelope, faCheckCircle, faAward, faUserGraduate, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './CoachDetails.css';

const CoachDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coach, setCoach] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [showChatBoard, setShowChatBoard] = useState(false);

    // Fetch coach details
    useEffect(() => {
        const fetchCoachDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/coaches/${id}`);
                setCoach(response.data.coach);
            } catch (err) {
                setError(`Erreur lors de la récupération des détails du coach : ${err.response?.data?.error || err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchCoachDetails();
    }, [id]);

    // Function to start a video call
    const handleStartVideoCall = () => {
        setRoomName(`coach-${Date.now()}`);
        setShowVideoCall(true);
    };

    // Show chat board
    const handleShowChatBoard = () => {
        setShowChatBoard(true);
    };

    // Fonction à appeler lors de la réservation
    const handleBookSession = async (date, time) => {
        if (!time) {
            alert('Veuillez sélectionner une heure de réservation.');
            return;
        }

        const reservationDetails = {
            coach_id: id,
            date_seance: `${date.toISOString().split('T')[0]} ${time}:00`,
            status: 'pending',
        };

        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert('Veuillez vous connecter pour réserver une session.');
                return;
            }

            await axios.post('http://127.0.0.1:8000/api/reservations', reservationDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(`Session réservée pour le ${date.toDateString()} à ${time}`);
            navigate(`/reservation/${id}`); // Redirection vers la page de réservation

        } catch (err) {
            console.error('Erreur lors de la réservation :', err);
            alert(`Erreur lors de la réservation : ${err.response?.data?.error || err.message}`);
        }
    };

    // Display loading or error state
    if (loading) return <p>Chargement des détails du coach...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <Header />
            {coach && (
                <div className="coach-banner-detail">
                    <div className="banner-info">
                        <h1>{coach.user?.nom} {coach.user?.prenom}</h1>
                        <div className="verified-badge">
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#80ED99' }} />
                            <span>Profil vérifié</span>
                        </div>
                        <button onClick={handleShowChatBoard} className="message-btn">
                            <FontAwesomeIcon icon={faEnvelope} /> Envoyer un message
                        </button>
                    </div>
                    <div className="banner-photo">
                        <img 
                            className="profile-photo" 
                            src={coach.user?.photo_profil || 'default_photo_url'} 
                            alt={`${coach.user?.nom} ${coach.user?.prenom}`} 
                        />
                        <p>{coach.experience}</p>
                    </div>
                </div>
            )}

            <div className="details-section">
                <div className="details-grid">
                    <div className="details-box">
                        <h4>Description</h4>
                        <p>{coach.description || 'Aucune description disponible.'}</p>
                    </div>

                    <div className="details-box">
                        <h4><FontAwesomeIcon icon={faAward} /> Services</h4>
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

                    <div className="details-box">
                        <h4><FontAwesomeIcon icon={faUserGraduate} /> Diplômes</h4>
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

                    <div className="details-box">
                        <h4><FontAwesomeIcon icon={faCalendarAlt} /> Disponibilités</h4>
                        <button onClick={() => navigate(`/reservation/${id}`)} className="book-session-btn">Réserver une séance</button>
                    </div>

                    <div className="details-box">
                        <h4>Lieu</h4>
                        <p>{coach.lieu}</p>
                        <div className="action-buttons">
                            <button onClick={handleStartVideoCall} className="video-call-btn">
                                <FontAwesomeIcon icon={faVideo} /> Démarrer un appel vidéo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showVideoCall && <JitsiVideoCall roomName={roomName} onClose={() => setShowVideoCall(false)} />}
            {showChatBoard && <ChatBoard onClose={() => setShowChatBoard(false)} />}
            <Footer />
        </div>
    );
};

export default CoachDetails;
