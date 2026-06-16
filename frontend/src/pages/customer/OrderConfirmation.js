import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ProductImage from '../../components/common/ProductImage';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // If no order data, redirect to home
  React.useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="success-icon">
            <FaCheckCircle />
          </div>

          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your order. We've received your request and will start preparing your eternal flowers.
          </p>

          <div className="order-number">
            <span className="label">Order Number:</span>
            <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
          </div>

          {/* Order Details */}
          <div className="order-details-section">
            <h2>Order Details</h2>
            
            <div className="detail-grid">
              <div className="detail-item">
                <FaEnvelope className="icon" />
                <div>
                  <span className="detail-label">Confirmation Email</span>
                  <span className="detail-value">{order.guestInfo.email}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaPhone className="icon" />
                <div>
                  <span className="detail-label">Contact Phone</span>
                  <span className="detail-value">{order.guestInfo.phone}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaMapMarkerAlt className="icon" />
                <div>
                  <span className="detail-label">Delivery Address</span>
                  <span className="detail-value">
                    {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <FaClock className="icon" />
                <div>
                  <span className="detail-label">Estimated Delivery</span>
                  <span className="detail-value">
                    {formatDate(order.deliveryDate)} ({order.deliveryTimeWindow})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="order-items-section">
            <h2>Your Items</h2>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <ProductImage src={item.productImage} alt={item.productName} className="order-item-image" />
                  <div className="item-details">
                    <h3>{item.productName}</h3>
                    {item.isCustomBouquet && <span className="badge">Custom Bouquet</span>}
                    {item.hasGreenery && <span className="badge">+ Greenery</span>}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${order.totalBeforeDiscount.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="total-row discount">
                  <span>Discount:</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${order.totalAfterDiscount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-info">
            <h3>Payment Method</h3>
            <p>💵 Cash on Delivery - Pay when you receive your order</p>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <h3>What's Next?</h3>
            <ol>
              <li>You'll receive a confirmation email at <strong>{order.guestInfo.email}</strong></li>
              <li>We'll prepare your eternal flower arrangement with love and care</li>
              <li>Your order will be delivered on <strong>{formatDate(order.deliveryDate)}</strong></li>
              <li>Pay the delivery person when you receive your beautiful flowers</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
            <button 
              onClick={() => window.print()} 
              className="btn btn-secondary"
            >
              Print Confirmation
            </button>
          </div>

          {/* Contact Support */}
          <div className="support-info">
            <p>Questions about your order? Contact us at:</p>
            <p>
              <FaEnvelope /> support@eternalflowers.com | 
              <FaPhone /> +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
