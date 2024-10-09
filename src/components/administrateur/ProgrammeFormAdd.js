import React, { useState } from "react";
import axios from "axios";
import './ProgrammeList.css';
const ProgrammeFormAdd = () => {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    duree: "",
    frequence: "",
    niveau_difficulte: "Débutant",
    type_programme: "en ligne",
    status: "actif",
    domaine_sportif_id: "",  
    categorie_id: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (file) {
      data.append("images", file);
    }

    try {
      
      const response = await axios.post("http://localhost:3000/api/programme-entrainements", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom du programme</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duree">Durée</label>
          <input
            type="text"
            className="form-control"
            id="duree"
            name="duree"
            value={formData.duree}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="frequence">Fréquence</label>
          <input
            type="text"
            className="form-control"
            id="frequence"
            name="frequence"
            value={formData.frequence}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="niveau_difficulte">Niveau de difficulté</label>
          <select
            id="niveau_difficulte"
            name="niveau_difficulte"
            className="form-control"
            value={formData.niveau_difficulte}
            onChange={handleChange}
            required
          >
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type_programme">Type de programme</label>
          <select
            id="type_programme"
            name="type_programme"
            className="form-control"
            value={formData.type_programme}
            onChange={handleChange}
            required
          >
            <option value="en ligne">En ligne</option>
            <option value="présentiel">Présentiel</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Statut</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categorie_id">ID de la catégorie</label>
          <input
            type="number"
            className="form-control"
            id="categorie_id"
            name="categorie_id"
            value={formData.categorie_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="domaine_sportif_id">ID du domaine sportif</label>
          <input
            type="number"
            className="form-control"
            id="domaine_sportif_id"
            name="domaine_sportif_id"
            value={formData.domaine_sportif_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Image</label>
          <input
            type="file"
            className="form-control"
            id="images"
            name="images"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Ajouter le programme
        </button>
      </form>
    </div>
  );
};

export default ProgrammeFormAdd;
 