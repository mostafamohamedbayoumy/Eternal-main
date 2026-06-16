import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { validatePromoCode } from '../../services/promoService';
import ProductImage from '../../components/common/ProductImage';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const navigate = useNavigate();

  const subtotal = getTotal();
  const discount = appliedPromo?.discountAmount || 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    setValidatingPromo(true);

    try {
      const response = await validatePromoCode(promoCode, subtotal, null);
      
      if (response.success) {
        setAppliedPromo(response.data);
        toast.success(`Promo code applied! You saved $${response.data.discountAmount.toFixed(2)}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid promo code');
      setAppliedPromo(null);
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    toast.info('Promo code removed');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout', { state: { appliedPromo } });
  };

  const renderCartItem = (item, index) => (
    <div key={index} className="cart-item card">
      <ProductImage src={item.productImage} alt={item.productName} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h3>{item.productName}</h3>
        
        {item.isCustomBouquet && item.customBouquetDetails && (
          <div className="custom-bouquet-breakdown">
            <p className="custom-label">Custom Bouquet Details:</p>
            {item.customBouquetDetails.flowers.length > 0 && (
              <div className="breakdown-section">
                <strong>Flowers:</strong>
                <ul>
                  {item.customBouquetDetails.flowers.map((flower, i) => (
                    <li key={i}>{flower.productName} x {flower.quantity}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.customBouquetDetails.fillers.length > 0 && (
              <div className="breakdown-section">
                <strong>Fillers:</strong>
                <ul>
                  {item.customBouquetDetails.fillers.map((filler, i) => (
                    <li key={i}>{filler.productName} x {filler.quantity}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.customBouquetDetails.greeneryFillers.length > 0 && (
              <div className="breakdown-section">
                <strong>Greenery:</strong>
                <ul>
                  {item.customBouquetDetails.greeneryFillers.map((greenery, i) => (
                    <li key={i}>{greenery.productName} x {greenery.quantity}</li>
                  ))}
                </ul>
              </div>
            )}
            {item.customBouquetDetails.specialInstructions && (
              <p className="special-instructions">
                <strong>Instructions:</strong> {item.customBouquetDetails.specialInstructions}
              </p>
            )}
          </div>
        )}

        {item.hasGreenery && (
          <p className="cart-item-option">
            ✓ With Greenery Filler (+${item.greeneryPrice.toFixed(2)})
          </p>
        )}

        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>

      <div className="cart-item-actions">
        {!item.isCustomBouquet && (
          <div className="quantity-controls">
            <button
              onClick={() => updateQuantity(index, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(index, item.quantity + 1)}>
              +
            </button>
          </div>
        )}

        <p className="cart-item-subtotal">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          className="btn-remove"
          onClick={() => removeFromCart(index)}
          title="Remove item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <FaShoppingBag className="empty-cart-icon" />
            <h2>Your Cart is Empty</h2>
            <p>Add some beautiful eternal flowers to your cart!</p>
            <div className="empty-cart-actions">
              <Link to="/single-bouquet" className="btn btn-primary">
                Browse Single Bouquets
              </Link>
              <Link to="/customize" className="btn btn-secondary">
                Customize Your Bouquet
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => renderCartItem(item, index))}
            
            <button className="btn-clear-cart" onClick={clearCart}>
              Clear All Items
            </button>
          </div>

          <div className="cart-summary card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {/* Promo Code Section */}
            <div className="promo-section">
              <h3>Have a Promo Code?</h3>
              {!appliedPromo ? (
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={handleApplyPromo}
                    disabled={validatingPromo || !promoCode.trim()}
                  >
                    {validatingPromo ? 'Checking...' : 'Apply'}
                  </button>
                </div>
              ) : (
                <div className="applied-promo">
                  <div className="promo-details">
                    <span className="promo-code">{appliedPromo.code}</span>
                    <span className="promo-discount">
                      -{appliedPromo.discountType === 'percentage' 
                        ? `${appliedPromo.discountValue}%` 
                        : `$${appliedPromo.discountValue}`}
                    </span>
                  </div>
                  <button className="btn-remove-promo" onClick={handleRemovePromo}>
                    Remove
                  </button>
                </div>
              )}
            </div>

            {appliedPromo && (
              <div className="summary-row discount-row">
                <span>Discount ({appliedPromo.code}):</span>
                <span className="discount-amount">-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row total-row">
              <span>Total:</span>
              <span className="total-amount">${total.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <Link to="/" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
