import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Playlist.css';
import '../App.css';

const Playlist = () => {
    const [sections, setSections] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle
    const navigate = useNavigate();
    const { itemName } = useParams();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            navigate('/login');
        } else {
            const user = JSON.parse(loggedInUser);
            setUser(user);
    
            axios.get('https://course-backend-ajbr.onrender.com/api/course_materials')
                .then(response => {
                    const allSections = response.data.sections;
                    const filteredSections = allSections.map(section => {
                        const filteredItems = section.items.filter(item => 
                            user.auth || !item.authorized
                        );
                        return filteredItems.length > 0
                            ? { ...section, items: filteredItems }
                            : null;
                    }).filter(section => section !== null);
                    setSections(filteredSections);
                    if (itemName) {
                        const foundItem = allSections.flatMap(section => section.items)
                            .find(item => item.name === decodeURIComponent(itemName));
                        if (foundItem) {
                            if (foundItem.authorized && !user.auth) {
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
        navigate(`/course/${encodeURIComponent(item.name)}`);
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
        <a className="navbar-brand" href="/">CourseWebsite</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                {user && (
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hello, {user.name}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    </nav>
        <div className={`course-materials ${isSidebarOpen ? 'sidebar-open' : ''}`}>
           
            <div className='sidebar-toggle-div'>
                <button className="sidebar-toggle d-lg-none" onClick={toggleSidebar}>
                Menu
                </button>                 
            </div>

            <div className={`playlist-container ${isSidebarOpen ? 'open' : ''}`}>
                <div className="playlist">
                    <h2>Playlist</h2>
                    {sections.map(section => (
                        <div key={section.name} className="playlist-section">
                            <h3>{section.name}</h3>
                            {section.items.map(item => (
                                <div 
                                    key={item.name} 
                                    className="playlist-item" 
                                    onClick={() => handleSelectItem(item)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="content-container">
                {selectedItem ? (
                    selectedItem.type === 'pdf' ? (
                        <iframe src={selectedItem.url} className="content-iframe" title="PDF Content"/>
                    ) : (
                        <video controls width="100%">
                            <source src={selectedItem.url} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    )
                ) : (
                    <div>Select an item from the playlist</div>
                )}
            </div>
            </div>
            <div className="subscription-footer mt-5">
                <footer className="text-center mt-5">
                    <p>© Школа арабского языка для русских 2024</p>
                    <div>
                        <a href="http://localhost:3000/terms" className="text-decoration-none">Terms of Use</a> | <a href="http://localhost:3000/privacy" className="text-decoration-none">Privacy Policy</a> | <a href="http://localhost:3000/ContactUs" className="text-decoration-none">Contact Us</a>
                    </div>
                    <p>Teach Online with <a href="#" className="text-decoration-none"></a></p>
                </footer>
            </div>
        
        </div>
    );
};

export default Playlist;
