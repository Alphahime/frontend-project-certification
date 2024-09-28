import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CoachList from './components/Coach/CoachList'; 
import CoachDetails from './components/Coach/CoachDetails'; 
import './App.css';
import RecetteListe from './components/RecetteAlimentaire/RecetteListe';
import RecetteDetail from './components/RecetteAlimentaire/RecetteDetail';
import RecetteForm from './components/RecetteAlimentaire/RecetteForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coaches" element={<CoachList />} /> {/* Route pour la liste des coachs */}
        <Route path="/coaches/:id" element={<CoachDetails />} /> {/* Route pour les détails d'un coach */}
        <Route path="/recettes" element={<RecetteListe />} /> {/* Route pour la liste des recettes */}
        <Route path="/recettes/:id" element={<RecetteDetail />} /> {/* Route pour les détails d'une recette */}
        <Route path="/ajouter-recette" element={<RecetteForm />} /> {/* Route pour ajouter une recette */}
      </Routes>
    </Router>
  );
}

export default App;
