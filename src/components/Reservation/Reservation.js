import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Reservation = () => {
    const { coachId } = useParams(); // Récupérer coachId depuis l'URL
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [mot_de_passe, setPassword] = useState('');
    const navigate = useNavigate();

    const formatDate = (date, heure) => `${date} ${heure}:00`;

    const handleReservation = async (e) => {
        e.preventDefault();
        console.log('Coach ID:', coachId); // Debug

        if (!date || !heure) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        const dateSeance = formatDate(date, heure);
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('user');

        if (!token || !userId) {
            setError("Vous devez vous connecter pour réserver.");
            return;
        }

        if (!coachId) {
            setError("Le coach n'a pas été sélectionné.");
            return;
        }

        try {
            const reservationData = {
                coach_id: coachId,
                user_id: userId,
                date_seance: dateSeance,
                status: 'pending'
            };

            const response = await fetch('http://127.0.0.1:8000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Reservation Data:', reservationData); // Log reservation data
                setMessage('Réservation réussie');
                setError('');
            } else {
                const errorText = await response.json();
                console.error('Erreur lors de la réservation:', errorText);
                setError('Erreur lors de la réservation. Détails : ' + (errorText.message || 'Vérifiez vos données.'));
            }
        } catch (err) {
            console.error('Erreur de connexion au serveur:', err);
            setError('Erreur de connexion au serveur.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, mot_de_passe }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', data.user.id);
                setMessage('Connexion réussie');
                setError('');
                // Retirer navigate vers le tableau de bord
            } else {
                const errorResponse = await response.json();
                console.error('Erreur lors de la connexion:', errorResponse);
                setError('Erreur lors de la connexion. Vérifiez vos identifiants.');
            }
        } catch (err) {
            console.error('Erreur de connexion au serveur:', err);
            setError('Erreur de connexion au serveur.');
        }
    };

    return (
        <div>
            <h2>Informations de la séance</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <form onSubmit={handleReservation}>
                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Heure:</label>
                    <input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} required />
                </div>
                <button type="submit">Réserver</button>
            </form>

            <h3>Pour réserver cette séance, vous devez vous connecter :</h3>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Adresse Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" value={mot_de_passe} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Se connecter</button>
                <p>Vous n'avez pas encore de compte ? <a href="/register">S'enregistrer</a></p>
            </form>
        </div>
    );
};

export default Reservation;
