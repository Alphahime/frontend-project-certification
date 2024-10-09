import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './AddRecetteForm.css';

const AddRecetteForm = () => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [typeAlimentation, setTypeAlimentation] = useState('');
    const [caloriesTotale, setCaloriesTotale] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [etapes, setEtapes] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate JSON inputs
        let ingredientsJSON;
        let etapesJSON;
        
        try {
            ingredientsJSON = JSON.parse(ingredients);
        } catch (error) {
            setError('Les ingrédients doivent être une chaîne JSON valide.');
            return;
        }

        try {
            etapesJSON = JSON.parse(etapes);
        } catch (error) {
            setError('Les étapes doivent être une chaîne JSON valide.');
            return;
        }

        // Create FormData to send multipart/form-data
        const recetteData = new FormData();
        recetteData.append('nom', nom);
        recetteData.append('description', description);
        recetteData.append('type_alimentation', typeAlimentation);
        recetteData.append('calories_totale', caloriesTotale);
        recetteData.append('ingredients', JSON.stringify(ingredientsJSON)); 
        recetteData.append('etapes', JSON.stringify(etapesJSON)); 
        if (image) {
            recetteData.append('image', image); // Add the image file if it's available
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/plans-nutritionnels', recetteData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // This tells the server it's a file upload
                },
            });

            if (response.status === 201) {
                setSuccess(true);
                // Reset form
                setNom('');
                setDescription('');
                setTypeAlimentation('');
                setCaloriesTotale('');
                setIngredients('');
                setEtapes('');
                setImage(null);
                navigate('/plans-nutritionnels');
            }
        } catch (error) {
            setError('Erreur lors de l\'ajout de la recette. Assurez-vous que tous les champs sont correctement remplis et que l\'API fonctionne.');
            console.error(error);
        }
    };

    return (
        <div className="add-recette-container">
            <h2>Ajouter une nouvelle recette</h2>
            {success && <p className="success-message">Recette ajoutée avec succès !</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="add-recette-form">
                <label>Nom:</label>
                <input 
                    type="text" 
                    value={nom} 
                    onChange={(e) => setNom(e.target.value)} 
                    required 
                />
                
                <label>Description:</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />

                <label>Type d'alimentation:</label>
                <input 
                    type="text" 
                    value={typeAlimentation} 
                    onChange={(e) => setTypeAlimentation(e.target.value)} 
                    required 
                />

                <label>Calories Totales:</label>
                <input 
                    type="number" 
                    value={caloriesTotale} 
                    onChange={(e) => setCaloriesTotale(e.target.value)} 
                    required 
                />

                <label>Ingrédients (format JSON):</label>
                <textarea 
                    value={ingredients} 
                    onChange={(e) => setIngredients(e.target.value)} 
                    required 
                />

                <label>Étapes (format JSON):</label>
                <textarea 
                    value={etapes} 
                    onChange={(e) => setEtapes(e.target.value)} 
                    required 
                />

                <label>Image:</label>
                <input 
                    type="file" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    accept="image/*" 
                />
                
                <button type="submit">Ajouter Recette</button>
            </form>
        </div>
    );
};

export default AddRecetteForm;
