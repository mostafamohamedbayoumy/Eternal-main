import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import EmptyState from '../../components/common/EmptyState';
import './AdminOrders.css';

const FILTERS = [
  { label: 'All', value: '' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async (status) => {
    setLoading(true);
    try {
      const res = await getAllOrders(status ? { status } : {});
      setOrders(res.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleStatusChange = async (order, status) => {
    setUpdatingId(order._id);
    try {
      await updateOrderStatus(order._id, { status });
      toast.success(`Order marked as ${status}`);
      setOrders((prev) =>
        filter && filter !== status
          ? prev.filter((o) => o._id !== order._id)
          : prev.map((o) => (o._id === order._id ? { ...o, status } : o))
      );
    } catch (error) {
      toast.error('Failed to update order');
    } finally {
      setUpdatingId(null);
    }
  };

  const customerName = (order) => order.customerId?.name || order.guestInfo?.name || 'Guest';

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <h1>Orders</h1>
      </div>

      <div className="order-filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-tab ${filter === f.value ? 'active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <EmptyState icon="🧾" title="No orders here" message="Orders matching this filter will show up here." />
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{customerName(order)}</td>
                  <td>{order.items.length}</td>
                  <td>${order.totalAfterDiscount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>{order.status}</span>
                  </td>
                  <td className="admin-table-actions">
                    {order.status !== 'delivered' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        disabled={updatingId === order._id}
                        onClick={() => handleStatusChange(order, 'delivered')}
                      >
                        Mark Delivered
                      </button>
                    )}
                    {order.status !== 'cancelled' && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        disabled={updatingId === order._id}
                        onClick={() => handleStatusChange(order, 'cancelled')}
                      >
                        Cancel
                      </button>
                    )}
                    {order.status !== 'ongoing' && (
                      <button
                        className="btn btn-outline btn-sm"
                        disabled={updatingId === order._id}
                        onClick={() => handleStatusChange(order, 'ongoing')}
                      >
                        Reopen
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
