import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogBanner from './BlogBanner'; // Importer la bannière
import './ArticleDetails.css'; // Importer le fichier CSS pour les détails de l'article
import Commentaire from '../Commentaire/Commentaire'; // Importer le composant Commentaire

const ArticleDetails = () => {
  const { id } = useParams(); // Récupérer l'ID de l'article depuis l'URL
  const [article, setArticle] = useState(null); // État pour stocker les détails de l'article
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [views, setViews] = useState(0); // État pour stocker le nombre de vues
  const [comments, setComments] = useState([]); // État pour stocker les commentaires

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`); // Récupérer l'article en fonction de l'ID
        setArticle(response.data.data); // Mettre à jour l'état avec les données récupérées
        setViews(response.data.data.views || 0); // Mettre à jour le nombre de vues
        setComments(response.data.data.comments || []); // Mettre à jour la liste des commentaires
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'article:', error);
        setError('Erreur lors de la récupération des détails de l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!article) {
    return <div>Aucun article trouvé.</div>; 
  }

  return (
    <div>
      <BlogBanner /> {/* Ajouter la bannière ici */}
      <div className="article-details">
        <h3>{article.nom}</h3>
        {article.image && (
          <img
            src={`http://127.0.0.1:8000/storage/${article.image}`} 
            alt={article.nom}
          />
        )}
        <p>{article.description}</p>
        <p><strong>Nombre de vues:</strong> {views}</p>
        <p><strong>Commentaires:</strong> {comments.length}</p>

        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.contenu}</li> // Assurez-vous que c'est 'contenu'
          ))}
        </ul>

        <Commentaire articleId={id} setComments={setComments} /> {/* Utiliser le composant Commentaire ici */}
      </div>
    </div>
  );
};

export default ArticleDetails;
