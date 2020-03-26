import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

export default function NewIncident() {
    const ngoId = localStorage.getItem('ngoId');

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, { headers: { Authorization: ngoId } });
            history.push('/profile');
        } catch {
            alert('Erro ao criar o caso, tente novamente.');
        }
    };

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to='/profile' className='back-link'>
                        <FiArrowLeft size={16} color='#e02041' />
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleCreate}>
                    <input
                        placeholder='Título do caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder='Descrição'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>

    );
}
