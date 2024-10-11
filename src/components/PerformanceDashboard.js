import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { getUserPerformanceData } from './api/performanceApi';
import { useLocation } from 'react-router-dom';
import './PerformanceDashboard.css'; // Import CSS styles

const PerformanceDashboard = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const programme = location.state?.programme;

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const data = await getUserPerformanceData();
        setPerformanceData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de performance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Mes performances</h1>
      {programme && (
        <div>
          <h2>Détails du Programme Suivi:</h2>
          <p><strong>Description:</strong> {programme.description}</p>
          <p><strong>Durée:</strong> {programme.duree}</p>
          <p><strong>Fréquence:</strong> {programme.frequence}</p>
          <p><strong>Niveau de difficulté:</strong> {programme.niveau_difficulte}</p>
          <p><strong>Status:</strong> {programme.status}</p>
          <p><strong>Type de programme:</strong> {programme.type_programme}</p>
          <p><strong>Date de création:</strong> {programme.date_creation}</p>
          <p><strong>Date de mise à jour:</strong> {programme.date_mise_a_jour}</p>
          <p><strong>Catégorie ID:</strong> {programme.categorie_id}</p>
          <p><strong>Domaine Sportif ID:</strong> {programme.domaine_sportif_id}</p>
        </div>
      )}
      <div className="chart-container">
        <BarChart className="bar-chart" width={600} height={300} data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar className="chart-bar" dataKey="performance" />
        </BarChart>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
