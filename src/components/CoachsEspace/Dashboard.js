// src/components/CoachsEspace/Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {
  const userName = " "; 

  return (
    <div className="dashboard">
      <Header userName={userName} />
      <Sidebar />
      <div className="content">
        <h1>Bienvenue dans votre tableau de bord, {userName} !</h1>
      </div>
    </div>
  );
};

export default Dashboard;
