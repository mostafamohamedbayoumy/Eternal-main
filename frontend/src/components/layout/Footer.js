import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 24" preserveAspectRatio="none">
          <path d="M0 12 Q150 0,300 12 T600 12 T900 12 T1200 12 V24 H0 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h4>Eternal</h4>
            <p className="footer-tagline">Because Forever Matters</p>
            <p>Handmade eternal flowers that never wilt — for everyday moments and the ones you want to keep forever.</p>
          </div>
          <div className="footer-section">
            <h4>Explore</h4>
            <Link to="/single-bouquet">Single Bouquets</Link>
            <Link to="/customize">Customize Your Bouquet</Link>
            <Link to="/events">Events</Link>
            <Link to="/#partners">Our Partners</Link>
          </div>
          <div className="footer-section">
            <h4>Get in Touch</h4>
            <p>info@eternalflowers.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Eternal. Because forever matters.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
