
import 'bootstrap/dist/css/bootstrap.min.css';// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes,Link, BrowserRouter } from "react-router-dom";
import CoursePlaylist from './pages/Playlist';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Privacy from './pages/Privacy';
import TermsOfUse from './pages/Terms';
import ContactUs from './pages/ContactUs';

function App() {
    return ( 
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element = {<Home/>}/>
                    <Route path= "/home" element = {<Home/>}/>
                    <Route path="/playlist/:itemName" element={<CoursePlaylist />} />
                    <Route path= "/login" element={<Login/>}/>
                    <Route path= "/register" element={<Register/>}/>
                    <Route path='/payment' element={<Payment/>}/>
                    <Route path='/privacy' element={<Privacy/>}/>
                    <Route path='/terms' element={<TermsOfUse/>}/>
                    <Route path='/ContactUs' element={<ContactUs/>}/>
                </Routes>
            </BrowserRouter>          
            
    </div>
        
    );
}

export default App;
