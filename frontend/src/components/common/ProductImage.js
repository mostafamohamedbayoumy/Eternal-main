import React, { useState } from 'react';
import './ProductImage.css';

// Renders the product/order image, or a tasteful floral placeholder
// instead of a broken-image icon when no image is available yet.
const ProductImage = ({ src, alt = '', className = '' }) => {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`product-image-placeholder ${className}`} role="img" aria-label={alt}>
        <svg viewBox="0 0 64 64" className="product-image-placeholder-icon">
          <path
            d="M32 10c4 6 12 8 12 16 0 7-6 12-12 12s-12-5-12-12c0-8 8-10 12-16z"
            fill="currentColor"
          />
          <path
            d="M32 38v16M24 50h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setErrored(true)} />;
};

export default ProductImage;
