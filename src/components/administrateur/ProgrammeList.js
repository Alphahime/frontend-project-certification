import React, { useEffect, useState } from 'react';
import './ProgrammeList.css'; 

const ProgrammeList = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/programme-entrainements');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des programmes');
        }
        const data = await response.json();
        setProgrammes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProgrammes = programmes.filter((programme) =>
    programme.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Chargement des programmes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Liste des Programmes d'Entraînement</h1>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un programme..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button">Rechercher</button>
      </div>

      {/* Statistiques */}
      <div className="statistics">
        <div className="stat-item">
          <h3>Total Programmes</h3>
          <p>{programmes.length}</p>
        </div>
        <div className="stat-item">
          <h3>Programmes en ligne</h3>
          <p>{programmes.filter(p => p.status === 'actif').length}</p>
        </div>
        <div className="stat-item">
          <h3>Programmes Présentiels</h3>
          <p>{programmes.filter(p => p.type_programme === 'présentiel').length}</p>
        </div>
      </div>

      {/* Liste des programmes */}
      <div className="programme-list">
        {filteredProgrammes.map((programme) => (
          <div key={programme.id} className="programme-card">
            {programme.images && (
              <img
                src={programme.images}
                alt={programme.nom}
              />
            )}
            <h2>{programme.nom}</h2>
            <p><strong>Description:</strong> {programme.description}</p>
            <p><strong>Durée:</strong> {programme.duree}</p>
            <p><strong>Fréquence:</strong> {programme.frequence}</p>
            <p><strong>Niveau de difficulté:</strong> {programme.niveau_difficulte}</p>
            <p><strong>Status:</strong> {programme.status}</p>
            <p><strong>Type de programme:</strong> {programme.type_programme}</p>
            <p><strong>Date de création:</strong> {programme.date_creation}</p>
            <p><strong>Date de mise à jour:</strong> {programme.date_mise_a_jour}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammeList;
