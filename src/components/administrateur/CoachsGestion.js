import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDumbbell, faUsers, faBell } from '@fortawesome/free-solid-svg-icons';
import './CoachsGestion.css'; 

const CoachsGestion = () => {
  const [coachs, setCoachs] = useState([]);
  const [filteredCoachs, setFilteredCoachs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coachsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    utilisateurs: 0,
    coachs: 0,
    programmes: 0,
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/coaches')
      .then(response => response.json())
      .then(data => {
        setCoachs(data);
        setFilteredCoachs(data);
      });

    fetch('http://127.0.0.1:8000/api/stats')
      .then(response => response.json())
      .then(data => setStats(data));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = coachs.filter(coach =>
      coach.experience.toLowerCase().includes(e.target.value.toLowerCase()) ||
      coach.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCoachs(filtered);
  };

  const indexOfLastCoach = currentPage * coachsPerPage;
  const indexOfFirstCoach = indexOfLastCoach - coachsPerPage;
  const currentCoachs = filteredCoachs.slice(indexOfFirstCoach, indexOfLastCoach);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAccept = (id) => {
    console.log(`Coach ${id} accepté`);
  };

  const handleReject = (id) => {
    console.log(`Coach ${id} rejeté`);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <h1 className="title">Gestion des Coachs</h1>
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher par expérience ou description"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="user-profile-container">
            <FontAwesomeIcon icon={faBell} className="notification-icon" />
            <img
              src="path_to_profile_image.jpg" 
              alt="User Profile"
              className="user-profile"
            />
          </div>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
            <div>
              <p className="stat-number">{stats.utilisateurs}</p>
              <p className="stat-label">Utilisateurs</p>
            </div>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faDumbbell} className="stat-icon" />
            <div>
              <p className="stat-number">{stats.coachs}</p>
              <p className="stat-label">Coachs</p>
            </div>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faUser} className="stat-icon" />
            <div>
              <p className="stat-number">{stats.programmes}</p>
              <p className="stat-label">Programmes</p>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-coachs">
            <thead>
              <tr>
                <th>ID</th>
                <th>Experience</th>
                <th>Description</th>
                <th>Lieu</th>
                <th>Disponibilités</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCoachs.map(coach => (
                <tr key={coach.id}>
                  <td>{coach.id}</td>
                  <td>{coach.experience}</td>
                  <td>{coach.description}</td>
                  <td>{coach.lieu}</td>
                  <td>
                    {coach.disponibilites ? (
                      // Tentative d'analyse uniquement si les disponibilités sont valides JSON
                      (() => {
                        try {
                          const disponibilites = JSON.parse(coach.disponibilites);
                          return `${disponibilites.Lundi}, ${disponibilites.Mardi}`;
                        } catch (error) {
                          return 'Disponibilités non valides';
                        }
                      })()
                    ) : 'Aucune disponibilité'}
                  </td>
                  <td>
                    <button className="btn-accept" onClick={() => handleAccept(coach.id)}>Accepter</button>
                    <button className="btn-reject" onClick={() => handleReject(coach.id)}>Rejeter</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {[...Array(Math.ceil(filteredCoachs.length / coachsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachsGestion;
