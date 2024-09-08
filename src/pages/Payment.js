import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import './payment.css'; // Import the CSS file

const Payment = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {       
            e.preventDefault();

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('file', file);
    
            fetch('https://course-backend-ajbr.onrender.com/api/payment', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
              .then(data => {
                  setMessage(data.message);
              }).catch(error => {
                  setMessage('An error occurred');
                  console.error(error);
              });
    
            // Create an object for EmailJS
            const emailData = {
                user_name: name,
                user_email: email,
                user_phone: phone,
                user_payment: file ? file.name : '' // Only send the file name as text
            };
    
            emailjs.send(
                'service_9m49n8h', // Replace with your EmailJS service ID
                'template_voffgm5', // Replace with your EmailJS template ID
                emailData,
                'J3_htaUK41KFjhxmH' // Replace with your EmailJS user ID
            ).then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your message. We will get back to you soon!');
            }).catch((error) => {
                console.log('FAILED...', error);
                alert('There was an error sending your message. Please try again later.');
            });
    
            // Reset form after submission
            setName('');
            setEmail('');
            setPhone('');
            setFile(null);
        
        
    };
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            navigate('/login'); // Redirect to login if no user is logged in
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
        <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">CourseWebsite</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                {user && (
                    <>
                       <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hello, {user.name}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
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
                <p>номер телефона: 123456789</p>
                <p>имя учетной записи: Aboulil</p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={name}
                            name='user_name'
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email}
                            name='user_email'
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input 
                            type="tel" 
                            value={phone}
                            name='user_phone'
                            onChange={(e) => setPhone(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Upload Payment Confirmation:</label>
                        <input 
                            type="file" 
                            name='user_payment'
                            onChange={handleFileChange}
                            required 
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {message && <p className="success-message">{message}</p>}
            </div>
        </div>
                     <div className="subscription-footer mt-5">
        <footer className="text-center mt-5">
          <p>© Школа арабского языка для русских 2024</p>
          <div>
            <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/terms" className="text-decoration-none">Terms of Use</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/privacy" className="text-decoration-none">Privacy Policy</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/ContactUs" className="text-decoration-none">Contact Us</a>
          </div>
          <p>Teach Online with <a href="#" className="text-decoration-none"></a></p>
        </footer>
      </div>
        </div>
    );
};

export default Payment;
