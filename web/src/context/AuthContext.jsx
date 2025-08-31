import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const API_URL = 'http://localhost:8080/api/users';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check local storage for a logged-in user when the app loads
        const storedUser = localStorage.getItem('abUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/signin`, { email, password });
            localStorage.setItem('abUser', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
            return { success: true };
        } catch (error) {
            console.error("Sign in failed:", error);
            return { success: false, message: 'Invalid email or password.' };
        }
    };

    const signUp = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, { name, email, password });
            localStorage.setItem('abUser', JSON.stringify(response.data));
            setUser(response.data);
            navigate('/');
            return { success: true };
        } catch (error) {
            console.error("Sign up failed:", error);
            return { success: false, message: 'Email already exists or server error.' };
        }
    };
    
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const { displayName, email } = result.user;
            // A simple password for Google users, since your backend requires one.
            const password = `google_${result.user.uid}`; 

            // Try to sign in first. If user doesn't exist, sign them up.
            try {
                const response = await axios.post(`${API_URL}/signin`, { email, password });
                setUser(response.data);
            } catch (error) {
                if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                    // User not found or password mismatch, so sign them up.
                    const response = await axios.post(`${API_URL}/signup`, { name: displayName, email, password });
                    setUser(response.data);
                } else {
                    throw error;
                }
            }
            
            localStorage.setItem('abUser', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            console.error("Google sign in failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('abUser');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);