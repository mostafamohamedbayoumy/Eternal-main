import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import FloralDivider from '../../components/common/FloralDivider';
import PartnersShowcase from '../../components/common/PartnersShowcase';
import './Home.css';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

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
            <span className="kicker">Handmade · Lasting · Yours</span>
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

      <FloralDivider />

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <span className="kicker">What We Offer</span>
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

            <div className="service-card card bloom-animation">
              <div className="service-icon">🤝</div>
              <h3>Collaborate With Us</h3>
              <p>
                We team up with florists, event planners, and creators who share
                our love for things that last.
              </p>
              <Link to="/#partners" className="btn btn-secondary">
                Meet Our Partners
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FloralDivider flip />

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

      {/* Partners Section */}
      <section id="partners" className="partners-section">
        <div className="container text-center">
          <span className="kicker">In Collaboration With</span>
          <h2 className="section-title text-center">Our Partners</h2>
          <p className="section-subtitle text-center">
            Brands and creators we're proud to work alongside.
          </p>
          <PartnersShowcase />
        </div>
      </section>

      <FloralDivider />

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
