// src/components/suiviSeance/SuiviSeance.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuiviSeance = () => {
    const [suivis, setSuivis] = useState([]);

    useEffect(() => {
        // Remplacez l'URL par l'URL de votre API
        axios.get('http://127.0.0.1:8000/api/suivis')
            .then(response => {
                setSuivis(response.data.data);
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la récupération des suivis:", error);
            });
    }, []);

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-4">Suivi des Séances</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">User ID</th>
                        <th className="py-2 px-4 border-b">Programme ID</th>
                        <th className="py-2 px-4 border-b">Séance ID</th>
                        <th className="py-2 px-4 border-b">Date de création</th>
                    </tr>
                </thead>
                <tbody>
                    {suivis.map(suivi => (
                        <tr key={suivi.id}>
                            <td className="py-2 px-4 border-b">{suivi.id}</td>
                            <td className="py-2 px-4 border-b">{suivi.user_id}</td>
                            <td className="py-2 px-4 border-b">{suivi.programme_entrainement_id}</td>
                            <td className="py-2 px-4 border-b">{suivi.seance_entrainement_id}</td>
                            <td className="py-2 px-4 border-b">{new Date(suivi.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuiviSeance;
