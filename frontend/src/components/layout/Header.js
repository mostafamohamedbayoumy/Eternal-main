import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { logout } from '../../services/authService';
import './Header.css';
import logo from '../../assets/LOGO2.png';

const Header = () => {
  const { user, clearUser, isAdmin } = useAuth();
  const { getItemCount } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    clearUser();
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <img src={logo} alt="Eternal Flowers" />
          </Link>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/single-bouquet" onClick={() => setMenuOpen(false)}>Single Bouquets</Link>
            <Link to="/customize" onClick={() => setMenuOpen(false)}>Customize</Link>
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              {getItemCount() > 0 && (
                <span className="cart-badge">{getItemCount()}</span>
              )}
            </Link>
            
            {user && isAdmin && (
              <div className="user-menu">
                <FaUser className="user-icon" />
                <div className="user-dropdown">
                  <Link to="/admin">Admin Dashboard</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
