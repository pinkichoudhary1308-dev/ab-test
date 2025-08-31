import React from 'react';
import './Footer.css'; // We will update its corresponding CSS file next

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3 className="footer-brand">A/B Testing Platform</h3>
                    <p>
                        Driving data-driven decisions through robust and intuitive experimentation.
                    </p>
                </div>
                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook">F</a>
                        <a href="#" aria-label="Twitter">T</a>
                        <a href="#" aria-label="LinkedIn">L</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} A/B Testing Platform. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;