import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import JitsiVideoCall from '../JitsiVideoCall'; 
import ChatBoard from '../ChatBoard'; 
import Header from '../Header'; 
import Footer from '../Footer'; 
import Calendar from 'react-calendar';  
import 'react-calendar/dist/Calendar.css';  
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
    const [selectedTime, setSelectedTime] = useState(''); 

    const handleStartVideoCall = () => {
        setRoomName(`coach-${Date.now()}`);
        setShowVideoCall(true); 
    };

    const handleShowChatBoard = () => {
        setShowChatBoard(true);
    };

    const handleBookSession = async () => {
        if (!selectedTime) {
            alert('Veuillez sélectionner une heure de réservation.');
            return;
        }

        const reservationDetails = {
            coachId: id,
            date: selectedDate.toISOString().split('T')[0], // Format YYYY-MM-DD
            time: selectedTime,
        };

        try {
            const token = localStorage.getItem('authToken'); // Récupérez le jeton d'authentification

            // Vérifiez si l'utilisateur est authentifié
            if (!token) {
                alert('Veuillez vous connecter pour réserver une session.');
                return;
            }

            // Requête POST pour créer la réservation avec l'authentification
            await axios.post('http://127.0.0.1:8000/api/reservations', reservationDetails, {
                headers: {
                    Authorization: `Bearer ${token}` // Ajoutez le jeton au header
                }
            });

            alert(`Session réservée pour le ${selectedDate.toDateString()} à ${selectedTime}`);
        } catch (err) {
            console.error('Erreur lors de la réservation :', err);
            alert(`Erreur lors de la réservation : ${err.message}`);
        }
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

    const isDateAvailable = (date) => {
        // Check if the date is available based on coach's disponibilites
        if (!coach?.disponibilites) return true; // Return true if no disponibilites are set
        const availableDates = coach.disponibilites.split(',').map(d => new Date(d.trim()));
        return availableDates.some(d => d.toDateString() === date.toDateString());
    };

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
                                tileDisabled={({ date }) => !isDateAvailable(date)} // Disable unavailable dates
                            />
                        ) : (
                            <p>Aucune disponibilité renseignée.</p>
                        )}

                        {/* Time input for booking */}
                        <div className="time-selection">
                            <label htmlFor="time">Sélectionnez l'heure :</label>
                            <input 
                                type="time" 
                                id="time" 
                                value={selectedTime} 
                                onChange={(e) => setSelectedTime(e.target.value)} 
                            />
                        </div>
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
