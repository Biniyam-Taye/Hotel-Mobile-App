import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Clock } from 'lucide-react';
import Modal from '../../components/common/Modal';
import {
  fetchFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} from '../../services/facilityApi';

const emptyForm = {
  title: '',
  description: '',
  hours: '',
  status: 'Active',
  badge: 'REJUVENATE',
  icon: '',
};

export default function FacilitiesAmenities() {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);

  const loadFacilities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchFacilities();
      setFacilities(data);
    } catch (err) {
      setError(err.message || 'Failed to load facilities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  const filteredFacilities = facilities.filter((facility) =>
    facility.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingFacility(null);
    setFormData(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleEditClick = (facility) => {
    setEditingFacility(facility);
    setFormData({
      title: facility.title,
      description: facility.description,
      hours: facility.hours,
      status: facility.status,
      badge: facility.badge || 'REJUVENATE',
      icon: facility.icon || '',
    });
    setImageFile(null);
    setImagePreview(facility.image || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (facility) => {
    setFacilityToDelete(facility);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFacility(facilityToDelete.id);
      setFacilities(facilities.filter((f) => f.id !== facilityToDelete.id));
      setIsConfirmOpen(false);
      setFacilityToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete facility');
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
      setFormError('Facility name is required.');
      return;
    }
    if (!formData.hours.trim()) {
      setFormError('Operating hours are required.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required.');
      return;
    }

    try {
      setSaving(true);
      setFormError('');
      setError('');

      if (editingFacility) {
        const updated = await updateFacility(editingFacility.id, formData, imageFile);
        setFacilities(facilities.map((f) => (f.id === editingFacility.id ? updated : f)));
      } else {
        const created = await createFacility(formData, imageFile);
        setFacilities([created, ...facilities]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save facility');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Facilities & Amenities</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Facility
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
              placeholder="Search facilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="empty-state"><p>Loading facilities...</p></div>
        ) : filteredFacilities.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Facility</th>
                  <th>Operating Hours</th>
                  <th>Status</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacilities.map((facility) => (
                  <tr key={facility.id}>
                    <td>
                      <div className="room-cell" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={facility.image} alt={facility.title} style={{ width: 64, height: 48, borderRadius: '0.5rem', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{facility.title}</h4>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{facility.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        <Clock size={14} color="#9ca3af" /> {facility.hours}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${facility.status === 'Active' ? 'published' : 'draft'}`}>
                        {facility.status}
                      </span>
                    </td>
                    <td align="right">
                      <div className="action-buttons">
                        <button className="action-btn" onClick={() => handleEditClick(facility)}>
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteClick(facility)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <Filter size={48} color="#d1d5db" />
            <h3>No facilities found</h3>
            <p>Try adjusting your search or add a new facility.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFacility ? 'Edit Facility' : 'Add New Facility'}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)} disabled={saving}>Cancel</button>
            <button className="primary-btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Facility'}
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
            <label>Facility Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="e.g. Infinity Pool"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Operating Hours</label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => handleFormChange('hours', e.target.value)}
                placeholder="e.g. 06:00 AM - 10:00 PM"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => handleFormChange('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Closed for Maintenance">Closed for Maintenance</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Short description for the website..."
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}
            />
          </div>
          <div className="form-group">
            <label>Facility Image</label>
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
        title="Delete Facility"
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
            <button className="primary-btn delete" onClick={confirmDelete}>Delete</button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{facilityToDelete?.title}</strong>? This action cannot be undone.</p>
      </Modal>
    </section>
  );
}
