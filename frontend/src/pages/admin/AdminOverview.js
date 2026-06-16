import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrderStats } from '../../services/orderService';
import './AdminOverview.css';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderStats()
      .then((res) => setStats(res.data))
      .catch(() => toast.error('Failed to load statistics'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (!stats) return <p>Could not load statistics.</p>;

  return (
    <div className="admin-overview">
      <h1>Overview</h1>
      <p className="admin-subtitle">Welcome back — here's how Eternal is doing.</p>

      <div className="admin-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Orders This Week</span>
          <span className="stat-value">{stats.ordersThisWeek}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Orders This Month</span>
          <span className="stat-value">{stats.ordersThisMonth}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Orders This Year</span>
          <span className="stat-value">{stats.ordersThisYear}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Products</span>
          <span className="stat-value">{stats.totalProducts}</span>
        </div>
        <div className="stat-card stat-card-accent">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">${stats.totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      <h2 className="admin-section-heading">Orders by Status</h2>
      <div className="status-breakdown">
        <div className="status-pill status-ongoing">
          <span className="status-count">{stats.byStatus.ongoing}</span>
          <span>Ongoing</span>
        </div>
        <div className="status-pill status-delivered">
          <span className="status-count">{stats.byStatus.delivered}</span>
          <span>Delivered</span>
        </div>
        <div className="status-pill status-cancelled">
          <span className="status-count">{stats.byStatus.cancelled}</span>
          <span>Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
