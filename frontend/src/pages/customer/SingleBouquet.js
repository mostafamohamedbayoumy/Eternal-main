import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProducts } from '../../services/productService';
import ProductImage from '../../components/common/ProductImage';
import './SingleBouquet.css';

const SingleBouquet = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts({
        category: 'single-flower',
        service: 'single-bouquet',
      });
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const ProductCard = ({ product }) => (
    <Link
      to={`/single-bouquet/${product._id}`}
      state={{ product }}
      className="product-card card bloom-animation"
    >
      <div className="product-image-wrapper">
        <ProductImage src={product.images?.[0]} alt={product.name} className="product-image" />
        {product.discountedPrice && (
          <span className="discount-badge">
            {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
          </span>
        )}
        {product.stockStatus === 'out-of-stock' && (
          <div className="out-of-stock-overlay">Out of Stock</div>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-pricing">
          {product.discountedPrice ? (
            <>
              <span className="original-price">${product.price.toFixed(2)}</span>
              <span className="discounted-price">${product.discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="product-price">${product.price.toFixed(2)}</span>
          )}
        </div>

        <span className="view-details-hint">View details →</span>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="single-bouquet-page">
      <div className="container">
        <div className="page-header">
          <h1 className="fade-in-up">Single Flower Bouquets</h1>
          <p className="page-subtitle fade-in-up">
            Choose from our curated selection of eternal flowers. Add greenery for a complete look.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="no-products">No products available at the moment.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBouquet;
