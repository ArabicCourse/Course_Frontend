// src/CourseMaterials.js
import React, { useEffect, useState } from 'react';
import "./privacy.css"
import { useNavigate, useParams } from 'react-router-dom';

const Privacy = () => {
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
        navigate('/home');
    };

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
        <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p className="privacy-date">Last updated: July 29, 2024</p>

            <div className="privacy-section">
                <h2>1. Introduction</h2>
                <p>Welcome to the Arabic Course website. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
            </div>

            <div className="privacy-section">
                <h2>2. Important Information and Who We Are</h2>
                <p>The Arabic Course website is operated by [Your Company Name]. We are the controller and responsible for your personal data.</p>
                <p>If you have any questions about this privacy policy, please contact us at:</p>
                <ul>
                    <li>Email: matter@gmail.com</li>
                    <li>Address: [Your Company Address]</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h2>3. The Data We Collect About You</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul>
                    <li>Identity Data: first name, last name, username</li>
                    <li>Contact Data: email address, telephone numbers</li>
                    <li>Technical Data: internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform</li>
                    <li>Usage Data: information about how you use our website and services</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h2>4. How We Use Your Personal Data</h2>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul>
                    <li>To register you as a new customer</li>
                    <li>To process and deliver your order</li>
                    <li>To manage our relationship with you</li>
                    <li>To improve our website, products/services, marketing or customer relationships</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h2>5. Data Security</h2>
                <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
            </div>

            <div className="privacy-section">
                <h2>6. Data Retention</h2>
                <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
            </div>

            <div className="privacy-section">
                <h2>7. Your Legal Rights</h2>
                <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
                <ul>
                    <li>Request access to your personal data</li>
                    <li>Request correction of your personal data</li>
                    <li>Request erasure of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request restriction of processing your personal data</li>
                    <li>Request transfer of your personal data</li>
                    <li>Right to withdraw consent</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h2>8. Changes to the Privacy Policy</h2>
                <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date at the top of this privacy policy.</p>
            </div>

            <div className="privacy-section">
                <h2>9. Contact Us</h2>
                <p>If you have any questions about this privacy policy, please contact us:</p>
                <ul>
                    <li>By email: matter@gmail.com</li>
                    <li>By visiting this page on our website: <a href="http://localhost:3000/contact" target="_blank" rel="noopener noreferrer">http://localhost:3000/contact</a></li>
                </ul>
            </div>
        </div><div className="subscription-footer mt-5">
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

export default Privacy;
