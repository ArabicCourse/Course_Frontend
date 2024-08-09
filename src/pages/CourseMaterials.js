// src/CourseMaterials.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CourseMaterials = () => {
    const [sections, setSections] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { itemName } = useParams();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);
        }

        axios.get('https://course-backend-ajbr.onrender.com/api/course_materials')
            .then(response => {
                setSections(response.data.sections);
            })
            .catch(error => {
                console.error('Error fetching the course materials:', error);
            });

    }, [navigate, itemName]);

    return (
        <div className="container mt-5">
            <h1>Curriculum</h1>
            {sections.map(section => (
                <div key={section.name} className="course-section">
                    <h2>{section.name}</h2>
                    {section.items.map(item => (
                        <div key={item.name} className="course-item d-flex justify-content-between align-items-center mb-2">
                            <div className="course-name">{item.name}</div>
                            <div className="course-action">
                                {user && user.auth ? (
                                    <a href={"https://course-frontend-git-main-arabiccourses-projects.vercel.app/course/"+item.name} className="btn btn-primary-course">Start</a>
                                ) : (
                                    !item.authorized ? (
                                        <a href={"https://course-frontend-git-main-arabiccourses-projects.vercel.app/course/"+item.name} className="btn btn-primary-course" target="_blank" rel="noopener noreferrer">Preview</a>
                                    ) : (
                                        <button className="btn btn-secondary" disabled>Start</button>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CourseMaterials;
