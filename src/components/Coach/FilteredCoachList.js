import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './FilteredCoachList.css';

const FilteredCoachList = () => {
  const location = useLocation(); // Access the location object
  const { objectives, level, availability, preferredSports } = location.state || {}; // Extract state
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredCoaches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/coaches');
        const allCoaches = response.data;

        console.log(allCoaches); // Log the coaches data for debugging

        const filteredCoaches = allCoaches.filter((coach) => {
          const matchObjectives = objectives 
            ? coach.specialities && coach.specialities.includes(objectives) 
            : true;

          const matchLevel = level 
            ? coach.level === level 
            : true;

          const matchAvailability = availability 
            ? coach.availability && coach.availability.includes(availability) 
            : true;

          const matchPreferredSports = Array.isArray(preferredSports) && preferredSports.length > 0
            ? coach.sports && preferredSports.every((sport) => coach.sports.includes(sport))
            : true;

          return matchObjectives && matchLevel && matchAvailability && matchPreferredSports;
        });

        setCoaches(filteredCoaches);
        setLoading(false);
      } catch (err) {
        setError(`Erreur lors de la récupération des coachs : ${err.message}`);
        setLoading(false);
      }
    };

    fetchFilteredCoaches();
  }, [objectives, level, availability, preferredSports]);

  if (loading) return <p>Chargement des coachs...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="filtered-coach-list">
      <h2>Résultats pour vos critères</h2>
      {coaches.length > 0 ? (
        <div className="filtered-coach-grid">
          {coaches.map((coach) => (
            <div key={coach.id} className="filtered-coach-card">
              <img src={coach.profile_image || 'default_photo_url'} alt={coach.user.nom} className="filtered-coach-profile-image" />
              <h3>{coach.user.nom} {coach.user.prenom}</h3>
              <p>{coach.description}</p>
              <Link to={`/coaches/${coach.id}`} className="filtered-coach-details-link">Voir profil</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun coach trouvé pour vos critères.</p>
      )}
    </div>
  );
};

export default FilteredCoachList;
