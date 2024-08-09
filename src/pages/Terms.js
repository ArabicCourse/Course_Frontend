import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "./terms.css"

const TermsOfUse = () => {
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
        <div className="terms-container">
            <h1>Terms of Use</h1>
            <p className="terms-date">Last updated: July 29, 2024</p>

            <div className="terms-section">
                <h2>1. Agreement to Terms</h2>
                <p>Welcome to the Arabic Course website. By accessing or using our website, you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you may not access the website.</p>
            </div>

            <div className="terms-section">
                <h2>2. Intellectual Property Rights</h2>
                <p>Unless otherwise stated, we own the intellectual property rights for all material on the Arabic Course website. All intellectual property rights are reserved. You may access this from the Arabic Course website for your own personal use subject to restrictions set in these terms and conditions.</p>
            </div>

            <div className="terms-section">
                <h2>3. Restrictions</h2>
                <p>You are specifically restricted from all of the following:</p>
                <ul>
                    <li>Publishing any website material in any other media</li>
                    <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
                    <li>Publicly performing and/or showing any website material</li>
                    <li>Using this website in any way that is or may be damaging to this website</li>
                    <li>Using this website in any way that impacts user access to this website</li>
                    <li>Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity</li>
                </ul>
            </div>

            <div className="terms-section">
                <h2>4. Your Content</h2>
                <p>In these Terms of Use, "Your Content" shall mean any audio, video, text, images or other material you choose to display on this website. By displaying Your Content, you grant Arabic Course a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
            </div>

            <div className="terms-section">
                <h2>5. No Warranties</h2>
                <p>This website is provided "as is," with all faults, and Arabic Course express no representations or warranties, of any kind related to this website or the materials contained on this website.</p>
            </div>

            <div className="terms-section">
                <h2>6. Limitation of Liability</h2>
                <p>In no event shall Arabic Course, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website.</p>
            </div>

            <div className="terms-section">
                <h2>7. Indemnification</h2>
                <p>You hereby indemnify to the fullest extent Arabic Course from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
            </div>

            <div className="terms-section">
                <h2>8. Severability</h2>
                <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
            </div>

            <div className="terms-section">
                <h2>9. Variation of Terms</h2>
                <p>Arabic Course is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review these Terms on a regular basis.</p>
            </div>

            <div className="terms-section">
                <h2>10. Governing Law & Jurisdiction</h2>
                <p>These Terms will be governed by and interpreted in accordance with the laws of the Country, and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Country] for the resolution of any disputes.</p>
            </div>

            <div className="terms-section">
                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsOfUse;
