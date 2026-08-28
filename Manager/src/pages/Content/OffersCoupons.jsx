import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Edit, Trash2, Filter, UploadCloud, X, Calendar } from 'lucide-react';
import Modal from '../../components/common/Modal';
import {
  fetchOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from '../../services/offerApi';

const emptyForm = {
  title: '',
  subtitle: '',
  description: '',
  discountTag: '',
  typeTag: '',
  validUntil: '',
  packagePricing: '',
  stayLength: '',
  guests: '',
  status: 'Active',
};

export default function OffersCoupons() {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  // Form state
  const [formData, setFormData] = useState(emptyForm);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [detailImageFiles, setDetailImageFiles] = useState([null, null, null]);
  const [detailImagePreviews, setDetailImagePreviews] = useState([null, null, null]);
  const [highlights, setHighlights] = useState([]);

  // Delete confirmation
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);

  const mainImageInputRef = useRef(null);
  const detailImageInputRefs = [useRef(null), useRef(null), useRef(null)];

  // ── Load offers ──────────────────────────────────────────────────────────────
  const loadOffers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchOffers();
      setOffers(data);
    } catch (err) {
      setError(err.message || 'Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filteredOffers = offers.filter((o) =>
    o.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Reset form ────────────────────────────────────────────────────────────
  const resetForm = (offer = null) => {
    if (offer) {
      setFormData({
        title: offer.title || '',
        subtitle: offer.subtitle || '',
        description: offer.description || '',
        discountTag: offer.discountTag || '',
        typeTag: offer.typeTag || '',
        validUntil: offer.validUntil || '',
        packagePricing: offer.packagePricing || '',
        stayLength: offer.stayLength || '',
        guests: offer.guests || '',
        status: offer.status || 'Active',
      });
      setMainImageFile(null);
      setMainImagePreview(offer.mainImage || null);
      const dImgs = offer.detailImages || [];
      setDetailImageFiles([null, null, null]);
      setDetailImagePreviews([dImgs[0] || null, dImgs[1] || null, dImgs[2] || null]);
      setHighlights(offer.highlights ? offer.highlights.map((h) => ({ ...h })) : []);
    } else {
      setFormData(emptyForm);
      setMainImageFile(null);
      setMainImagePreview(null);
      setDetailImageFiles([null, null, null]);
      setDetailImagePreviews([null, null, null]);
      setHighlights([]);
    }
    setFormError('');
  };

  // ── Open / close handlers ──────────────────────────────────────────────────
  const handleAddClick = () => {
    setEditingOffer(null);
    resetForm(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (offer) => {
    setEditingOffer(offer);
    resetForm(offer);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (offer) => {
    setOfferToDelete(offer);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteOffer(offerToDelete.id);
      setOffers((prev) => prev.filter((o) => o.id !== offerToDelete.id));
      setIsConfirmOpen(false);
      setOfferToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete offer');
      setIsConfirmOpen(false);
    }
  };

  // ── Form field handlers ───────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImageFile(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview(null);
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
  };

  const handleDetailImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newFiles = [...detailImageFiles];
    newFiles[index] = file;
    setDetailImageFiles(newFiles);
    const newPreviews = [...detailImagePreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setDetailImagePreviews(newPreviews);
  };

  const removeDetailImage = (index) => {
    const newFiles = [...detailImageFiles];
    newFiles[index] = null;
    setDetailImageFiles(newFiles);
    const newPreviews = [...detailImagePreviews];
    newPreviews[index] = null;
    setDetailImagePreviews(newPreviews);
    if (detailImageInputRefs[index].current) detailImageInputRefs[index].current.value = '';
  };

  // ── Highlights ─────────────────────────────────────────────────────────────
  const addHighlight = () =>
    setHighlights((prev) => [
      ...prev,
      { id: Date.now().toString(), title: '', description: '' },
    ]);

  const updateHighlight = (index, field, value) => {
    const next = [...highlights];
    next[index] = { ...next[index], [field]: value };
    setHighlights(next);
  };

  const removeHighlight = (index) =>
    setHighlights((prev) => prev.filter((_, i) => i !== index));

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.title.trim()) {
      setFormError('Offer title is required.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required.');
      return;
    }
    if (!formData.validUntil) {
      setFormError('Valid Until date is required.');
      return;
    }

    try {
      setSaving(true);
      setFormError('');

      const payload = { ...formData, highlights };
      const activeDetailFiles = detailImageFiles.filter(Boolean);

      if (editingOffer) {
        const updated = await updateOffer(editingOffer.id, payload, mainImageFile, activeDetailFiles);
        setOffers((prev) => prev.map((o) => (o.id === editingOffer.id ? updated : o)));
      } else {
        const created = await createOffer(payload, mainImageFile, activeDetailFiles);
        setOffers((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save offer');
    } finally {
      setSaving(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Offers &amp; Coupons</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Special Offer
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
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="empty-state"><p>Loading offers...</p></div>
        ) : filteredOffers.length > 0 ? (
          <div className="offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="offer-card" style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '180px', background: '#f3f4f6' }}>
                  {offer.mainImage ? (
                    <img src={offer.mainImage} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                      <UploadCloud size={40} />
                    </div>
                  )}
                  {offer.discountTag && (
                    <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {offer.discountTag}
                    </span>
                  )}
                  {offer.typeTag && (
                    <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#fbbf24', color: '#854d0e', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {offer.typeTag}
                    </span>
                  )}
                  <span style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: offer.status === 'Active' ? '#dcfce7' : '#fee2e2', color: offer.status === 'Active' ? '#166534' : '#991b1b', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600 }}>
                    {offer.status}
                  </span>
                </div>

                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>{offer.title}</h3>
                  {offer.subtitle && (
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#ca8a04', fontWeight: 500, textTransform: 'uppercase' }}>{offer.subtitle}</p>
                  )}
                  <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: '#6b7280', flex: 1 }}>
                    {offer.description.length > 100 ? `${offer.description.substring(0, 100)}...` : offer.description}
                  </p>

                  {offer.validUntil && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem' }}>
                      <Calendar size={14} /> Valid until {new Date(offer.validUntil).toLocaleDateString()}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                    <div className="action-buttons">
                      <button className="action-btn" onClick={() => handleEditClick(offer)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(offer)} title="Delete">
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
            <h3>No offers found</h3>
            <p>Try adjusting your search or add a new special offer.</p>
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingOffer ? 'Edit Special Offer' : 'Add Special Offer'}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)} disabled={saving}>Cancel</button>
            <button className="primary-btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Offer'}
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

          {/* Main Image */}
          <div className="form-group">
            <label>Main Offer Image</label>
            <div className="image-upload-area">
              {mainImagePreview ? (
                <div className="image-preview-wrapper">
                  <img src={mainImagePreview} alt="Main Preview" />
                  <button type="button" className="remove-image-btn" onClick={removeMainImage}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <UploadCloud size={32} color="#9ca3af" />
                  <span>Click to upload main image</span>
                  <input type="file" accept="image/*" onChange={handleMainImageChange} ref={mainImageInputRef} hidden />
                </label>
              )}
            </div>
          </div>

          {/* Title + Discount Tag + Type Tag */}
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label>Offer Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Early Bird Special" required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Discount Tag</label>
              <input type="text" name="discountTag" value={formData.discountTag} onChange={handleChange} placeholder="e.g. 25% OFF" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Type Tag</label>
              <input type="text" name="typeTag" value={formData.typeTag} onChange={handleChange} placeholder="e.g. Popular" />
            </div>
          </div>

          {/* Subtitle + Valid Until */}
          <div className="form-row">
            <div className="form-group">
              <label>Subtitle / Tagline</label>
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="e.g. Perfect for Couples" />
            </div>
            <div className="form-group">
              <label>Valid Until *</label>
              <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} required />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Full marketing description..."
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          {/* Pricing + Stay + Guests + Status */}
          <div className="form-row">
            <div className="form-group">
              <label>Package Pricing</label>
              <input type="text" name="packagePricing" value={formData.packagePricing} onChange={handleChange} placeholder="e.g. ETB 240" />
            </div>
            <div className="form-group">
              <label>Stay Length</label>
              <input type="text" name="stayLength" value={formData.stayLength} onChange={handleChange} placeholder="e.g. 3+ nights" />
            </div>
            <div className="form-group">
              <label>Guests Limit</label>
              <input type="text" name="guests" value={formData.guests} onChange={handleChange} placeholder="e.g. Up to 4" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Detail Images */}
          <div className="form-group" style={{ marginTop: '1.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <label style={{ fontSize: '1rem', color: '#111827', marginBottom: '0.5rem' }}>Detail Images (up to 3)</label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
              These appear on the offer's detail page.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[0, 1, 2].map((index) => (
                <div key={index} className="image-upload-area" style={{ minHeight: '100px' }}>
                  {detailImagePreviews[index] ? (
                    <div className="image-preview-wrapper" style={{ height: '100%' }}>
                      <img src={detailImagePreviews[index]} alt={`Detail ${index + 1}`} style={{ height: '100%', objectFit: 'cover' }} />
                      <button type="button" className="remove-image-btn" onClick={() => removeDetailImage(index)}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="upload-placeholder" style={{ padding: '1rem' }}>
                      <UploadCloud size={20} color="#9ca3af" />
                      <span style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Detail {index + 1}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleDetailImageChange(index, e)}
                        ref={detailImageInputRefs[index]}
                        hidden
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Package Highlights */}
          <div className="form-group" style={{ marginTop: '1.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '1rem', color: '#111827', marginBottom: 0 }}>Package Highlights</label>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Add perks included in this offer.</p>
              </div>
              <button type="button" onClick={addHighlight} className="secondary-btn" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Plus size={14} /> Add Highlight
              </button>
            </div>

            {highlights.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {highlights.map((h, index) => (
                  <div key={h.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f43f5e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', flexShrink: 0 }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={h.title}
                        onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                        placeholder="Highlight Title (e.g. 4th Night Free)"
                        style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.875rem' }}
                      />
                      <input
                        type="text"
                        value={h.description}
                        onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                        placeholder="Short description..."
                        style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '0.875rem' }}
                      />
                    </div>
                    <button type="button" onClick={() => removeHighlight(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px dashed #d1d5db', borderRadius: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                No highlights added yet.
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* ── Delete Confirmation Modal ── */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete Offer"
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
            <button className="primary-btn delete" onClick={confirmDelete}>Delete</button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>{offerToDelete?.title}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </section>
  );
}
