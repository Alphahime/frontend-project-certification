import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProgrammeEntrainement.css';
import Header from '../Header';  
import Footer from '../Footer'; 

const ProgrammeList = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/programme-entrainements');
        setProgrammes(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des programmes.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  const handleVoirSeance = (programmeId) => {
    navigate(`/programmes-entrainement/${programmeId}`);
  };

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < programmes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header /> {/* Ajout du Header ici */}
      {/* Banner - Separate from the content */}
      <div className="espace-banniere">
        <img src="path_to_banner_image.jpg" alt="Bannière" className="banner-image" />
        <div className="banner-text">
          <h1>Programmes d'entraînement</h1>
        </div>
      </div>

      {/* Program list */}
      <div className="programme-container">
        <h2>Liste des Programmes</h2>
        <div className="programme-grid">
          {programmes
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((programme) => (
              <div key={programme.id} className="programme-card">
                {programme.images && (
                  <img // For pagination
                    src={programme.images}
                    alt={programme.nom}
                    className="programme-image"
                  />
                )}
                <h3>{programme.nom}</h3>
                <button onClick={() => handleVoirSeance(programme.id)}>Voir Séance</button>
              </div>
            ))}
        </div>
        
        {/* Pagination */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 0}>
            &#8249; {/* Left arrow */}
          </button>
          <button onClick={nextPage} disabled={(currentPage + 1) * itemsPerPage >= programmes.length}>
            &#8250; {/* Right arrow */}
          </button>
        </div>
      </div>

     
      <div className="next-section">
        <div className="next-section-content">
          <div className='next-section-image'></div>
          <div className="next-section-text">
            <h2>Préparez-vous pour un entraînement parfait</h2>
            <div className="step-rond-bleu">
              <div className="bleu-item">
                <div className="bleu-circle">
                  <i className="fas fa-check"></i>
                </div>
                <p>Atteignez votre potentiel de forme physique</p> 
              </div>

              <div className="bleu-item">
                <div className="bleu-circle">
                  <i className="fas fa-check"></i> 
                </div>
                <p>Maximisez votre entraînement </p> 
              </div>

              <div className="bleu-item">
                <div className="bleu-circle">
                  <i className="fas fa-check"></i> 
                </div>
                <p>Trouvez les exercices parfaits</p> 
              </div>

              <button className='button-down-musculation'>Contactez votre coach</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgrammeList;
