import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getProducts } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import './SingleBouquet.css';

const SingleBouquet = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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

  const ProductCard = ({ product }) => {
    const [hasGreenery, setHasGreenery] = useState(false);

    const currentPrice = hasGreenery
      ? product.price + (product.greeneryPrice || 0)
      : product.price;

    const currentImage = hasGreenery && product.imageWithGreenery
      ? product.imageWithGreenery
      : product.images[0];

    const handleAddToCart = () => {
      const cartItem = {
        productId: product._id,
        productName: product.name,
        productImage: currentImage,
        price: currentPrice,
        quantity: 1,
        hasGreenery,
        greeneryPrice: hasGreenery ? (product.greeneryPrice || 0) : 0,
        isCustomBouquet: false,
      };

      addToCart(cartItem);
      toast.success(`${product.name} added to cart!`);
    };

    return (
      <div className="product-card card bloom-animation">
        <div className="product-image-wrapper">
          <img
            src={currentImage}
            alt={product.name}
            className="product-image"
          />
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
          <p className="product-description">{product.description}</p>

          <div className="product-pricing">
            {product.discountedPrice ? (
              <>
                <span className="original-price">${currentPrice.toFixed(2)}</span>
                <span className="discounted-price">
                  ${(product.discountedPrice + (hasGreenery ? (product.greeneryPrice || 0) : 0)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="product-price">${currentPrice.toFixed(2)}</span>
            )}
          </div>

          {product.hasGreeneryOption && (
            <div className="greenery-option">
              <label className="greenery-toggle">
                <input
                  type="checkbox"
                  checked={hasGreenery}
                  onChange={(e) => setHasGreenery(e.target.checked)}
                  disabled={product.stockStatus === 'out-of-stock'}
                />
                <span className="toggle-label">
                  Add Greenery Filler (+${(product.greeneryPrice || 0).toFixed(2)})
                </span>
              </label>
            </div>
          )}

          <button
            className="btn btn-primary btn-block"
            onClick={handleAddToCart}
            disabled={product.stockStatus === 'out-of-stock'}
          >
            {product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  };

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
