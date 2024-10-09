import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogBanner from './BlogBanner';
import BlogArticle from './BlogArticle';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/articles');
        setArticles(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <Header /> {/* Ajout du Header ici */}
      <BlogBanner />
      <div className="article-section">
        {loading ? (
          <p>Chargement des articles...</p>
        ) : error ? (
          <p>Erreur: {error}</p>
        ) : (
          articles.length > 0 ? (
            articles.map(article => (
              <BlogArticle key={article.id} article={article} />
            ))
          ) : (
            <p>Aucun article disponible.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
