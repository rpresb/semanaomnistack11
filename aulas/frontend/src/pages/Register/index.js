import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

export default function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        };

        try {
            const response = await api.post('ngos', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch {
            alert('Erro no cadastro, tente novamente.');
        }

    };

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude a encontrarem os casos da sua ONG.</p>

                    <Link to='/' className='back-link'>
                        <FiArrowLeft size={16} color='#e02041' />
                        Voltar para o logon
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder='Nome da ONG'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder='Whatsapp'
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder='Cidade'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder='UF'
                            value={state}
                            onChange={e => setState(e.target.value)}
                            style={{ width: 80 }}
                        />
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
