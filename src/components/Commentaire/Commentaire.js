import React, { useState } from 'react';
import axios from 'axios';
import './Commentaire.css'; 

const Commentaire = ({ articleId, setComments }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/commentaires`, {
        contenu: comment,
        article_id: articleId,
        user_id: 1, // Remplacez ceci par l'ID de l'utilisateur connecté si nécessaire
        blog_id: 1 // Remplacez ceci par l'ID du blog si nécessaire
      });

      setComments(prevComments => [...prevComments, response.data.comment]); 
      setSuccess('Commentaire ajouté avec succès.');
      setComment(''); 
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      setError('Erreur lors de l\'ajout du commentaire.'); 
    }
  };

  return (
    <div className="commentaire">
      <h4>Ajouter un commentaire</h4>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Écrivez votre commentaire ici..."
          rows="4"
          required
        />
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default Commentaire;
