import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDumbbell, faUsers } from '@fortawesome/free-solid-svg-icons';
import './CoachsGestion.css'; 

const CoachsGestion = () => {
  const [coachs, setCoachs] = useState([]);
  const [filteredCoachs, setFilteredCoachs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coachsPerPage] = useState(5); // 5 coachs par page
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    utilisateurs: 0,
    coachs: 0,
    programmes: 0,
  });

  useEffect(() => {
    // Récupérer la liste des coachs
    fetch('http://127.0.0.1:8000/api/coaches')
      .then(response => response.json())
      .then(data => {
        setCoachs(data);
        setFilteredCoachs(data); // Initialiser les coachs filtrés
      });

    // Récupérer les statistiques (nombre d'utilisateurs, coachs, et programmes)
    fetch('http://127.0.0.1:8000/api/stats')
      .then(response => response.json())
      .then(data => setStats(data));
  }, []);

  // Gestion du champ de recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = coachs.filter(coach =>
      coach.experience.toLowerCase().includes(e.target.value.toLowerCase()) ||
      coach.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCoachs(filtered);
  };

  // Pagination
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
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par expérience ou description"
            value={searchTerm}
            onChange={handleSearch}
          />
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
                  <td>{JSON.parse(coach.disponibilites).Lundi}, {JSON.parse(coach.disponibilites).Mardi}</td>
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
