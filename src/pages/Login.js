// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';  // Create a CSS file for styling if needed

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
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
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">CourseWebsite</a>
            </nav>
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => navigate('/register')}>Go to Register</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
