import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RolesPermissions.module.css';

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const rolesResponse = await axios.get('http://127.0.0.1:8000/api/roles');
        const permissionsResponse = await axios.get('http://127.0.0.1:8000/api/permissions');
        
        setRoles(rolesResponse.data);
        setPermissions(permissionsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Une erreur est survenue lors de la récupération des données.');
        setLoading(false);
      }
    };

    fetchRolesAndPermissions();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.rolesPermissionsContainer}>
      <h2>Gestion des Rôles et Permissions</h2>

      <div className={styles.formSection}>
        <h3>Ajouter un rôle ou une permission</h3>
      </div>

      <div className={styles.rolesSection}>
        <h3>Liste des Rôles</h3>
        <ul>
          {roles.map((role) => (
            <li key={role.id} className={styles.listItem}>{role.name}</li>
          ))}
        </ul>
      </div>

      <div className={styles.permissionsSection}>
        <h3>Liste des Permissions</h3>
        <ul>
          {permissions.map((permission) => (
            <li key={permission.id} className={styles.listItem}>{permission.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RolesPermissions;
