import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* ✅ Logo is OUTSIDE .container so it truly spans full width */}
        <div className="hero-logo-wrapper">
          <img src={logo} alt="Eternal" className="hero-logo" />
        </div>

        <div className="container">
          <div className="hero-content fade-in-up">
            <p className="hero-slogan">Because Forever Matters</p>
            <p className="hero-description">
              Handmade eternal flowers that last forever. Celebrate life's precious moments
              with our timeless floral creations.
            </p>
            <div className="hero-actions">
              <Link to="/single-bouquet" className="btn btn-primary">
                Shop Single Bouquets
              </Link>
              <Link to="/customize" className="btn btn-outline">
                Create Custom Bouquet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title text-center">Our Services</h2>
          <p className="section-subtitle text-center">
            Discover the perfect eternal flowers for every occasion
          </p>

          <div className="services-grid">
            <div className="service-card card bloom-animation">
              <div className="service-icon">🌹</div>
              <h3>Single Flower Bouquets</h3>
              <p>
                Choose from our curated selection of eternal flowers. Add greenery
                for a complete look.
              </p>
              <Link to="/single-bouquet" className="btn btn-secondary">
                Shop Now
              </Link>
            </div>

            <div className="service-card card bloom-animation">
              <div className="service-icon">🎨</div>
              <h3>Customize Your Bouquet</h3>
              <p>
                Build your dream bouquet from scratch. Select flowers, fillers,
                and greenery to match your vision.
              </p>
              <Link to="/customize" className="btn btn-secondary">
                Start Creating
              </Link>
            </div>

            <div className="service-card card bloom-animation">
              <div className="service-icon">🎉</div>
              <h3>Event Services</h3>
              <p>
                Planning an event? Choose from our centerpieces or request a
                custom bouquet booth.
              </p>
              <Link to="/events" className="btn btn-secondary">
                Plan Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose floral-bg">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Eternal Flowers?</h2>
          <div className="features-grid">
            <div className="feature fade-in-up">
              <h4>♾️ Last Forever</h4>
              <p>Our handmade eternal flowers never wilt or fade</p>
            </div>
            <div className="feature fade-in-up">
              <h4>🎨 Handcrafted</h4>
              <p>Each flower is meticulously crafted with love and care</p>
            </div>
            <div className="feature fade-in-up">
              <h4>🌿 Eco-Friendly</h4>
              <p>Sustainable and environmentally conscious materials</p>
            </div>
            <div className="feature fade-in-up">
              <h4>💝 Personalized</h4>
              <p>Customize every detail to match your unique style</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Create Something Eternal?</h2>
          <p>Start your floral journey today</p>
          <Link to="/customize" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
