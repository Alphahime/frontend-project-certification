import React, { useState } from 'react';
import axios from 'axios';
import './RecetteForm.css';

const RecetteForm = () => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [typeAlimentation, setTypeAlimentation] = useState('');
    const [caloriesTotale, setCaloriesTotale] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/recettes', {
                nom,
                description,
                type_alimentation: typeAlimentation,
                calories_totale: caloriesTotale,
            });
            alert('Recette ajoutée avec succès!');
            // Reset form fields
            setNom('');
            setDescription('');
            setTypeAlimentation('');
            setCaloriesTotale('');
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'ajout de la recette');
        }
    };

    return (
        <div className="recette-form">
            <h1>Ajouter une Nouvelle Recette</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div>
                    <label>Description :</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Type d'alimentation :</label>
                    <input type="text" value={typeAlimentation} onChange={(e) => setTypeAlimentation(e.target.value)} required />
                </div>
                <div>
                    <label>Calories Totales :</label>
                    <input type="text" value={caloriesTotale} onChange={(e) => setCaloriesTotale(e.target.value)} required />
                </div>
                <button type="submit">Ajouter Recette</button>
            </form>
        </div>
    );
};

export default RecetteForm;
