import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/events">Event Requests</Link>
          <Link to="/admin/promo-codes">Promo Codes</Link>
          <Link to="/admin/offers">Offers</Link>
        </nav>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/products" element={<div>Products Management</div>} />
          <Route path="/orders" element={<div>Orders Management</div>} />
          <Route path="/events" element={<div>Event Requests Management</div>} />
          <Route path="/promo-codes" element={<div>Promo Codes Management</div>} />
          <Route path="/offers" element={<div>Offers Management</div>} />
        </Routes>
      </main>
    </div>
  );
};

const DashboardHome = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome to the Eternal Flowers Admin Panel</p>
    <div style={{ marginTop: '2rem' }}>
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Products</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Event Requests</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Active Promos</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
