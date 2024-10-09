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

    useEffect(() => {
        const fetchCoachDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/coaches/${id}`);
                // Log the response to check the format
                console.log(response.data);
                // Vérifiez si la réponse est bien un JSON valide
                if (typeof response.data === 'string') {
                    // Essayez de parser la chaîne JSON
                    setCoach(JSON.parse(response.data));
                } else {
                    setCoach(response.data);
                }
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
                 <Header />
            {coach && (
                <div className="banner-coach-details">
                    <div className="banner-right">
                        <img className="coach-profile-photo" src={coach.profile_photo_url} alt="" />
                        <p>Coach sportif</p>
                    </div>
                    <div className="banner-left">
                        <div className="validation-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h1>Coach expérimenté</h1>
                        <div className="validation-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h1>Profil et diplômes vérifiés</h1>
                        <button onClick={handleShowChatBoard} className="send-message-button">Envoyer un message</button>
                    </div>
                </div>
            )}

            <div className="coach-details-container">
                <div className="details-grid">
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

                    <div className="details-card">
                        <h4>Diplômes</h4>
                        {coach.diplomes && JSON.parse(coach.diplomes).map((diplome, index) => (
                            <div key={index}>
                                <p><strong>{diplome.diplome}</strong> - {diplome.institution} ({diplome.date_obtention})</p>
                            </div>
                        ))}
                    </div>

                    <div className="details-card">
                        <h4>Disponibilités</h4>
                        {coach.disponibilites && Object.entries(JSON.parse(coach.disponibilites)).map(([jour, horaires], index) => (
                            <div key={index}>
                                <p>{jour} : {horaires}</p>
                            </div>
                        ))}
                    </div>

                    <div className="details-card">
                        <h4>Lieu</h4>
                        <p>{coach.lieu}</p>
                        <button onClick={handleStartVideoCall} className="start-video-call-button">
                            Démarrer un appel vidéo
                        </button>
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
