import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/orderService';
import ProductImage from '../../components/common/ProductImage';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getTotal, clearCart } = useCart();
  const appliedPromo = location.state?.appliedPromo;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    deliveryDate: '',
    deliveryTimeWindow: 'morning',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const subtotal = getTotal();
  const discount = appliedPromo?.discountAmount || 0;
  const total = Math.max(0, subtotal - discount);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in your contact information');
      return false;
    }
    if (!formData.street || !formData.city || !formData.state || !formData.zipCode) {
      toast.error('Please fill in your delivery address');
      return false;
    }
    if (!formData.deliveryDate) {
      toast.error('Please select a delivery date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        guestInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        items: cart.map(item => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          quantity: item.quantity,
          price: item.price,
          isCustomBouquet: item.isCustomBouquet || false,
          customBouquetDetails: item.customBouquetDetails || null,
          hasGreenery: item.hasGreenery || false,
          greeneryPrice: item.greeneryPrice || 0,
        })),
        deliveryAddress: {
          name: formData.name,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        deliveryDate: formData.deliveryDate,
        deliveryTimeWindow: formData.deliveryTimeWindow,
        notes: formData.notes,
        promoCode: appliedPromo?.code || null,
        paymentMethod: 'cash-on-delivery',
      };

      const response = await createOrder(orderData);

      if (response.success) {
        toast.success('Order placed successfully! Check your email for confirmation.');
        clearCart();
        navigate('/order-confirmation', { state: { order: response.data } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="form-section card">
              <h2>Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="form-section card">
              <h2>Delivery Address</h2>
              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Apt 4B"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Delivery Details */}
            <div className="form-section card">
              <h2>Delivery Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Delivery Date *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Time Window</label>
                  <select
                    name="deliveryTimeWindow"
                    value={formData.deliveryTimeWindow}
                    onChange={handleInputChange}
                  >
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Special Instructions (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special delivery instructions or notes..."
                  rows={4}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section card">
              <h2>Payment Method</h2>
              <div className="payment-method">
                <input type="radio" id="cod" name="payment" checked readOnly />
                <label htmlFor="cod">
                  <strong>Cash on Delivery</strong>
                  <p>Pay when you receive your order</p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={submitting}
            >
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="order-summary-sidebar">
            <div className="order-summary card">
              <h2>Order Summary</h2>

              <div className="summary-items">
                {cart.map((item, index) => (
                  <div key={index} className="summary-item">
                    <ProductImage src={item.productImage} alt={item.productName} className="summary-item-image" />
                    <div className="summary-item-details">
                      <h4>{item.productName}</h4>
                      {item.isCustomBouquet && <span className="custom-badge">Custom</span>}
                      {item.hasGreenery && <span className="greenery-badge">+ Greenery</span>}
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <span className="summary-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="summary-row discount-row">
                    <span>Discount ({appliedPromo.code}):</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
