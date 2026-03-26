import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroOriginal from '../../assets/logo.png';
import heroWreath from '../../assets/hero-wreath.jpg';
import singleFlowerImg from '../../assets/single-flower-sketch.png';
import customizeImg from '../../assets/eternally-yours.png';
import './Home.css';

const SLIDES = [
  { image: heroOriginal, alt: 'Eternal Flowers — Handcrafted beauty', cls: 'hero-slide--logo' },
  { image: heroWreath, alt: 'Eternal Flower Wreath — Nature preserved', cls: 'hero-slide--wreath' },
];

const INTERVAL = 4500;

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  /* auto-advance */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next, current]);

  /* animate progress bar when not paused */
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    void bar.offsetWidth;              // force reflow
    if (!paused) {
      bar.style.transition = `width ${INTERVAL}ms linear`;
      bar.style.width = '100%';
    }
  }, [current, paused]);

  return (
    <div className="home">

      {/* ═══ Hero Slideshow ═══ */}
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero-slideshow">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`hero-slide ${slide.cls} ${i === current ? 'hero-slide--active' : ''}`}
            >
              <img src={slide.image} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}

          {/* Gradient overlay + CTA */}
          <div className="hero-overlay">
            <span className="hero-eyebrow">Handcrafted &amp; Eternal</span>
            <h1 className="hero-title">Because Forever Matters</h1>
            <p className="hero-subtitle">
              Artisan flowers that never wilt, crafted with intention.
            </p>
            <Link to="/single-bouquet" className="btn hero-shop-btn">
              Shop the Collection
            </Link>
          </div>

          {/* Dots + thin progress bar */}
          <div className="hero-controls">
            <div className="hero-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot ${i === current ? 'hero-dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="hero-progress-track">
              <div className="hero-progress-bar" ref={progressRef} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Introduction / Brand Story ═══ */}
      <section className="brand-intro">
        <div className="container text-center">
          <span className="section-eyebrow">Our Philosophy</span>
          <h2 className="section-title">Flowers That Tell Your Story</h2>
          <div className="section-rule" />
          <p className="brand-intro-text">
            Every petal is shaped by hand, every bouquet assembled with thought.
            We believe flowers should outlast the moment that inspired them&nbsp;&mdash;&nbsp;lasting
            as long as the memories they carry.
          </p>
        </div>
      </section>

      {/* ═══ Services ═══ */}
      <section className="services">
        <div className="container">
          <span className="section-eyebrow">What We Offer</span>
          <h2 className="section-title text-center">Our Collections</h2>
          <div className="section-rule" />

          <div className="services-grid">
            <Link to="/single-bouquet" className="service-card">
              <div className="service-card-img">
                <img src={singleFlowerImg} alt="Single Flower Bouquets" />
              </div>
              <h3>Single Flower Bouquets</h3>
              <p>
                Choose from our curated collection of handmade eternal flowers.
                Each one crafted to last a lifetime.
              </p>
              <span className="service-link">
                Browse Collection <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>

            <Link to="/customize" className="service-card">
              <div className="service-card-img">
                <img src={customizeImg} alt="Customize Your Bouquet" />
              </div>
              <h3>Customize Your Bouquet</h3>
              <p>
                Build a bouquet that is uniquely yours. Pick your flowers,
                colours, and greenery.
              </p>
              <span className="service-link">
                Start Creating <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Why Choose Us ═══ */}
      <section className="why-choose">
        <div className="container">
          <span className="section-eyebrow">The Eternal Difference</span>
          <h2 className="section-title text-center">Why Choose Eternal Flowers?</h2>
          <div className="section-rule" />

          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c6-3 10-8 10-14a4 4 0 0 0-8-1 4 4 0 0 0-8 1c0 6 4 11 10 14z" fill="none"/><path d="M12 22V8"/></svg>
              </div>
              <h4>Last Forever</h4>
              <p>Our handmade eternal flowers never wilt or fade</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h4>Handcrafted</h4>
              <p>Each flower is meticulously crafted with love and care</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.5-3 11-8 0 0-2-1-4-1"/><path d="M2 2s7 2 10 9"/></svg>
              </div>
              <h4>Eco-Friendly</h4>
              <p>Sustainable and environmentally conscious materials</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83"/></svg>
              </div>
              <h4>Personalized</h4>
              <p>Customize every detail to match your unique style</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Create Something Eternal?</h2>
          <p>Start your floral journey today</p>
          <Link to="/customize" className="btn btn-cta">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
