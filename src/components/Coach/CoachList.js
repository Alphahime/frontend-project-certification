import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CoachList.css';
import Header from '../Header'; 
import Footer from '../Footer'; 

const CoachList = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/coaches');
                
                console.log(response.data);
                
                if (Array.isArray(response.data)) {
                    setCoaches(response.data);
                } else {
                    setError('Données des coachs non valides.');
                }
                setLoading(false);
            } catch (err) {
                setError(`Erreur lors de la récupération des coachs : ${err.message}`);
                setLoading(false);
            }
        };

        fetchCoaches();
    }, []);

    if (loading) return <p>Chargement des coachs...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <Header />
            {/* Bannière */}
            <div className="bannier-coach">
                <h1>Découvrez nos meilleurs coachs sportifs</h1>
            </div>
            <div className='section-presentation'>
                <h1>
                    <span className="text-blue">Top 10 de nos meilleurs </span>
                    <span className="text-green">coach en musculation</span>
                </h1>

                <div className='section-image-and-texte'>
                    <div className='section-image'></div>
                    <div className='section-texte'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam sagittis aliquam, tortor sollicitudin egestas convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <button className='devenir-coach'>S'entraîner à domicile</button>
                    </div>
                </div>
                <div className="barre-container">
                    <div className="barre-vert"></div>
                    <div className="barre-bleu"></div>
                </div>
            </div>
            {/* Liste des coachs */}
            <div className="coach-grid">
                {coaches.map((coach) => (
                    <div key={coach.id} className="coach-card">
                        {/* Add coach profile image */}
                        <img src={coach.profile_image || 'default_photo_url'} alt={coach.name} className="profile-image" />
                        <h3>{coach.experience}</h3> {/* Coach experience */}
                        <p>{coach.description}</p> {/* Coach description */}
                        <Link to={`/coaches/${coach.id}`} className="details-link">Contacter</Link> {/* Contact link */}
                    </div>
                ))}
            </div>
            <h1>
                <span className="text-blue">Découvrez  </span>
                <span className="text-green">nos meilleurs</span>
            </h1>

            <div className='food-down'></div>

            {/* Button to redirect to recettes */}
            <div className="recettes-button-container">
                <Link to="/recettes" className="recettes-button">
                    Voir les recettes
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default CoachList;
