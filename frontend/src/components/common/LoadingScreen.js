import React from 'react';
import logo from '../../assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <img src={logo} alt="Eternal Flowers" className="loading-logo" />
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
