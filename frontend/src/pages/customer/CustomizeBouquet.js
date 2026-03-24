import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getProducts } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import './CustomizeBouquet.css';

const CustomizeBouquet = () => {
  const [flowers, setFlowers] = useState([]);
  const [fillers, setFillers] = useState([]);
  const [greeneryFillers, setGreeneryFillers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlowers, setSelectedFlowers] = useState({});
  const [selectedFillers, setSelectedFillers] = useState({});
  const [selectedGreenery, setSelectedGreenery] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [flowersRes, fillersRes, greeneryRes] = await Promise.all([
        getProducts({ category: 'single-flower', service: 'customize-bouquet' }),
        getProducts({ category: 'filler', service: 'customize-bouquet' }),
        getProducts({ category: 'greenery-filler', service: 'customize-bouquet' }),
      ]);

      setFlowers(flowersRes.data.filter(p => p.stockStatus === 'in-stock'));
      setFillers(fillersRes.data.filter(p => p.stockStatus === 'in-stock'));
      setGreeneryFillers(greeneryRes.data.filter(p => p.stockStatus === 'in-stock'));
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId, quantity, setState) => {
    setState(prev => {
      const updated = { ...prev };
      if (quantity > 0) {
        updated[productId] = quantity;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const calculateTotal = () => {
    let total = 0;

    // Calculate flowers total
    Object.entries(selectedFlowers).forEach(([id, qty]) => {
      const flower = flowers.find(f => f._id === id);
      if (flower) {
        const price = flower.discountedPrice || flower.price;
        total += price * qty;
      }
    });

    // Calculate fillers total
    Object.entries(selectedFillers).forEach(([id, qty]) => {
      const filler = fillers.find(f => f._id === id);
      if (filler) {
        const price = filler.discountedPrice || filler.price;
        total += price * qty;
      }
    });

    // Calculate greenery total
    Object.entries(selectedGreenery).forEach(([id, qty]) => {
      const greenery = greeneryFillers.find(g => g._id === id);
      if (greenery) {
        const price = greenery.discountedPrice || greenery.price;
        total += price * qty;
      }
    });

    return total;
  };

  const getTotalItems = () => {
    const flowersCount = Object.values(selectedFlowers).reduce((sum, qty) => sum + qty, 0);
    const fillersCount = Object.values(selectedFillers).reduce((sum, qty) => sum + qty, 0);
    const greeneryCount = Object.values(selectedGreenery).reduce((sum, qty) => sum + qty, 0);
    return flowersCount + fillersCount + greeneryCount;
  };

  const handleAddToCart = () => {
    const totalItems = getTotalItems();

    if (totalItems === 0) {
      toast.error('Please select at least one item');
      return;
    }

    // Build custom bouquet details
    const customBouquetDetails = {
      flowers: Object.entries(selectedFlowers).map(([id, qty]) => {
        const flower = flowers.find(f => f._id === id);
        return {
          productId: id,
          productName: flower.name,
          quantity: qty,
          price: flower.discountedPrice || flower.price,
        };
      }),
      fillers: Object.entries(selectedFillers).map(([id, qty]) => {
        const filler = fillers.find(f => f._id === id);
        return {
          productId: id,
          productName: filler.name,
          quantity: qty,
          price: filler.discountedPrice || filler.price,
        };
      }),
      greeneryFillers: Object.entries(selectedGreenery).map(([id, qty]) => {
        const greenery = greeneryFillers.find(g => g._id === id);
        return {
          productId: id,
          productName: greenery.name,
          quantity: qty,
          price: greenery.discountedPrice || greenery.price,
        };
      }),
      specialInstructions,
    };

    const cartItem = {
      productId: 'custom-' + Date.now(),
      productName: 'Custom Bouquet',
      productImage: flowers[0]?.images[0] || 'https://via.placeholder.com/300',
      price: calculateTotal(),
      quantity: 1,
      isCustomBouquet: true,
      customBouquetDetails,
    };

    addToCart(cartItem);
    toast.success('Custom bouquet added to cart!');

    // Reset selections
    setSelectedFlowers({});
    setSelectedFillers({});
    setSelectedGreenery({});
    setSpecialInstructions('');
  };

  const ProductSelector = ({ products, selected, setSelected, title }) => (
    <div className="product-selector-section">
      <h3>{title}</h3>
      <div className="products-grid-compact">
        {products.map(product => (
          <div key={product._id} className="product-selector-card">
            <img src={product.images[0]} alt={product.name} />
            <div className="product-selector-info">
              <h4>{product.name}</h4>
              <p className="product-selector-price">
                ${(product.discountedPrice || product.price).toFixed(2)} each
              </p>
              <div className="quantity-selector">
                <button
                  onClick={() => updateQuantity(product._id, (selected[product._id] || 0) - 1, setSelected)}
                  disabled={!selected[product._id]}
                >
                  -
                </button>
                <span>{selected[product._id] || 0}</span>
                <button
                  onClick={() => updateQuantity(product._id, (selected[product._id] || 0) + 1, setSelected)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="customize-bouquet-page">
      <div className="container-wide">
        <div className="page-header">
          <h1 className="fade-in-up">Customize Your Bouquet</h1>
          <p className="page-subtitle fade-in-up">
            Build your dream bouquet from scratch. Select flowers, fillers, and greenery.
          </p>
        </div>

        <div className="customize-layout">
          <div className="customize-main">
            <ProductSelector
              products={flowers}
              selected={selectedFlowers}
              setSelected={setSelectedFlowers}
              title="🌸 Select Flowers"
            />

            <ProductSelector
              products={fillers}
              selected={selectedFillers}
              setSelected={setSelectedFillers}
              title="✨ Add Fillers (Optional)"
            />

            <ProductSelector
              products={greeneryFillers}
              selected={selectedGreenery}
              setSelected={setSelectedGreenery}
              title="🌿 Add Greenery (Optional)"
            />

            <div className="special-instructions-section">
              <h3>Special Instructions</h3>
              <textarea
                placeholder="Any special requests or preferences for your bouquet?"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="customize-summary card">
            <h3>Your Bouquet Summary</h3>

            <div className="summary-section">
              <h4>Flowers Selected: {Object.values(selectedFlowers).reduce((sum, qty) => sum + qty, 0)}</h4>
              {Object.entries(selectedFlowers).map(([id, qty]) => {
                const flower = flowers.find(f => f._id === id);
                return flower ? (
                  <div key={id} className="summary-item">
                    <span>{flower.name} x {qty}</span>
                    <span>${((flower.discountedPrice || flower.price) * qty).toFixed(2)}</span>
                  </div>
                ) : null;
              })}
            </div>

            {Object.keys(selectedFillers).length > 0 && (
              <div className="summary-section">
                <h4>Fillers: {Object.values(selectedFillers).reduce((sum, qty) => sum + qty, 0)}</h4>
                {Object.entries(selectedFillers).map(([id, qty]) => {
                  const filler = fillers.find(f => f._id === id);
                  return filler ? (
                    <div key={id} className="summary-item">
                      <span>{filler.name} x {qty}</span>
                      <span>${((filler.discountedPrice || filler.price) * qty).toFixed(2)}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {Object.keys(selectedGreenery).length > 0 && (
              <div className="summary-section">
                <h4>Greenery: {Object.values(selectedGreenery).reduce((sum, qty) => sum + qty, 0)}</h4>
                {Object.entries(selectedGreenery).map(([id, qty]) => {
                  const greenery = greeneryFillers.find(g => g._id === id);
                  return greenery ? (
                    <div key={id} className="summary-item">
                      <span>{greenery.name} x {qty}</span>
                      <span>${((greenery.discountedPrice || greenery.price) * qty).toFixed(2)}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            <div className="summary-total">
              <span>Total Items: {getTotalItems()}</span>
              <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handleAddToCart}
              disabled={getTotalItems() === 0}
            >
              Add Custom Bouquet to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeBouquet;
