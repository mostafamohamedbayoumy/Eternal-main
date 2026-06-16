import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';
import ProductForm from './ProductForm';
import AdminOrders from './AdminOrders';
import AdminPartners from './AdminPartners';
import EmptyState from '../../components/common/EmptyState';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar-title">Eternal Admin</h2>
        <nav>
          <NavLink to="/admin" end>Overview</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/partners">Partners</NavLink>
          <NavLink to="/admin/events">Event Requests</NavLink>
          <NavLink to="/admin/promo-codes">Promo Codes</NavLink>
          <NavLink to="/admin/offers">Offers</NavLink>
        </nav>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/partners" element={<AdminPartners />} />
          <Route
            path="/events"
            element={
              <EmptyState icon="🎉" title="Coming soon" message="Event request management isn't built yet." />
            }
          />
          <Route
            path="/promo-codes"
            element={
              <EmptyState icon="🎫" title="Coming soon" message="Promo code management isn't built yet." />
            }
          />
          <Route
            path="/offers"
            element={<EmptyState icon="🎁" title="Coming soon" message="Offer management isn't built yet." />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
