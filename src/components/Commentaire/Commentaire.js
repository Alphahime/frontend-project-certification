import React, { useState } from 'react';
import axios from 'axios';

const Commentaire = ({ articleId, blogId, setComments }) => {
  const [contenu, setContenu] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // State to handle success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error state before a new submission
    setSuccess(null); // Reset the success state before a new submission

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/commentaires', {
        contenu,
        email, 
        article_id: articleId,
        blog_id: blogId,
      });

   
      setComments(prevComments => [...prevComments, response.data]);
      setContenu(''); 
      setEmail(''); 
      setSuccess('Commentaire ajouté avec succès !'); 
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error.response?.data || error.message);
      setError('Erreur lors de l\'ajout du commentaire.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          placeholder="Écrivez votre commentaire..."
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          required
        />
        <button type="submit">Ajouter Commentaire</button>
      </form>
      {error && <p className="error">{error}</p>} 
      {success && <p className="success">{success}</p>} 
    </div>
  );
};

export default Commentaire;
