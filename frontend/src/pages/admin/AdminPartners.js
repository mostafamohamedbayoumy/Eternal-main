import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getPartners, createPartner, deletePartner } from '../../services/partnerService';
import { uploadImages } from '../../services/uploadService';
import EmptyState from '../../components/common/EmptyState';
import './AdminPartners.css';

const emptyForm = { name: '', websiteUrl: '', logoUrl: '' };

const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPartners = async () => {
    try {
      const res = await getPartners();
      setPartners(res.data);
    } catch (error) {
      toast.error('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const [url] = await uploadImages([file]);
      setForm((prev) => ({ ...prev, logoUrl: url }));
    } catch (error) {
      toast.error('Logo upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.logoUrl) {
      toast.error('A partner needs a name and a logo');
      return;
    }

    setSaving(true);
    try {
      await createPartner({ ...form, displayOrder: partners.length });
      toast.success('Partner added');
      setForm(emptyForm);
      fetchPartners();
    } catch (error) {
      toast.error('Failed to add partner');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (partner) => {
    if (!window.confirm(`Remove "${partner.name}" from the partners section?`)) return;

    try {
      await deletePartner(partner._id);
      setPartners((prev) => prev.filter((p) => p._id !== partner._id));
    } catch (error) {
      toast.error('Failed to remove partner');
    }
  };

  return (
    <div className="admin-partners">
      <div className="admin-page-header">
        <h1>Partners</h1>
      </div>

      <form className="partner-form card" onSubmit={handleSubmit}>
        <h3>Add a Partner</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Website (optional)</label>
            <input
              value={form.websiteUrl}
              onChange={(e) => setForm((p) => ({ ...p, websiteUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="form-group">
          <label>Logo *</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading} />
          {form.logoUrl && <img src={form.logoUrl} alt="Logo preview" className="partner-logo-preview" />}
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
          {saving ? 'Adding...' : 'Add Partner'}
        </button>
      </form>

      {loading ? (
        <p>Loading partners...</p>
      ) : partners.length === 0 ? (
        <EmptyState icon="🤝" title="No partners yet" message="Add your first collaboration above." />
      ) : (
        <div className="partner-list">
          {partners.map((partner) => (
            <div key={partner._id} className="partner-list-item card">
              <img src={partner.logoUrl} alt={partner.name} />
              <div className="partner-list-info">
                <h4>{partner.name}</h4>
                {partner.websiteUrl && (
                  <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                    {partner.websiteUrl}
                  </a>
                )}
              </div>
              <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(partner)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPartners;
