import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import JitsiVideoCall from '../JitsiVideoCall'; 
import ChatBoard from '../ChatBoard'; 
import Header from '../Header'; 
import Footer from '../Footer'; 
import Calendar from 'react-calendar';  // Import calendar library
import 'react-calendar/dist/Calendar.css';  // Import calendar styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faEnvelope, faCheckCircle, faCalendarAlt, faAward, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import './CoachList.css'; 

const CoachDetails = () => {
    const { id } = useParams();
    const [coach, setCoach] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [showChatBoard, setShowChatBoard] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleStartVideoCall = () => {
        setRoomName(`coach-${Date.now()}`);
        setShowVideoCall(true); 
    };

    const handleShowChatBoard = () => {
        setShowChatBoard(true);
    };

    const handleBookSession = () => {
        alert('Session réservée !');
    };

    useEffect(() => {
        const fetchCoachDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/coaches/${id}`);
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
                    <div className="banner-left">
                        <h1>{coach.user?.nom} {coach.user?.prenom}</h1>
                        <div className="validation-icon">
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#80ED99' }} />
                            <span>Profil vérifié</span>
                        </div>
                        <button onClick={handleShowChatBoard} className="send-message-button">
                            <FontAwesomeIcon icon={faEnvelope} /> Envoyer un message
                        </button>
                    </div>
                    <div className="banner-right">
                        <img 
                            className="coach-profile-photo" 
                            src={coach.user?.photo_profil || 'default_photo_url'} 
                            alt={`${coach.user?.nom} ${coach.user?.prenom}`} 
                        />
                        <p>{coach.experience}</p>
                    </div>
                </div>
            )}

            <div className="coach-details-container">
                <div className="details-grid">
                    {/* Services with icons */}
                    <div className="details-card">
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

                    {/* Diplomas with icons */}
                    <div className="details-card">
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

                    {/* Availability section */}
                    <div className="details-card">
                        <h4><FontAwesomeIcon icon={faCalendarAlt} /> Disponibilités</h4>
                        {coach.disponibilites ? (
                            <Calendar 
                                onChange={setSelectedDate} 
                                value={selectedDate} 
                                tileClassName={({ date }) => {
                                    const disponibilitesArray = Array.isArray(coach.disponibilites)
                                        ? coach.disponibilites
                                        : (coach.disponibilites || '').split(',').map(date => date.trim());
                                    return disponibilitesArray.includes(date.toDateString()) ? 'available-date' : null;
                                }}
                                tileDisabled={({ date }) => {
                                    const disponibilitesArray = Array.isArray(coach.disponibilites)
                                        ? coach.disponibilites
                                        : (coach.disponibilites || '').split(',').map(date => date.trim());
                                    return !disponibilitesArray.includes(date.toDateString());
                                }} 
                            />
                        ) : (
                            <p>Aucune disponibilité renseignée.</p>
                        )}
                    </div>

                    {/* Location and video call */}
                    <div className="details-card">
                        <h4>Lieu</h4>
                        <p>{coach.lieu}</p>
                        <div className="button-container">
                            <button onClick={handleStartVideoCall} className="start-video-call-button">
                                <FontAwesomeIcon icon={faVideo} /> Démarrer un appel vidéo
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
