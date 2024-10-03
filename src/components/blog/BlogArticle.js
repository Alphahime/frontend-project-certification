import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'; 

const BlogArticle = ({ article }) => {
  return (
    <div className="blog-article-card">
     
      
      {article.image && (
        <img
          src={`http://127.0.0.1:8000/storage/${article.image}`}
          alt={article.nom}
          className="article-images"
        />
      )}
      <div className="article-text">
        <h4>{article.nom}</h4>
        <p>{article.description.length > 300 ? `${article.description.substring(0, 300)}...` : article.description}</p>
        <Link className='btn-details' to={`/blog/${article.id}`}>Voir plus</Link> {/* Lien vers les détails de l'article */}

      </div>
    </div>
  );
};

export default BlogArticle;
