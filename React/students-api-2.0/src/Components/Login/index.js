import React, { useState } from 'react';
import './styles.css';
import LogoImage from '../../Assets/logoimage.png';
import { useNavigate } from 'react-router-dom';
import api from "../../Services/api";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    async function login(event) {
        event.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Email inválido');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        const data = { email, password };

        try {
            const response = await api.post('api/account/loginuser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/students');
        } catch (error) {
            setError('O login falhou: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='login-container'>
            <section className='form'>
                <img src={LogoImage} alt='login' id='imagelogo' />
                <form onSubmit={login}>
                    <h1>Cadastro de alunos</h1>
                    {error && <p className='error'>{error}</p>}
                    <input 
                        type='email' 
                        placeholder='E-mail' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                    <button className='button' type='submit' disabled={isLoading}>
                        {isLoading ? 'Carregando...' : 'Login'}
                    </button>
                </form>
            </section>
        </div>
    );
}
