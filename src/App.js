import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Correction du chemin
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
import ProtectedRoute from './context/ProtectedRoute';
import Users from './components/administrateur/Users'; 
import PerformanceDashboard from './components/PerformanceDashboard'; 
import RolesPermissions from './components/administrateur/RolesPermissions';

import Dashboard from './components/CoachsEspace/Dashboard';
import Reservations from './components/CoachsEspace/Reservations';
import Programs from './components/CoachsEspace/Programs';
import Messages from './components/CoachsEspace/Messages';
import ModifierArticle from './components/administrateur/ModifierArticle';
function App() {
  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coaches" element={<CoachList />} />
          <Route path="/coaches/:id" element={<CoachDetails />} />
          <Route path="/recettes" element={<RecetteListe />} />
          <Route path="/recettes/:id" element={<RecetteDetail />} />
          <Route path="/ajouter-recette" element={<RecetteForm />} />
          <Route 
            path="/administrateur/ajouter-article" 
            element={<ArticleForm />} allowedRoles={['admin']} 
          />

          {/* Routes pour les programmes d'entraînement */}
          <Route path="/programmes-entrainement" element={<ProgrammeEntrainementList />} />
          <Route path="/programmes-entrainement/:id" element={<ProgrammeEntrainementDetail />} />
          
          {/* Route pour les catégories */}
          <Route path="/categories" element={<CategoriesList />} />
          
          {/* Routes pour les séances d'entraînement */}
          <Route path="/seances-entrainement" element={<SeanceEntrainement />} />
          
          {/* Routes administratives protégées */}
          <Route 
            path="/administrateur/coaches" 
            element={<CoachsGestion />} allowedRoles={['admin']} 
          />
          <Route 
            path="/administrateur/programmes" 
            element={<ProgrammesGestion />} allowedRoles={['admin']} 
          />
          <Route 
            path="/administrateur/articles" 
            element={<ArticlesGestion />} allowedRoles={['admin']} 
          />
          <Route 
            path="/administrateur/roles" 
            element={<RolesGestion />} allowedRoles={['admin']} 
          />
          <Route 
            path="/administrateur/plans-nutritionnels" 
            element={<PlansNutritionnels />} allowedRoles={['admin']} 
          />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticleDetails />} />
          <Route path="/administrateur/programmes-entrainement" element={<ProgrammeList />} />
          <Route path="/ajouter-programme" element={<ProgrammeFormAdd />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/suivi-seance" element={<SuiviSeance />} />
          <Route path="/profil-utilisateur" element={<ProfilUtilisateur />} />

          {/* Route protégée pour DemandeCoaching */}
          <Route path="/demande-coaching"  element={<DemandeCoaching />} allowedRoles={['user', 'admin']} />

          <Route path="/administrateur/ajouter-recette"  element={<AddRecetteForm />} allowedRoles={['admin']} />
          <Route path="/ressources" element={<Ressource />} />

          <Route path="/administrateur/utilisateurs"  element={<Users />} allowedRoles={['admin']}  /> 
          <Route path="/performance" element={<PerformanceDashboard />} />
          <Route path="/administrateur/roles-permissions" element={<ProtectedRoute element={<RolesPermissions />} allowedRoles={['admin']} />} />
        
          <Route path="/coachs" element={<Dashboard />} />
          <Route path="/coachs/gestion-reservations" element={<Reservations />} />
          <Route path="/coachs/gestion-programmes" element={<Programs />} />
          <Route path="/coachs/gestion-messages" element={<Messages />} />
          <Route path="/administrateur/modifier-article/:id" element={<ModifierArticle />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
