import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CoachList from './components/Coach/CoachList';
import CoachDetails from './components/Coach/CoachDetails';
import RecetteListe from './components/RecetteAlimentaire/RecetteListe';
import RecetteDetail from './components/RecetteAlimentaire/RecetteDetail';
import RecetteForm from './components/RecetteAlimentaire/RecetteForm';
import ProgrammeEntrainementList from './components/ProgrammeEntrainement/ProgrammeList';
import ProgrammeEntrainementDetail from './components/ProgrammeEntrainement/ProgrammeEntrainementDetail';
import CategoriesList from './components/Categorie/CategoriesList';
import SeanceEntrainement from './components/SeanceEntrainement/SeanceEntrainement';
import './App.css';

import CoachsGestion from './components/administrateur/CoachsGestion';
import ProgrammesGestion from './components/administrateur/ProgrammesGestion';
import UtilisateursGestion from './components/administrateur/UtilisateursGestion';
import ArticlesGestion from './components/administrateur/ArticlesGestion';
import RolesGestion from './components/administrateur/RolesGestion';
import PlansNutritionnels from './components/administrateur/PlansNutritionnels';

import ArticleForm from './components/administrateur/ArticleForm';

import Blog from './components/blog/Blog';
import ArticleDetails from './components/blog/ArticleDetails';
import ProgrammeList from './components/administrateur/ProgrammeList';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes existantes */}
        <Route path="/" element={<Home />} />
        <Route path="/coaches" element={<CoachList />} />
        <Route path="/coaches/:id" element={<CoachDetails />} />
        <Route path="/recettes" element={<RecetteListe />} />
        <Route path="/recettes/:id" element={<RecetteDetail />} />
        <Route path="/ajouter-recette" element={<RecetteForm />} />
        
        {/* Routes pour Programme Entrainement */}
        <Route path="/programmes-entrainement" element={<ProgrammeEntrainementList />} />
        <Route path="/programmes-entrainement/:id" element={<ProgrammeEntrainementDetail />} />
        
        {/* Nouvelle route pour Categories */}
        <Route path="/categories" element={<CategoriesList />} /> 
        
        {/* Routes pour Seance Entrainement */}
        <Route path="/seances-entrainement" element={<SeanceEntrainement />} />
        
        {/* Routes administrateur */}
        <Route path="/administrateur/coaches" element={<CoachsGestion />} />
        <Route path="/administrateur/programmes" element={<ProgrammesGestion />} />
        <Route path="/administrateur/utilisateurs" element={<UtilisateursGestion />} />
        <Route path="/administrateur/articles" element={<ArticlesGestion />} />
        <Route path="/administrateur/roles" element={<RolesGestion />} />

        {/* Nouvelle route pour Plans Nutritionnels */}
        <Route path="/administrateur/plans-nutritionnels" element={<PlansNutritionnels />} />

        <Route path="/administrateur/ajouter-article" element={<ArticleForm />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ArticleDetails />} /> {/* Détails de l'article */}
        <Route path="/administrateur/programmes-entrainement" element={<ProgrammeList />} />
        
      </Routes>
    </Router>
  );
}

export default App;
