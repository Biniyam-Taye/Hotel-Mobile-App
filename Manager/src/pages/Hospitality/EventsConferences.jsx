import React, { useState, useEffect } from 'react';
import {
  Plus, Search, Edit, Trash2, Filter, Star,
  UploadCloud, X, Calendar, Users
} from 'lucide-react';
import { eventAmenitiesList } from '../../data/hospitalityMockData';
import Modal from '../../components/common/Modal';
import {
  fetchEventCategories,
  fetchEventSpaces,
  createEventSpace,
  updateEventSpace,
  deleteEventSpace,
} from '../../services/eventApi';

export default function EventsConferences() {
  const [spaces, setSpaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [spaceToDelete, setSpaceToDelete] = useState(null);

  const [formData, setFormData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [spacesData, categoriesData] = await Promise.all([
        fetchEventSpaces(),
        fetchEventCategories(),
      ]);
      setSpaces(spacesData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load event spaces');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || 'Unknown';

  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch =
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.spaceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? space.categoryId === categoryFilter : true;
    const matchesStatus = statusFilter ? space.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddClick = () => {
    setEditingSpace(null);
    setImageFile(null);
    setMainImagePreview(null);
    setFormError('');
    setFormData({
      spaceNumber: '',
      name: '',
      categoryId: categories[0]?.id || '',
      price: '',
      discountedPrice: '',
      maxGuests: 50,
      floor: 1,
      status: 'Available',
      publishStatus: 'Draft',
      isFeatured: false,
      spaceSize: '',
      description: '',
      amenities: [],
      specialRates: [],
      badge: 'PREMIUM VENUES',
    });
    setIsFormModalOpen(true);
  };

  const handleEditClick = (space) => {
    setEditingSpace(space);
    setImageFile(null);
    setMainImagePreview(space.image || null);
    setFormError('');
    setFormData({
      ...space,
      price: space.price || '',
      discountedPrice: space.discountedPrice || '',
      floor: space.floor || 1,
      maxGuests: space.maxGuests || 50,
      spaceSize: space.spaceSize || '',
      description: space.description || '',
      amenities: space.amenities || [],
      specialRates: space.specialRates || [],
      badge: space.badge || 'PREMIUM VENUES',
    });
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (space) => {
    setSpaceToDelete(space);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEventSpace(spaceToDelete.id);
      setSpaces(spaces.filter((s) => s.id !== spaceToDelete.id));
      setIsConfirmModalOpen(false);
      setSpaceToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete event space');
    }
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setFormError('');
      setError('');

      const payload = {
        ...formData,
        price: Number(formData.price),
        discountedPrice: formData.discountedPrice ? Number(formData.discountedPrice) : null,
        maxGuests: Number(formData.maxGuests),
        floor: Number(formData.floor),
        spaceSize: formData.spaceSize ? Number(formData.spaceSize) : null,
      };

      if (editingSpace) {
        const updated = await updateEventSpace(editingSpace.id, payload, imageFile);
        setSpaces(spaces.map((s) => (s.id === editingSpace.id ? updated : s)));
      } else {
        const created = await createEventSpace(payload, imageFile);
        setSpaces([created, ...spaces]);
      }

      setIsFormModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save event space');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAmenityChange = (amenityId) => {
    setFormData((prev) => {
      const current = prev.amenities || [];
      if (current.includes(amenityId)) {
        return { ...prev, amenities: current.filter((id) => id !== amenityId) };
      }
      return { ...prev, amenities: [...current, amenityId] };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Events & Conferences</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add New Space
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <div className="data-card" style={{ padding: '1.5rem' }}>
        <div className="table-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div className="search-wrapper" style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search by space name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem' }}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#374151', minWidth: '160px' }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#374151', minWidth: '160px' }}
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        {loading ? (
          <div className="empty-state"><p>Loading event spaces...</p></div>
        ) : filteredSpaces.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Space Details</th>
                  <th>Category</th>
                  <th>Base Rate</th>
                  <th>Floor & Size</th>
                  <th>Capacity</th>
                  <th>Special Day Rates</th>
                  <th>Status</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpaces.map((space) => (
                  <tr key={space.id}>
                    <td>
                      <div className="room-cell">
                        <img
                          src={space.image}
                          alt={space.name}
                          className="room-image"
                          style={{ width: 44, height: 44, borderRadius: '0.375rem', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
                              {space.name}
                            </h4>
                            {space.isFeatured && <Star size={12} fill="#fbbf24" color="#fbbf24" title="Featured Space" />}
                          </div>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                            Space Code: {space.spaceNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      {getCategoryName(space.categoryId)}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#111827' }}>
                        ${space.discountedPrice || space.price}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#6b7280' }}>/day</span>
                      </div>
                      {space.discountedPrice && (
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                          ${space.price}
                        </div>
                      )}
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      <div>Fl. {space.floor}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{space.spaceSize || 0} m²</div>
                    </td>
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#374151' }}>
                        <Users size={14} color="#6b7280" />
                        <span>Up to {space.maxGuests} guests</span>
                      </div>
                    </td>
                    <td>
                      {space.specialRates && space.specialRates.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {space.specialRates.map((r) => (
                            <span
                              key={r.id || r.date}
                              className="status-badge"
                              style={{
                                backgroundColor: '#fef3c7',
                                color: '#92400e',
                                fontSize: '0.7rem',
                                display: 'inline-flex',
                                padding: '0.125rem 0.5rem',
                                gap: '0.25rem',
                                whiteSpace: 'nowrap',
                                border: '1px dashed #f59e0b',
                              }}
                              title={r.label}
                            >
                              <Calendar size={10} style={{ alignSelf: 'center' }} />
                              {r.date}: <strong>${r.price}</strong>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.825rem', color: '#9ca3af', fontStyle: 'italic' }}>None configured</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${space.status.toLowerCase()}`}>
                        {space.status}
                      </span>
                    </td>
                    <td align="right">
                      <div className="action-buttons">
                        <button className="action-btn" title="Edit Space" onClick={() => handleEditClick(space)}>
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete" title="Delete Space" onClick={() => handleDeleteClick(space)}>
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
            <h3>No event spaces found</h3>
            <p>Try adjusting your search filters or add a new space.</p>
          </div>
        )}
      </div>

      {formData && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title={editingSpace ? `Edit Event Space: ${editingSpace.name}` : 'Add New Event Space'}
          footer={null}
        >
          <form onSubmit={handleSaveForm} className="custom-form">
            {formError && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                {formError}
              </div>
            )}

            <div className="form-group">
              <label>Space Main Image</label>
              <div className="image-upload-area">
                {mainImagePreview ? (
                  <div className="image-preview-wrapper" style={{ position: 'relative', height: '160px' }}>
                    <img
                      src={mainImagePreview}
                      alt="Space Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.375rem' }}
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      style={{ position: 'absolute', right: 8, top: 8, padding: '0.25rem', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', border: 'none', cursor: 'pointer' }}
                      onClick={() => { setMainImagePreview(null); setImageFile(null); }}
                    >
                      <X size={16} color="#ef4444" />
                    </button>
                  </div>
                ) : (
                  <label className="upload-placeholder">
                    <UploadCloud size={32} color="#9ca3af" />
                    <span>Click to upload image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                  </label>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Space Code / Number *</label>
                <input type="text" name="spaceNumber" value={formData.spaceNumber} onChange={handleInputChange} required placeholder="e.g. GB-100" />
              </div>
              <div className="form-group">
                <label>Space Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Grand Ballroom" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} required>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Floor</label>
                <input type="number" name="floor" value={formData.floor} onChange={handleInputChange} min="1" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Base Rent Price ($/day) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" placeholder="e.g. 1000" />
              </div>
              <div className="form-group">
                <label>Discounted Price ($/day)</label>
                <input type="number" name="discountedPrice" value={formData.discountedPrice} onChange={handleInputChange} min="0" placeholder="Optional" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Max Capacity (Guests) *</label>
                <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleInputChange} required min="1" placeholder="e.g. 300" />
              </div>
              <div className="form-group">
                <label>Space Size (m²)</label>
                <input type="number" name="spaceSize" value={formData.spaceSize} onChange={handleInputChange} min="1" placeholder="e.g. 250" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Availability Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter event space description..."
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>

            <div className="form-group">
              <label>Amenities / Space Features</label>
              <div className="amenities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem', marginTop: '0.25rem' }}>
                {eventAmenitiesList.map((amenity) => (
                  <label key={amenity.id} className="amenity-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={(formData.amenities || []).includes(amenity.id)}
                      onChange={() => handleAmenityChange(amenity.id)}
                    />
                    <span>{amenity.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row" style={{ alignItems: 'center', marginTop: '0.5rem' }}>
              <label className="amenity-checkbox">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} />
                <span style={{ fontWeight: 500, color: '#111827' }}>Featured Space</span>
              </label>

              <label className="amenity-checkbox">
                <input
                  type="checkbox"
                  name="publishStatus"
                  checked={formData.publishStatus === 'Published'}
                  onChange={(e) => setFormData((prev) => ({ ...prev, publishStatus: e.target.checked ? 'Published' : 'Draft' }))}
                />
                <span style={{ fontWeight: 500, color: '#111827' }}>Publish immediately</span>
              </label>
            </div>

            <div className="form-actions" style={{ marginTop: '1rem' }}>
              <button type="button" className="secondary-btn" onClick={() => setIsFormModalOpen(false)} disabled={saving}>Cancel</button>
              <button type="submit" className="primary-btn" disabled={saving}>
                {saving ? 'Saving...' : 'Save Space Details'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Delete Event Space"
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
            <button className="danger-btn" onClick={confirmDelete}>Delete Space</button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{spaceToDelete?.name}</strong> ({spaceToDelete?.spaceNumber})? This action will remove the space inventory and cannot be undone.</p>
      </Modal>
    </section>
  );
}
