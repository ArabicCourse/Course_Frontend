import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import "./contactUs.css"

const ContactUs = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in (example using localStorage)
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogout = () => {
        // Clear user data and localStorage
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            'service_9m49n8h', // Replace with your EmailJS service ID
            'template_8mp84b7', // Replace with your EmailJS template ID
            formData,
            'J3_htaUK41KFjhxmH' // Replace with your EmailJS user ID
        ).then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message. We will get back to you soon!');
        }).catch((error) => {
            console.log('FAILED...', error);
            alert('There was an error sending your message. Please try again later.');
        });

        // Reset form after submission
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">CourseWebsite</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {user ? (
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
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <div className="contact-container">
                <h1>Contact Us</h1>
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="user_name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="user_email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input 
                                type="text" 
                                id="subject" 
                                name="user_subject" 
                                value={formData.subject} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                value={formData.message} 
                                onChange={handleChange} 
                                required 
                            ></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
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
}

export default ContactUs;
