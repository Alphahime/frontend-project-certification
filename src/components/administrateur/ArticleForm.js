import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArticleForm.css';

const ArticleForm = () => {
  const [article, setArticle] = useState({
    nom: '',
    description: '',
    type_article: '',
    image: null // Ajout d'un champ pour l'image
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleFileChange = (e) => {
    setArticle({ ...article, image: e.target.files[0] }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', article.nom);
    formData.append('description', article.description);
    formData.append('type_article', article.type_article);
    if (article.image) {
      formData.append('image', article.image); // Ajout de l'image au formData
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/articles', {
        method: 'POST',
        body: formData // Envoi de formData au lieu de JSON
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'article');
      }

      navigate('/administrateur/articles');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter un nouvel article</h2>
      {error && <p className="text-danger">{error}</p>}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="nom" className="form-label">Nom de l'article:</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={article.nom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="type_article" className="form-label">Catégorie:</label>
          <select
            id="type_article"
            name="type_article"
            className="form-select"
            value={article.type_article}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="TV">Muculation</option>
            <option value="PC">Fitness</option>
            <option value="GA">Bien être </option>
            <option value="PH">Nutrition</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={article.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="col-12">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Ajouter l'article</button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
