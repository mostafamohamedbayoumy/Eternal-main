import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProduct, createProduct, updateProduct } from '../../services/productService';
import { uploadImages } from '../../services/uploadService';
import ProductImage from '../../components/common/ProductImage';
import './ProductForm.css';

const CATEGORIES = ['single-flower', 'filler', 'greenery-filler', 'centerpiece'];
const SERVICES = ['single-bouquet', 'customize-bouquet', 'events'];

const emptyForm = {
  name: '',
  description: '',
  category: 'single-flower',
  price: '',
  stockStatus: 'in-stock',
  applicableServices: [],
  hasGreeneryOption: false,
  greeneryPrice: '',
  images: [],
  imageWithGreenery: '',
};

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getProduct(id)
      .then((res) => {
        const p = res.data;
        setForm({
          name: p.name,
          description: p.description,
          category: p.category,
          price: p.price,
          stockStatus: p.stockStatus,
          applicableServices: p.applicableServices || [],
          hasGreeneryOption: p.hasGreeneryOption || false,
          greeneryPrice: p.greeneryPrice || '',
          images: p.images || [],
          imageWithGreenery: p.imageWithGreenery || '',
        });
      })
      .catch(() => toast.error('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      applicableServices: prev.applicableServices.includes(service)
        ? prev.applicableServices.filter((s) => s !== service)
        : [...prev.applicableServices, service],
    }));
  };

  const handleImageUpload = async (e, field) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const urls = await uploadImages(files);
      setForm((prev) =>
        field === 'images'
          ? { ...prev, images: [...prev.images, ...urls] }
          : { ...prev, imageWithGreenery: urls[0] }
      );
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (url) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((img) => img !== url) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price) {
      toast.error('Please fill in name, description, and price');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        greeneryPrice: form.greeneryPrice ? Number(form.greeneryPrice) : 0,
      };

      if (isEdit) {
        await updateProduct(id, payload);
        toast.success('Product updated');
      } else {
        await createProduct(payload);
        toast.success('Product created');
      }
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="product-form-page">
      <h1>{isEdit ? 'Edit Product' : 'Add Product'}</h1>

      <form className="product-form card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Status</label>
            <select name="stockStatus" value={form.stockStatus} onChange={handleChange}>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Applicable Services</label>
          <div className="checkbox-row">
            {SERVICES.map((service) => (
              <label key={service} className="checkbox-pill">
                <input
                  type="checkbox"
                  checked={form.applicableServices.includes(service)}
                  onChange={() => toggleService(service)}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-pill">
            <input
              type="checkbox"
              name="hasGreeneryOption"
              checked={form.hasGreeneryOption}
              onChange={handleChange}
            />
            Offers a greenery add-on
          </label>
        </div>

        {form.hasGreeneryOption && (
          <div className="form-row">
            <div className="form-group">
              <label>Greenery Add-on Price</label>
              <input
                type="number"
                name="greeneryPrice"
                min="0"
                step="0.01"
                value={form.greeneryPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Image With Greenery</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'imageWithGreenery')} />
              {form.imageWithGreenery && (
                <ProductImage src={form.imageWithGreenery} alt="With greenery" className="form-image-preview" />
              )}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, 'images')}
            disabled={uploading}
          />
          {uploading && <p className="upload-hint">Uploading...</p>}
          <div className="image-preview-row">
            {form.images.map((url) => (
              <div key={url} className="image-preview-tile">
                <ProductImage src={url} alt="Product" className="form-image-preview" />
                <button type="button" className="image-remove-btn" onClick={() => removeImage(url)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Product'}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/admin/products')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
