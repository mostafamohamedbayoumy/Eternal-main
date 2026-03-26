import React from 'react';
import { Link } from 'react-router-dom';
import flowerData from '../../data/flowerData';
import './SingleBouquet.css';

const SingleBouquet = () => {
  return (
    <div className="single-bouquet-page">
      <div className="container">
        <div className="page-header">
          <h1 className="fade-in-up">Single Flowers</h1>
          <p className="page-subtitle fade-in-up">
            Explore our curated collection of handmade eternal flowers
          </p>
        </div>

        <div className="flowers-grid">
          {flowerData.map((flower, index) => (
            <Link
              to={`/single-bouquet/${flower.id}`}
              key={flower.id}
              className="flower-card"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="flower-card-image">
                <img src={flower.image} alt={flower.name} />
              </div>
              <h3 className="flower-card-name">{flower.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBouquet;
