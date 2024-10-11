import React, { useEffect, useState } from 'react';
import './Users.css';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2'; // Import the chart component
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js elements
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, Filler);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State to store chart data
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Example months
    datasets: [
      {
        label: 'Utilisateurs Mensuels',
        data: [10, 20, 30, 40, 50, 60, 70], // Replace with your real data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true, // Fill under the line
        tension: 0.4, // Smooth the curve
        pointRadius: 5, // Size of points
        pointHoverRadius: 8, // Size of points on hover
      },
    ],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar className="sidebar" />
      <div className="users-container">
        <h1>Liste des Utilisateurs</h1>
        <input 
          type="text" 
          placeholder="Rechercher un utilisateur" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-bar"
        />
        <table className="users-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Localisation</th>
              <th>Photo de Profil</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.telephone}</td>
                <td>{user.localisation}</td>
                <td><img src={user.photo_profil} alt={`${user.nom} ${user.prenom}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add the chart here */}
        <h2>Analyse des Utilisateurs</h2>
        <Line 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Mois',
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Nombre d\'Utilisateurs',
                },
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.3)', // Custom grid line color
                },
              },
            },
          }} 
          style={{ height: '400px', width: '100%' }} // Chart dimensions
        />
      </div>
    </div>
  );
};

export default Users;
