import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProduct } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import ProductImage from '../../components/common/ProductImage';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  // Use the product passed via the card click for an instant render,
  // otherwise fetch it (direct link / page refresh).
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [hasGreenery, setHasGreenery] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) return;
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id, product]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p className="no-products">Sorry, we couldn't find that flower.</p>
        <Link to="/single-bouquet" className="btn btn-primary">
          Back to Single Bouquets
        </Link>
      </div>
    );
  }

  const outOfStock = product.stockStatus === 'out-of-stock';
  const isDiscounted = Boolean(product.discountedPrice);
  const greeneryAdd = hasGreenery ? product.greeneryPrice || 0 : 0;
  const regularPrice = product.price + greeneryAdd;
  const currentPrice = (isDiscounted ? product.discountedPrice : product.price) + greeneryAdd;

  const galleryImages = product.images?.length ? product.images : [];
  const showGreeneryImage = hasGreenery && product.imageWithGreenery;
  const displayImage = showGreeneryImage ? product.imageWithGreenery : galleryImages[activeImage];

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      productName: product.name,
      productImage: displayImage || '',
      price: currentPrice,
      quantity: 1,
      hasGreenery,
      greeneryPrice: greeneryAdd,
      isCustomBouquet: false,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/single-bouquet" className="back-link">
          ← Back to Single Bouquets
        </Link>

        <div className="product-detail-layout">
          {/* Images */}
          <div className="product-detail-gallery">
            <div className="product-detail-main-image">
              <ProductImage src={displayImage} alt={product.name} className="detail-main-img" />
              {isDiscounted && !showGreeneryImage && (
                <span className="discount-badge">
                  {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                </span>
              )}
              {outOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>

            {galleryImages.length > 1 && !showGreeneryImage && (
              <div className="product-detail-thumbs">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <ProductImage src={img} alt={`${product.name} ${i + 1}`} className="thumb-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <h1>{product.name}</h1>

            <div className="product-detail-pricing">
              {isDiscounted ? (
                <>
                  <span className="original-price">${regularPrice.toFixed(2)}</span>
                  <span className="discounted-price">${currentPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="product-price">${currentPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="product-detail-description">{product.description}</p>

            {product.hasGreeneryOption && (
              <div className="greenery-option">
                <label className="greenery-toggle">
                  <input
                    type="checkbox"
                    checked={hasGreenery}
                    onChange={(e) => setHasGreenery(e.target.checked)}
                    disabled={outOfStock}
                  />
                  <span className="toggle-label">
                    Add Greenery Filler (+${(product.greeneryPrice || 0).toFixed(2)})
                  </span>
                </label>
              </div>
            )}

            <button
              className="btn btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={outOfStock}
            >
              {outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
