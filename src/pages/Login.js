import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';  // Ensure this file contains the necessary styles

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  // New state for loading

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading
        setMessage('');    // Clear any previous messages

        try {
            const response = await axios.post('https://course-backend-ajbr.onrender.com/api/login', { email, password });
            if (response.data.auth !== undefined) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setMessage('Login successful!');
                navigate('/');  // Redirect to the home page after login
            } else {
                setMessage('Login response did not contain auth status.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Invalid email or password.');
            } else {
                console.error('There was an error logging in!', error);
                setMessage('Error logging in');
            }
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">Арабский язык</a>
            </nav>
            <div className="login-form">
                <h1>Вход</h1>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Погрузка...' : 'Вход'}
                    </button>
                    <button type="button" onClick={() => navigate('/register')}>регистрировать</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
