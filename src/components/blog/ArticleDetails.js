import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogBanner from './BlogBanner';
import './ArticleDetails.css'; 
import Commentaire from '../Commentaire/Commentaire'; 
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`); 
        setArticle(response.data.data); 
        setViews(response.data.data.views || 0); 
        setComments(response.data.data.comments || []); 
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
      <Header /> 
      <BlogBanner /> 
      <div className="article-details">
        <h3>{article.nom}</h3>
        {article.image && (
          <img
            src={`http://127.0.0.1:8000/storage/${article.image}`} 
            alt={article.nom}
          />
        )}
        <div className="article-description">
          {article.description.split('\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              <hr className="separator" />
            </React.Fragment>
          ))}
        </div>
        <p><strong>Nombre de vues:</strong> {views}</p>
        <p><strong>Commentaires:</strong> {comments.length}</p>

        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.contenu}</li>
          ))}
        </ul>

        <Commentaire articleId={id} blogId={article.blog_id} setComments={setComments} /> 
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetails;
