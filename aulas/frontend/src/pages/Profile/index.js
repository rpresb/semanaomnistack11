import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

export default function Profile() {
    const ngoId = localStorage.getItem('ngoId');
    const ngoName = localStorage.getItem('ngoName');
    const headers = { Authorization: ngoId };

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const fetchProfile = useRef(async () => {
        try {
            const response = await api.get('profile', { headers });
            setIncidents(response.data);
        } catch {

        }
    });

    const handleDelete = async (id) => {
        try {
            await api.delete(`incidents/${id}`, { headers });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch {

        }
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    };

    useEffect(() => {
        fetchProfile.current();
    }, [fetchProfile]);

    return (
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ngoName}</span>

                <Link to='/incidents/new' className='button '>
                    Cadastrar novo caso
                </Link>

                <button onClick={handleLogout}>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident =>
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDelete(incident.id)}>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}
