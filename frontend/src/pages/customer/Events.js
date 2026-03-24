import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getProducts } from '../../services/productService';
import { createEventRequest } from '../../services/eventService';
import './Events.css';

const Events = () => {
  const [activeTab, setActiveTab] = useState('centerpieces');
  const [centerpieces, setCenterpieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    location: '',
    city: '',
    state: '',
    zipCode: '',
    details: '',
    expectedGuests: '',
    tableCount: '',
    theme: '',
    colors: '',
    flowerTypes: '',
    style: '',
  });
  const [selectedCenterpieces, setSelectedCenterpieces] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCenterpieces();
  }, []);

  const fetchCenterpieces = async () => {
    try {
      const response = await getProducts({
        category: 'centerpiece',
        service: 'events',
      });
      setCenterpieces(response.data.filter(p => p.stockStatus === 'in-stock'));
    } catch (error) {
      toast.error('Failed to load centerpieces');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateCenterpieceQuantity = (productId, quantity) => {
    setSelectedCenterpieces(prev => {
      const updated = { ...prev };
      if (quantity > 0) {
        updated[productId] = quantity;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in your contact information');
      return false;
    }
    if (!formData.eventDate || !formData.eventTime) {
      toast.error('Please provide event date and time');
      return false;
    }
    if (!formData.location) {
      toast.error('Please provide event location');
      return false;
    }
    if (!formData.details) {
      toast.error('Please provide event details');
      return false;
    }
    if (activeTab === 'centerpieces' && Object.keys(selectedCenterpieces).length === 0) {
      toast.error('Please select at least one centerpiece');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const requestData = {
        guestInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        type: activeTab === 'centerpieces' ? 'stable-centerpieces' : 'custom-booth',
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        location: {
          address: formData.location,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        details: formData.details,
        expectedGuests: formData.expectedGuests ? parseInt(formData.expectedGuests) : undefined,
        tableCount: formData.tableCount ? parseInt(formData.tableCount) : undefined,
      };

      if (activeTab === 'centerpieces') {
        requestData.selectedCenterpieces = Object.entries(selectedCenterpieces).map(([productId, quantity]) => ({
          productId,
          quantity,
        }));
      } else {
        requestData.preferences = {
          theme: formData.theme,
          colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : [],
          flowerTypes: formData.flowerTypes ? formData.flowerTypes.split(',').map(f => f.trim()) : [],
          style: formData.style,
        };
      }

      await createEventRequest(requestData);
      
      toast.success('Event request submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventTime: '',
        location: '',
        city: '',
        state: '',
        zipCode: '',
        details: '',
        expectedGuests: '',
        tableCount: '',
        theme: '',
        colors: '',
        flowerTypes: '',
        style: '',
      });
      setSelectedCenterpieces({});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit event request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="events-page">
      <div className="container">
        <div className="page-header">
          <h1 className="fade-in-up">Event Services</h1>
          <p className="page-subtitle fade-in-up">
            Planning an event? Choose from our centerpieces or request a custom bouquet booth.
          </p>
        </div>

        <div className="events-tabs">
          <button
            className={`tab-button ${activeTab === 'centerpieces' ? 'active' : ''}`}
            onClick={() => setActiveTab('centerpieces')}
          >
            🌺 Stable Centerpieces
          </button>
          <button
            className={`tab-button ${activeTab === 'custom-booth' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom-booth')}
          >
            🎨 Custom Bouquet Booth
          </button>
        </div>

        <div className="events-content">
          {activeTab === 'centerpieces' ? (
            <div className="centerpieces-section">
              <h2>Select Your Centerpieces</h2>
              <p className="section-description">
                Choose from our pre-designed centerpieces. Perfect for weddings, corporate events, and special occasions.
              </p>

              {loading ? (
                <p>Loading centerpieces...</p>
              ) : centerpieces.length === 0 ? (
                <p className="no-products">No centerpieces available at the moment.</p>
              ) : (
                <div className="centerpieces-grid">
                  {centerpieces.map(product => (
                    <div key={product._id} className="centerpiece-card card">
                      <img src={product.images[0]} alt={product.name} />
                      <div className="centerpiece-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="centerpiece-price">${product.price.toFixed(2)} each</p>
                        <div className="quantity-selector">
                          <label>Quantity:</label>
                          <div className="quantity-controls">
                            <button
                              onClick={() => updateCenterpieceQuantity(product._id, (selectedCenterpieces[product._id] || 0) - 1)}
                              disabled={!selectedCenterpieces[product._id]}
                            >
                              -
                            </button>
                            <span>{selectedCenterpieces[product._id] || 0}</span>
                            <button
                              onClick={() => updateCenterpieceQuantity(product._id, (selectedCenterpieces[product._id] || 0) + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="custom-booth-section">
              <h2>Custom Bouquet Booth Request</h2>
              <p className="section-description">
                Request a custom bouquet-making station for your event. Your guests can create their own eternal flower bouquets!
              </p>

              <div className="custom-booth-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Theme</label>
                    <input
                      type="text"
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      placeholder="e.g., Rustic, Modern, Vintage"
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Colors</label>
                    <input
                      type="text"
                      name="colors"
                      value={formData.colors}
                      onChange={handleInputChange}
                      placeholder="e.g., Pink, White, Green (comma separated)"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Flower Types</label>
                    <input
                      type="text"
                      name="flowerTypes"
                      value={formData.flowerTypes}
                      onChange={handleInputChange}
                      placeholder="e.g., Roses, Tulips, Peonies (comma separated)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Style Preference</label>
                    <input
                      type="text"
                      name="style"
                      value={formData.style}
                      onChange={handleInputChange}
                      placeholder="e.g., Minimalist, Lush, Romantic"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expected Number of Guests</label>
                    <input
                      type="number"
                      name="expectedGuests"
                      value={formData.expectedGuests}
                      onChange={handleInputChange}
                      placeholder="50"
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Table Count (if applicable)</label>
                    <input
                      type="number"
                      name="tableCount"
                      value={formData.tableCount}
                      onChange={handleInputChange}
                      placeholder="10"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Form Section */}
          <div className="event-form-section">
            <h2>Event & Contact Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Your Information</h3>
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
                  <div className="form-group">
                    <label>Email *</label>
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

              <div className="form-section">
                <h3>Event Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Event Time *</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Event Location (Address) *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Additional Details</h3>
                <div className="form-group">
                  <label>Tell Us More About Your Event *</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="Please describe your event, any specific requirements, budget considerations, or special requests..."
                    rows={6}
                    required
                  />
                  <small>Include information about theme, color preferences, budget, and any special requirements.</small>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Event Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
