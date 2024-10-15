import React, { useEffect, useState } from 'react';
import './Users.css';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,  // Import CategoryScale for string labels on the x-axis
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State for storing chart data
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],  // Example months
    datasets: [
      {
        label: 'Monthly Users',
        data: [10, 20, 30, 40, 50, 60, 70],  // Replace with your real data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,  // Adds smooth curves to the line
        pointRadius: 5, // Makes points bigger
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
       
        <input
          type="text"
          placeholder="Search user"
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
              <th>localisation</th>
              <th>Profile</th>
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

        {/* Add the chart */}
        <h2>User Analytics</h2>
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Active Users',
              font: {
                size: 18,
              },
            },
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 10,
                font: {
                  size: 14,
                },
              },
            },
          },
        }} />
      </div>
    </div>
  );
};

export default Users;
