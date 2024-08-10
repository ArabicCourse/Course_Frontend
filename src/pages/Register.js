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
            <a className="navbar-brand" href="/">CourseWebsite</a>
            </nav>
        <div className="register-form">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>
                 <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                
            <button onClick={() => navigate('/login')}>Go to Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default Register;
