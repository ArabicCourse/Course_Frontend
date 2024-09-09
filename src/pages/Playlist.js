import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Playlist.css';
import '../App.css';

const Playlist = () => {
    const [sections, setSections] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { itemName } = useParams();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser);

            axios.post('https://course-backend-ajbr.onrender.com/api/login', { 
                email: parsedUser.email, 
                password: parsedUser.password
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error authenticating user:', error);
            });

            axios.get('https://course-backend-ajbr.onrender.com/api/course_materials')
                .then(response => {
                    const filteredSections = response.data.sections
                        .filter(section => section.name.includes('Разговор'))
                        .sort((a, b) => a.name.localeCompare(b.name)); // Sort sections in ascending order
                    setSections(filteredSections);

                    if (itemName) {
                        const foundItem = filteredSections.flatMap(section => section.items)
                            .find(item => item.name === decodeURIComponent(itemName));
                        if (foundItem) {
                            if (foundItem.authorized && !parsedUser.auth) {
                                navigate('/payment');
                            } else {
                                setSelectedItem(foundItem);
                            }
                        } else {
                            navigate('/');
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching the course materials:', error);
                });
        }
    }, [navigate, itemName]);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        navigate(`/playlist/${item.name}`);
    };

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

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    здравствуйте, {user.name}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <button className="dropdown-item" onClick={handleLogout}>Выйти</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

            <div className={`course-materials ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className='sidebar-toggle-div'>
                    <button className="sidebar-toggle d-lg-none" onClick={toggleSidebar}>
                        Меню
                    </button>                 
                </div>

                <div className={`playlist-container ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="playlist">
                        <h2>Список воспроизведения</h2>
                        {sections.map(section => (
                            <div key={section.name} className="playlist-section">
                                <h3>{section.name}</h3>
                                {section.items.map(item => (
                                    <div 
                                        key={item.name} 
                                        className={`playlist-item ${(!isAuthorized(section.name) && item.authorized) ? 'disabled' : ''}`}
                                        onClick={() => {
                                            if (isAuthorized(section.name) || !item.authorized) {
                                                handleSelectItem(item);
                                            }
                                        }}
                                    >
                                        {item.name}
                                        {(!isAuthorized(section.name) && item.authorized) && <span className="lock-icon">🔒</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="content-container">
                    {selectedItem ? (
                        selectedItem.type === 'pdf' ? (
                            <iframe src={selectedItem.url} className="content-iframe" title="PDF Content" />
                        ) : (
                            <video controls width="100%" poster="https://www.dropbox.com/scl/fi/fvep113llkcz0q5c8olxs/photo_2024-09-09_22-28-35.jpg?rlkey=4h5kmsugleb3svd1ozmlkn6kz&st=hmsss8lv&raw=1">
                                <source src={selectedItem.url} type="video/mp4" />
                                К сожалению, ваш браузер не поддерживает встроенные видео.
                            </video>
                        )
                    ) : (
                        <div>Выберите элемент из списка воспроизведения</div>
                    )}
                </div>
            </div>

            <div className="subscription-footer mt-5">
                <footer className="text-center mt-5">
                    
                    <div>
                        <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/terms" className="text-decoration-none">условия использования</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/privacy" className="text-decoration-none">политика конфиденциальности</a> | <a href="https://course-frontend-git-main-arabiccourses-projects.vercel.app/ContactUs" className="text-decoration-none">связаться с нами</a>
          
                    </div>
                    <p>© Школа арабского языка для русских 2024</p>>
                </footer>
            </div>
        </div>
    );
};

export default Playlist;
