import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import './payment.css'; // Import the CSS file

const Payment = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [file, setFile] = useState(null);
    const [sectionName, setSectionName] = useState(''); 
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {       
        e.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('file', file);
        formData.append('section_name', sectionName);

        fetch('https://course-backend-ajbr.onrender.com/api/payment', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
        }).catch(error => {
            setMessage('An error occurred');
            console.error(error);
        })
        .finally(() => {
            setLoading(false); // Stop loading
        });

        // EmailJS Integration
        const emailData = {
            user_name: name,
            user_email: email,
            user_phone: phone,
            user_payment: file ? file.name : '',
            section_name: sectionName 
        };

        emailjs.send(
            'service_9m49n8h', 
            'template_voffgm5', 
            emailData,
            'J3_htaUK41KFjhxmH'
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message. We will get back to you soon!');
        }).catch((error) => {
            console.log('FAILED...', error);
            alert('There was an error sending your message. Please try again later.');
        })
        .finally(() => {
            setLoading(false); // Stop loading
        });

        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setFile(null);
        setSectionName('');
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            navigate('/login'); 
        } else {
            const user = JSON.parse(loggedInUser);
            setUser(user);               
        }
    }, [navigate]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Арабский язык</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {user && (
                            <>
                               <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        здравствуйте, {user.name}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <button className="dropdown-item" onClick={handleLogout}>Выйти</button>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            <div className="my-container">
                <div className="payment-form">
                    <h1>Ручная оплата</h1>
                    <p>Пожалуйста, переведите деньги на следующий банковский счет:</p>
                    <p>Банк: Сбербанк</p>
                    <p>номер телефона: +79991779611</p>
                    <p>имя учетной записи: Абуеллаил Абдельмегуд Фати Ахмед</p>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>ФИО:</label>
                            <input 
                                type="text" 
                                value={name}
                                name='user_name'
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div>
                            <label>Электронная почта:</label>
                            <input 
                                type="email" 
                                value={email}
                                name='user_email'
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div>
                            <label>Телефон:</label>
                            <input 
                                type="tel" 
                                value={phone}
                                name='user_phone'
                                onChange={(e) => setPhone(e.target.value)}
                                required 
                            />
                        </div>
                        <div>
                            <label>Название раздела:</label>
                            <select 
                                value={sectionName} 
                                onChange={(e) => setSectionName(e.target.value)} 
                                required
                            >
                                <option value="" disabled>Select a section</option>
                                <option value="Разговор_1">Разговор_1</option>
                                <option value="Разговор_2">Разговор_2</option>
                                <option value="Разговор_3">Разговор_3</option>
                            </select>
                        </div>
                        <div>
                            <label>Загрузить подтверждение платежа:</label>
                            <input 
                                type="file" 
                                name='user_payment'
                                onChange={handleFileChange}
                                required 
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Предоставление...' : 'Представить'}
                        </button>
                    </form>
                    {message && <p className="success-message">{message}</p>}
                </div>
            </div>

            <div className="subscription-footer mt-5">
                <footer className="text-center mt-5">
                    
                    <div>
                        <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/terms" className="text-decoration-none">условия использования</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/privacy" className="text-decoration-none">политика конфиденциальности</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/ContactUs" className="text-decoration-none">связаться с нами</a>
                    </div>
                        <p>© Школа арабского языка для русских 2024</p>
                </footer>
            </div>
        </div>
    );
};

export default Payment;
