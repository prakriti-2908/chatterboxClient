import React, { useState } from "react";
import "./styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModeal"

function Navbar() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nextPath, setNextPath] = useState('');

    function handleNavigation(path) {
        setNextPath(path);
        setIsModalOpen(true);
    }

    function onConfirm() {
        setIsModalOpen(false);
        navigate(nextPath);
    }

    function onRequestClose() {
        setIsModalOpen(false);
    }

    return (
        <div className="navbar">
            <h1 id="logo">ChatterBox?</h1>
            <ul>
                <li onClick={() => handleNavigation('/')}><span className="listNavbar">Home</span></li>
                <li onClick={() => handleNavigation('/about')}><span className="listNavbar">About Us</span></li>
                <li onClick={() => handleNavigation('/privacy-policy')}><span className="listNavbar">Privacy Policy</span></li>
            </ul>
            <ConfirmModal 
                isOpen={isModalOpen} 
                onRequestClose={onRequestClose} 
                onConfirm={onConfirm} 
                message="Are you sure you want to leave the chat? Messages won't be restored" 
            />
        </div>
    );
}

export default Navbar;
