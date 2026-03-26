import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { getFlowerById } from '../../data/flowerData';
import './FlowerDetail.css';

const FlowerDetail = () => {
  const { id } = useParams();
  const flower = getFlowerById(id);
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(0);
  const [hasGreenery, setHasGreenery] = useState(false);

  if (!flower) {
    return (
      <div className="flower-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Flower not found</h2>
            <p>The flower you are looking for does not exist.</p>
            <Link to="/single-bouquet" className="btn btn-primary">
              Back to Flowers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentPrice = hasGreenery
    ? flower.price + flower.greeneryPrice
    : flower.price;

  const handleAddToCart = () => {
    const cartItem = {
      productId: flower.id,
      productName: flower.name,
      productImage: flower.image,
      price: currentPrice,
      quantity: 1,
      hasGreenery,
      greeneryPrice: hasGreenery ? flower.greeneryPrice : 0,
      selectedColor: flower.colors[selectedColor].name,
      isCustomBouquet: false,
    };

    addToCart(cartItem);
    toast.success(`${flower.name} added to cart!`);
  };

  return (
    <div className="flower-detail-page">
      <div className="container">
        <Link to="/single-bouquet" className="back-link">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to All Flowers
        </Link>

        <div className="flower-detail-layout">
          {/* Image Section */}
          <div className="flower-detail-image-section">
            <div className="flower-detail-image-wrapper">
              <img
                src={flower.image}
                alt={flower.name}
                className="flower-detail-image"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flower-detail-info-section">
            <h1 className="flower-detail-name">{flower.name}</h1>

            <p className="flower-detail-price">${currentPrice.toFixed(2)}</p>

            <p className="flower-detail-description">{flower.description}</p>

            {/* Color Selector */}
            <div className="flower-detail-option-group">
              <label className="option-label">
                Color
                <span className="selected-color-name">
                  {flower.colors[selectedColor].name}
                </span>
              </label>
              <div className="color-selector">
                {flower.colors.map((color, index) => (
                  <button
                    key={color.name}
                    className={`color-circle ${
                      selectedColor === index ? 'active' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(index)}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  >
                    {selectedColor === index && (
                      <svg
                        className="color-check"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={
                          isLightColor(color.hex) ? '#333' : '#fff'
                        }
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Greenery Option */}
            {flower.hasGreeneryOption && (
              <div className="flower-detail-option-group">
                <label className="option-label">Add-ons</label>
                <button
                  className={`greenery-toggle-btn ${
                    hasGreenery ? 'active' : ''
                  }`}
                  onClick={() => setHasGreenery(!hasGreenery)}
                >
                  <span className="greenery-toggle-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.5-3 11-8 0 0-2-1-4-1" />
                      <path d="M2 2s7 2 10 9" />
                    </svg>
                  </span>
                  <span className="greenery-toggle-text">
                    <span className="greenery-toggle-title">
                      Add Greenery Filler
                    </span>
                    <span className="greenery-toggle-price">
                      +${flower.greeneryPrice.toFixed(2)}
                    </span>
                  </span>
                  <span className="greenery-toggle-switch">
                    <span className="greenery-toggle-knob" />
                  </span>
                </button>
              </div>
            )}

            {/* Add to Cart */}
            <button
              className="btn btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart &mdash; ${currentPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper: determine if a hex color is light or dark
function isLightColor(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

export default FlowerDetail;
