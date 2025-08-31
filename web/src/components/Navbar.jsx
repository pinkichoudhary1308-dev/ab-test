import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/">A/B Testing Platform</a>
            </div>
            {user && (
                <div className="navbar-user">
                    <span>Welcome, {user.name}</span>
                    <button onClick={logout} className="btn-logout">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;