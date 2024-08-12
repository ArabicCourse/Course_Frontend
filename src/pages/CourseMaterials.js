import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CourseMaterials = () => {
    const [sections, setSections] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { itemName } = useParams();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);
        }

        setMessage('');
        axios.get('https://course-backend-ajbr.onrender.com/api/course_materials')
            .then(response => {
                setSections(response.data.sections);
                setLoading(false); // Stop loading after data is fetched
            })
            .catch(error => {
                console.error('Error fetching the course materials:', error);
                setLoading(false); // Stop loading even if there's an error
            });

    }, [navigate, itemName]);

    return (
        <div className="container mt-5">
            <h1>Curriculum</h1>
            {loading ? (
                <p>Загрузка материалов курса...</p>
            ) : (
                sections.map(section => (
                    <div key={section.name} className="course-section">
                        <h2>{section.name}</h2>
                        {section.items.map(item => (
                            <div key={item.name} className="course-item d-flex justify-content-between align-items-center mb-2">
                                <div className="course-name">{item.name}</div>
                                <div className="course-action">
                                    {user && user.auth ? (
                                        <a href={"https://course-frontend-one.vercel.app/playlist/"} className="btn btn-primary-course" target="_blank" rel="noopener noreferrer">Start</a>
                                    ) : (
                                        !item.authorized ? (
                                            <a href={"https://course-frontend-one.vercel.app/playlist/"} className="btn btn-primary-course" target="_blank" rel="noopener noreferrer">Preview</a>
                                        ) : (
                                            <button className="btn btn-secondary" disabled>Start</button>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default CourseMaterials;
