import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Eternal Flowers</h4>
            <p>Handmade eternal flowers that last forever. Because forever matters.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/single-bouquet">Single Bouquets</Link>
            <Link to="/customize">Customize Your Bouquet</Link>
          </div>
          <div className="footer-section">
            <h4>Customer Service</h4>
            <Link to="/account">My Account</Link>
            <Link to="/my-orders">Order Status</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@eternalflowers.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Eternal Flowers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
