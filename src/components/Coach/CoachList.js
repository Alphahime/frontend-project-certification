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
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const coachesPerPage = 3; // Show 3 coaches per page

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/coaches');
                
                if (Array.isArray(response.data)) {
                    setCoaches(response.data.reverse()); // Reverse to show latest coaches first
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

    // Pagination logic
    const indexOfLastCoach = currentPage * coachesPerPage;
    const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
    const currentCoaches = coaches.slice(indexOfFirstCoach, indexOfLastCoach); // Slice array to show only current page coaches

    const paginate = (pageNumber) => setCurrentPage(pageNumber); // Change page

    if (loading) return <p>Chargement des coachs...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <Header />
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
                {currentCoaches.map((coach) => (
                    <div key={coach.id} className="coach-card">
                        {/* Add coach profile image */}
                        <img src={coach.profile_image || 'default_photo_url'} alt={coach.name} className="profile-image" />
                        <h3>{coach.experience}</h3> {/* Coach experience */}
                        <p>{coach.description}</p> {/* Coach description */}
                        <Link to={`/coaches/${coach.id}`} className="details-link">Contacter</Link> {/* Contact link */}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(coaches.length / coachesPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)} className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}>
                        {i + 1}
                    </button>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default CoachList;
