import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './courseMaterials.css';

const CourseMaterials = () => {
    const [sections, setSections] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { itemName } = useParams();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser);

            axios.post('https://course-backend-ajbr.onrender.com/api/login', { 
                email: parsedUser.email,
                password: parsedUser.password,
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error authenticating user:', error);
            });
        }

        axios.get('https://course-backend-ajbr.onrender.com/api/course_materials')
            .then(response => {
                const filteredSections = response.data.sections
                    .filter(section => section.name.includes('Разговор'))
                    .sort((a, b) => a.name.localeCompare(b.name)); // Sort sections in ascending order
                setSections(filteredSections);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the course materials:', error);
                setLoading(false);
            });
    }, [navigate, itemName]);

    const isAuthorized = (sectionName) => {
        if (!user) return false;
        switch (sectionName) {
            case "Разговор_1":
                return user.auth_talking1;
            case "Разговор_2":
                return user.auth_talking2;
            case "Разговор_3":
                return user.auth_talking3;
            default:
                return false;
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Curriculum</h1>
            {loading ? (
                <p>Загрузка материалов курса...</p>
            ) : (
                <div className="row">
                    {sections.map(section => (
                        <div key={section.name} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h2 className="h5 text-center">{section.name}</h2>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <ul className="list-group list-group-flush mb-3">
                                        {section.items.map(item => (
                                            <li key={item.name} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>{item.name}</span>
                                                <div className="course-action">
                                                    {isAuthorized(section.name) ? (
                                                        <a href={`https://course-frontend-git-main-arabiccourses-projects.vercel.app/playlist/${item.name}`} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Start</a>
                                                    ) : (
                                                        !item.authorized ? (
                                                            <a href={`https://course-frontend-git-main-arabiccourses-projects.vercel.app/playlist/${item.name}`} className="btn btn-success btn-sm" target="_blank" rel="noopener noreferrer">Preview</a>
                                                        ) : (
                                                            <button className="btn btn-secondary btn-sm" disabled>Start</button>
                                                        )
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-outline-primary btn-block mt-auto">Learn More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseMaterials;
