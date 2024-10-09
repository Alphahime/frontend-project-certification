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
import ProgrammeFormAdd from './components/administrateur/ProgrammeFormAdd';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import SuiviSeance from './components/suiviSeance/SuiviSeance';
import ProfilUtilisateur from './components/ProfilUtilisateur/ProfilUtilisateur';

import DemandeCoaching from './components/DemandeCoaching/DemandeCoaching';

import AddRecetteForm from './components/administrateur/AddRecetteForm';

import Ressource from './components/Ressource/Ressource';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coaches" element={<CoachList />} />
        <Route path="/coaches/:id" element={<CoachDetails />} />
        <Route path="/recettes" element={<RecetteListe />} />
        <Route path="/recettes/:id" element={<RecetteDetail />} />
        <Route path="/ajouter-recette" element={<RecetteForm />} />
        
        {/* Routes for Training Programs */}
        <Route path="/programmes-entrainement" element={<ProgrammeEntrainementList />} />
        <Route path="/programmes-entrainement/:id" element={<ProgrammeEntrainementDetail />} />
        
        {/* Route for Categories */}
        <Route path="/categories" element={<CategoriesList />} />
        
        {/* Routes for Training Sessions */}
        <Route path="/seances-entrainement" element={<SeanceEntrainement />} />
        
        {/* Administrator Routes */}
        <Route path="/administrateur/coaches" element={<CoachsGestion />} />
        <Route path="/administrateur/programmes" element={<ProgrammesGestion />} />
        <Route path="/administrateur/utilisateurs" element={<UtilisateursGestion />} />
        <Route path="/administrateur/articles" element={<ArticlesGestion />} />
        <Route path="/administrateur/roles" element={<RolesGestion />} />
        <Route path="/administrateur/plans-nutritionnels" element={<PlansNutritionnels />} />
        <Route path="/administrateur/ajouter-article" element={<ArticleForm />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ArticleDetails />} />
        <Route path="/administrateur/programmes-entrainement" element={<ProgrammeList />} />
        <Route path="/ajouter-programme" element={<ProgrammeFormAdd />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/suivi-seance" element={<SuiviSeance />} />
        <Route path="/profil-utilisateur" element={<ProfilUtilisateur />} />

        {/* Protected Route for DemandeCoaching */}
        <Route path="/demande-coaching" element={<ProtectedRoute element={<DemandeCoaching />} />} />
        
        <Route path="/administrateur/ajouter-recette" element={<AddRecetteForm />} />
        <Route path="/ressources" element={<Ressource />} />
      </Routes>
    </Router>
  );
}

export default App;
