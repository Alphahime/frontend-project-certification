import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './ArticlesGestion.css';
import { FaFileAlt, FaCalendarAlt, FaPlusCircle, FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import the edit and trash icons

const ArticlesGestion = () => {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({ total: 0, lastMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/articles');
        if (!response.ok) {
          throw new Error(`Erreur réseau: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.data);
        calculateStats(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const calculateStats = (articles) => {
    const totalArticles = articles.length;
    const lastMonthArticles = articles.filter(article => {
      const articleDate = new Date(article.created_at);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return articleDate >= oneMonthAgo;
    }).length;

    setStats({ total: totalArticles, lastMonth: lastMonthArticles });
  };

  const softDeleteArticle = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'article');
      }

      // Met à jour l'état des articles pour masquer l'article supprimé
      setArticles(articles.map(article => article.id === id ? { ...article, isActive: false } : article));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="content">
        <div className="header">
          <Link to="/administrateur/ajouter-article" className="btn-add-article">
            <FaPlusCircle /> Ajouter un article
          </Link>
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <FaFileAlt className="stat-icon" />
            <h3>Total des articles</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-item">
            <FaCalendarAlt className="stat-icon" />
            <h3>Articles créés le mois dernier</h3>
            <p>{stats.lastMonth}</p>
          </div>
        </div>

        {loading && <p>Chargement des articles...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Liste des articles */}
        <div className="articles-container">
          {articles.filter(article => article.isActive !== false).map(article => (
            <div key={article.id} className="article-card">
              {article.image && (
                <img
                  src={`http://127.0.0.1:8000/storage/${article.image}`} 
                  alt={article.nom}
                  className="article-image"
                />
              )}
              <h4>{article.nom}</h4>
              <p>{article.description.length > 100 ? `${article.description.substring(0, 100)}...` : article.description}</p>
              <div className="article-actions">
                <Link to={`/administrateur/modifier-article/${article.id}`} className="action-icon">
                  <FaEdit />
                </Link>
                <span className="action-icon" onClick={() => softDeleteArticle(article.id)}>
                  <FaTrashAlt />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesGestion;
