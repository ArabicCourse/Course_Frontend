import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setMessage('');
        try {
            const response = await axios.post('https://course-backend-ajbr.onrender.com/api/register', {
                name,
                email,
                password,
                date_of_birth: dateOfBirth,
            });
            setMessage('Registered successfully');
        } catch (error) {
            console.error('There was an error creating the user!', error);
            setMessage('This email is already registered.');
        }
        finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">Арабский язык</a>
            </nav>
        <div className="register-form">
            <h1>регистрировать</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Электронная почта:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>дата рождения:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>
                 <button type="submit" disabled={loading}>
                        {loading ? 'Регистрация...' : 'регистрировать'}
                    </button>
                <p>Или</p>
            <button onClick={() => navigate('/login')}>Вход</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default Register;
