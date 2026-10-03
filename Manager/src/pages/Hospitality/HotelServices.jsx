import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Modal from '../../components/common/Modal';
import {
  fetchHotelServices,
  createHotelService,
  updateHotelService,
  deleteHotelService,
} from '../../services/hotelServiceApi';

const emptyForm = {
  title: '',
  description: '',
  price: '',
  status: 'Active',
  badge: '24/7 CONCIERGE',
  icon: '',
  category: 'other',
};

export default function HotelServices() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchHotelServices();
      setServices(data);
    } catch (err) {
      setError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingService(null);
    setFormData(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      status: service.status,
      badge: service.badge || '24/7 CONCIERGE',
      icon: service.icon || '',
      category: service.category || 'other',
    });
    setImageFile(null);
    setImagePreview(service.image || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteHotelService(serviceToDelete.id);
      setServices(services.filter((s) => s.id !== serviceToDelete.id));
      setIsConfirmOpen(false);
      setServiceToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete service');
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setFormError('Service title is required.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required.');
      return;
    }
    if (!formData.price.trim()) {
      setFormError('Pricing note is required.');
      return;
    }

    try {
      setSaving(true);
      setFormError('');
      setError('');

      if (editingService) {
        const updated = await updateHotelService(editingService.id, formData, imageFile);
        setServices(services.map((s) => (s.id === editingService.id ? updated : s)));
      } else {
        const created = await createHotelService(formData, imageFile);
        setServices([created, ...services]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Hotel Services</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add New Service
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <div className="data-card" style={{ padding: '1.5rem' }}>
        <div className="table-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="search-wrapper" style={{ position: 'relative', flex: '1', maxWidth: '400px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="empty-state"><p>Loading services...</p></div>
        ) : filteredServices.length > 0 ? (
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filteredServices.map((service) => (
              <div key={service.id} className="service-card" style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <img src={service.image} alt={service.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>{service.title}</h3>
                    <span className={`status-badge ${service.status === 'Active' ? 'published' : 'draft'}`} style={{ fontSize: '0.7rem' }}>
                      {service.status}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280', minHeight: '40px' }}>{service.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 500, color: '#4b5563', fontSize: '0.875rem' }}>{service.price}</span>
                    <div className="action-buttons">
                      <button className="action-btn" onClick={() => handleEditClick(service)}>
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(service)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Filter size={48} color="#d1d5db" />
            <h3>No services found</h3>
            <p>Try adjusting your search or add a new service.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)} disabled={saving}>Cancel</button>
            <button className="primary-btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Service'}
            </button>
          </>
        }
      >
        <div className="custom-form">
          {formError && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              {formError}
            </div>
          )}
          <div className="form-group">
            <label>Service Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="e.g. Airport Transfer"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pricing Note</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleFormChange('price', e.target.value)}
                placeholder="e.g. From $50"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => handleFormChange('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Describe the service..."
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}
            />
          </div>
          <div className="form-group">
            <label>Service Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ marginTop: '0.75rem', width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '0.5rem' }} />
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete Service"
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
            <button className="primary-btn delete" onClick={confirmDelete}>Delete</button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{serviceToDelete?.title}</strong>? This action cannot be undone.</p>
      </Modal>
    </section>
  );
}
