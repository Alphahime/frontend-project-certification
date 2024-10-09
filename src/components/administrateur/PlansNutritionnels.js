import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; 
import Sidebar from './Sidebar'; 
import './PlansNutritionnels.css'; 
import { useNavigate } from 'react-router-dom';

const PlanNutritionnel = () => {
    const [recettes, setRecettes] = useState([]);
    const [likes, setLikes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recettesPerPage = 5;

    useEffect(() => {
        const fetchRecettes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/plans-nutritionnels');
                setRecettes(response.data);

                const initialLikes = {};
                response.data.forEach(recette => {
                    initialLikes[recette.id] = 0;
                });
                setLikes(initialLikes);
            } catch (error) {
                setError(error);
                console.error('Erreur lors de la récupération des recettes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecettes();
    }, []);

    const handleLike = (id) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [id]: (prevLikes[id] || 0) + 1 // Ajout d'une vérification pour éviter NaN
        }));
    };

    const limitDescription = (description) => {
        return description.split(' ').slice(0, 5).join(' ') + '...';
    };

    const indexOfLastRecette = currentPage * recettesPerPage;
    const indexOfFirstRecette = indexOfLastRecette - recettesPerPage;
    const currentRecettes = recettes.slice(indexOfFirstRecette, indexOfLastRecette);
    const navigate = useNavigate();
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Erreur: {error.message}</div>;
    }

    const filteredRecettes = currentRecettes.filter(recette =>
        recette.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-container">
            <Sidebar />
            <div className="admin-content">
                <div className="header">
                    <input 
                        type="text" 
                        placeholder="Rechercher une recette..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="admin-search-bar" 
                    />
                    <button className="admin-add-btn" onClick={() => navigate('/administrateur/ajouter-recette')}>
                        <FaPlus /> Ajouter Recette
                    </button>
                </div>
                <table className="admin-recette-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Type d'alimentation</th>
                            <th>Calories Totales</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecettes.map(recette => (
                            <tr key={recette.id}>
                                <td>
                                    <img src={recette.image} alt={recette.nom} className="admin-recette-image" />
                                </td>
                                <td>{recette.nom}</td>
                                <td>{limitDescription(recette.description)}</td>
                                <td>{recette.type_alimentation}</td>
                                <td>{recette.calories_totale}</td>
                                <td>
                                    <div className="actions-section">
                                        <FaEdit className="action-icon" onClick={() => alert('Modifier la recette')} />
                                        <FaTrashAlt className="action-icon" onClick={() => alert('Supprimer la recette')} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {[...Array(Math.ceil(recettes.length / recettesPerPage)).keys()].map(number => (
                        <button 
                            key={number + 1} 
                            onClick={() => paginate(number + 1)} 
                            className={currentPage === number + 1 ? 'active' : ''}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlanNutritionnel;
