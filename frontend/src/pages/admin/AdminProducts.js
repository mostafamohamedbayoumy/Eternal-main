import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProducts, deleteProduct } from '../../services/productService';
import ProductImage from '../../components/common/ProductImage';
import EmptyState from '../../components/common/EmptyState';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`Remove "${product.name}"? It will no longer be visible to customers.`)) return;

    try {
      await deleteProduct(product._id);
      toast.success(`${product.name} removed`);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (error) {
      toast.error('Failed to remove product');
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <h1>Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <EmptyState icon="🌸" title="No products yet" message="Add your first product to start selling." />
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <ProductImage
                      src={product.images?.[0]}
                      alt={product.name}
                      className="admin-table-thumb"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <span
                      className={`stock-badge ${product.stockStatus === 'in-stock' ? 'stock-in' : 'stock-out'}`}
                    >
                      {product.stockStatus === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="admin-table-actions">
                    <Link to={`/admin/products/${product._id}/edit`} className="btn btn-secondary btn-sm">
                      Edit
                    </Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(product)}>
                      Remove
                    </button>
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

export default AdminProducts;
