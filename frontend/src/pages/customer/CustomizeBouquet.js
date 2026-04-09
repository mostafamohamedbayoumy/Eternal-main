import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import flowerData from '../../data/flowerData';
import './CustomizeBouquet.css';

/* ─── helper: is a hex colour light? ─── */
function isLightColor(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

/* ═══════════════════════════════════════════════════════
   CustomizeBouquet – main page component
   ═══════════════════════════════════════════════════════ */
const CustomizeBouquet = () => {
  /*
    selections = {
      [flowerId]: { colorIndex: number, quantity: number }
    }
  */
  const [selections, setSelections] = useState({});
  const [hasGreenery, setHasGreenery] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const { addToCart } = useCart();
  const summaryRef = useRef(null);

  /* scroll summary into view on mobile when toggled */
  useEffect(() => {
    if (mobileSummaryOpen && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [mobileSummaryOpen]);

  /* ── toggle flower selection ── */
  const toggleFlower = (flowerId) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[flowerId]) {
        delete next[flowerId];
      } else {
        next[flowerId] = { colorIndex: 0, quantity: 1 };
      }
      return next;
    });
  };

  /* ── set colour for a flower ── */
  const setColor = (flowerId, colorIndex) => {
    setSelections((prev) => ({
      ...prev,
      [flowerId]: { ...prev[flowerId], colorIndex },
    }));
  };

  /* ── quantity helpers ── */
  const incrementQty = (flowerId) => {
    setSelections((prev) => ({
      ...prev,
      [flowerId]: {
        ...prev[flowerId],
        quantity: prev[flowerId].quantity + 1,
      },
    }));
  };

  const decrementQty = (flowerId) => {
    setSelections((prev) => {
      const current = prev[flowerId].quantity;
      if (current <= 1) {
        const next = { ...prev };
        delete next[flowerId];
        return next;
      }
      return {
        ...prev,
        [flowerId]: { ...prev[flowerId], quantity: current - 1 },
      };
    });
  };

  /* ── remove flower ── */
  const removeFlower = (flowerId) => {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[flowerId];
      return next;
    });
  };

  /* ── pricing ── */
  const GREENERY_PRICE = 10;
  const selectedIds = Object.keys(selections);
  const totalStems = selectedIds.reduce(
    (sum, id) => sum + selections[id].quantity,
    0,
  );
  const flowersSubtotal = selectedIds.reduce((sum, id) => {
    const flower = flowerData.find((f) => f.id === id);
    return sum + (flower ? flower.price * selections[id].quantity : 0);
  }, 0);
  const greeneryTotal = hasGreenery ? GREENERY_PRICE : 0;
  const grandTotal = flowersSubtotal + greeneryTotal;

  /* ── add to cart ── */
  const handleAddToCart = () => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one flower for your bouquet');
      return;
    }

    const flowerDetails = selectedIds.map((id) => {
      const flower = flowerData.find((f) => f.id === id);
      const sel = selections[id];
      return {
        productId: id,
        productName: flower.name,
        quantity: sel.quantity,
        price: flower.price,
        selectedColor: flower.colors[sel.colorIndex].name,
      };
    });

    // pick the first selected flower's image as the cart thumbnail
    const firstFlower = flowerData.find((f) => f.id === selectedIds[0]);

    const cartItem = {
      productId: 'custom-' + Date.now(),
      productName: 'Custom Bouquet',
      productImage: firstFlower?.image || '',
      price: grandTotal,
      quantity: 1,
      hasGreenery,
      isCustomBouquet: true,
      customBouquetDetails: {
        flowers: flowerDetails,
        greenery: hasGreenery,
        specialInstructions,
      },
    };

    addToCart(cartItem);
    toast.success('Custom bouquet added to cart!');

    // reset
    setSelections({});
    setHasGreenery(false);
    setSpecialInstructions('');
    setMobileSummaryOpen(false);
  };

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  return (
    <div className="cb-page">
      <div className="container-wide">
        {/* ── Header ── */}
        <div className="cb-header">
          <h1 className="fade-in-up">Customize Your Bouquet</h1>
          <p className="cb-subtitle fade-in-up">
            Select your favourite flowers, pick a colour for each, and build a
            bouquet that is uniquely yours.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="cb-layout">
          {/* ────── LEFT: flower picker ────── */}
          <div className="cb-picker">
            {/* step indicator */}
            <div className="cb-step-label">
              <span className="cb-step-num">1</span>
              Choose Your Flowers
            </div>

            <div className="cb-flower-grid">
              {flowerData.map((flower, idx) => {
                const isSelected = !!selections[flower.id];
                return (
                  <div
                    key={flower.id}
                    className={`cb-card ${isSelected ? 'cb-card--selected' : ''}`}
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    {/* image / toggle area */}
                    <button
                      className="cb-card-toggle"
                      onClick={() => toggleFlower(flower.id)}
                      aria-label={
                        isSelected
                          ? `Deselect ${flower.name}`
                          : `Select ${flower.name}`
                      }
                    >
                      <div className="cb-card-img">
                        <img src={flower.image} alt={flower.name} />
                        {/* checkmark badge */}
                        {isSelected && (
                          <span className="cb-card-check">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span className="cb-card-name">{flower.name}</span>
                      <span className="cb-card-price">
                        ${flower.price.toFixed(2)}
                      </span>
                    </button>

                    {/* colour row – only when selected */}
                    {isSelected && (
                      <div className="cb-card-colors">
                        <span className="cb-card-colors-label">
                          {flower.colors[selections[flower.id].colorIndex].name}
                        </span>
                        <div className="cb-card-colors-row">
                          {flower.colors.map((color, ci) => (
                            <button
                              key={color.name}
                              className={`cb-color ${
                                selections[flower.id].colorIndex === ci
                                  ? 'cb-color--active'
                                  : ''
                              }`}
                              style={{ backgroundColor: color.hex }}
                              onClick={() => setColor(flower.id, ci)}
                              title={color.name}
                              aria-label={`Select ${color.name}`}
                            >
                              {selections[flower.id].colorIndex === ci && (
                                <svg
                                  className="cb-color-check"
                                  width="12"
                                  height="12"
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
                        {/* inline quantity */}
                        <div className="cb-card-qty">
                          <button
                            className="cb-qty-btn"
                            onClick={() => decrementQty(flower.id)}
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="cb-qty-val">
                            {selections[flower.id].quantity}
                          </span>
                          <button
                            className="cb-qty-btn"
                            onClick={() => incrementQty(flower.id)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ────── RIGHT: sticky summary panel ────── */}
          <aside
            className={`cb-summary ${mobileSummaryOpen ? 'cb-summary--open' : ''}`}
            ref={summaryRef}
          >
            <div className="cb-summary-inner">
              <h3 className="cb-summary-title">Your Bouquet</h3>

              {/* selected flowers list */}
              {selectedIds.length === 0 ? (
                <p className="cb-summary-empty">
                  No flowers selected yet. Tap on a flower card to begin!
                </p>
              ) : (
                <ul className="cb-summary-list">
                  {selectedIds.map((id) => {
                    const flower = flowerData.find((f) => f.id === id);
                    const sel = selections[id];
                    const color = flower.colors[sel.colorIndex];
                    return (
                      <li key={id} className="cb-summary-item">
                        <img
                          className="cb-summary-thumb"
                          src={flower.image}
                          alt={flower.name}
                        />
                        <div className="cb-summary-item-info">
                          <span className="cb-summary-item-name">
                            {flower.name}
                          </span>
                          <span className="cb-summary-item-meta">
                            <span
                              className="cb-summary-dot"
                              style={{ backgroundColor: color.hex }}
                            />
                            {color.name} &middot; Qty {sel.quantity}
                          </span>
                        </div>
                        <span className="cb-summary-item-price">
                          ${(flower.price * sel.quantity).toFixed(2)}
                        </span>
                        <button
                          className="cb-summary-remove"
                          onClick={() => removeFlower(id)}
                          aria-label={`Remove ${flower.name}`}
                          title="Remove"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* greenery toggle */}
              <div className="cb-summary-section">
                <div className="cb-step-label cb-step-label--sm">
                  <span className="cb-step-num">2</span>
                  Add Greenery
                </div>
                <button
                  className={`cb-greenery-btn ${hasGreenery ? 'cb-greenery-btn--active' : ''}`}
                  onClick={() => setHasGreenery(!hasGreenery)}
                >
                  <span className="cb-greenery-icon">
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
                  <span className="cb-greenery-text">
                    <span className="cb-greenery-title">Greenery Filler</span>
                    <span className="cb-greenery-price">
                      +${GREENERY_PRICE.toFixed(2)}
                    </span>
                  </span>
                  <span className="cb-greenery-switch">
                    <span className="cb-greenery-knob" />
                  </span>
                </button>
              </div>

              {/* special instructions */}
              <div className="cb-summary-section">
                <div className="cb-step-label cb-step-label--sm">
                  <span className="cb-step-num">3</span>
                  Special Instructions
                </div>
                <textarea
                  className="cb-instructions"
                  placeholder="Any special requests or colour pairing preferences?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                />
              </div>

              {/* totals */}
              <div className="cb-summary-totals">
                <div className="cb-summary-row">
                  <span>Flowers ({totalStems} stems)</span>
                  <span>${flowersSubtotal.toFixed(2)}</span>
                </div>
                {hasGreenery && (
                  <div className="cb-summary-row">
                    <span>Greenery Filler</span>
                    <span>${greeneryTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="cb-summary-row cb-summary-row--total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary cb-add-to-cart"
                onClick={handleAddToCart}
                disabled={selectedIds.length === 0}
              >
                Add Custom Bouquet to Cart
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Floating mobile summary toggle ── */}
      {selectedIds.length > 0 && (
        <button
          className="cb-fab"
          onClick={() => setMobileSummaryOpen((o) => !o)}
          aria-label="View bouquet summary"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.5-3 11-8 0 0-2-1-4-1" />
            <path d="M2 2s7 2 10 9" />
          </svg>
          <span className="cb-fab-badge">{totalStems}</span>
        </button>
      )}
    </div>
  );
};

export default CustomizeBouquet;
