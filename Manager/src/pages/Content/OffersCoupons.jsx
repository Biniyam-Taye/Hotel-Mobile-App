import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter, UploadCloud, X, Calendar, Users, Moon } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { mockOffers } from '../../data/contentMockData';

export default function OffersCoupons() {
  const [offers, setOffers] = useState(mockOffers);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  // Form State
  const [formData, setFormData] = useState({});
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [detailImagePreviews, setDetailImagePreviews] = useState([null, null, null]);
  const [highlights, setHighlights] = useState([]);

  const filteredOffers = offers.filter(offer => 
    offer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = (offer = null) => {
    if (offer) {
      setFormData(offer);
      setMainImagePreview(offer.mainImage || null);
      const dImgs = offer.detailImages || [];
      setDetailImagePreviews([dImgs[0] || null, dImgs[1] || null, dImgs[2] || null]);
      setHighlights(offer.highlights ? [...offer.highlights] : []);
    } else {
      setFormData({
        title: '', subtitle: '', description: '', discountTag: '', typeTag: '',
        validUntil: '', packagePricing: '', stayLength: '', guests: '', status: 'Active'
      });
      setMainImagePreview(null);
      setDetailImagePreviews([null, null, null]);
      setHighlights([]);
    }
  };

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

  const handleDeleteClick = (id) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image Handlers
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const dummyUrl = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80';
      setMainImagePreview(dummyUrl);
      setFormData(prev => ({ ...prev, mainImage: dummyUrl }));
    }
  };

  const handleDetailImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const dummyUrls = [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80'
      ];
      const newUrl = dummyUrls[index % 3];
      const newPreviews = [...detailImagePreviews];
      newPreviews[index] = newUrl;
      setDetailImagePreviews(newPreviews);
    }
  };

  const removeDetailImage = (index) => {
    const newPreviews = [...detailImagePreviews];
    newPreviews[index] = null;
    setDetailImagePreviews(newPreviews);
  };

  // Highlights Handlers
  const addHighlight = () => {
    setHighlights([...highlights, { id: Date.now().toString(), title: '', description: '' }]);
  };

  const updateHighlight = (index, field, value) => {
    const newH = [...highlights];
    newH[index][field] = value;
    setHighlights(newH);
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Collect data and save
    const finalData = {
      ...formData,
      detailImages: detailImagePreviews.filter(Boolean),
      highlights
    };
    
    if (editingOffer) {
      setOffers(offers.map(o => o.id === editingOffer.id ? { ...o, ...finalData } : o));
    } else {
      setOffers([...offers, { id: 'o' + Date.now(), ...finalData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Offers & Coupons</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Special Offer
        </button>
      </div>

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

        {filteredOffers.length > 0 ? (
          <div className="offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredOffers.map(offer => (
              <div key={offer.id} className="offer-card" style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={offer.mainImage} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                </div>
                
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#111827' }}>{offer.title}</h3>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#ca8a04', fontWeight: 500, textTransform: 'uppercase' }}>{offer.subtitle}</p>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280', flex: 1 }}>{offer.description.substring(0, 100)}...</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem' }}>
                    <Calendar size={14} /> Valid until {offer.validUntil}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                    <div className="action-buttons">
                      <button className="action-btn" onClick={() => handleEditClick(offer)}>
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(offer.id)}>
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingOffer ? "Edit Special Offer" : "Add Special Offer"}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="primary-btn" onClick={handleSave}>Save Offer</button>
          </>
        }
      >
        <div className="custom-form">
          {/* Main Image */}
          <div className="form-group">
            <label>Main Offer Image</label>
            <div className="image-upload-area">
              {mainImagePreview ? (
                <div className="image-preview-wrapper">
                  <img src={mainImagePreview} alt="Main Preview" />
                  <button type="button" className="remove-image-btn" onClick={() => { setMainImagePreview(null); setFormData(prev => ({...prev, mainImage: ''})); }}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <UploadCloud size={32} color="#9ca3af" />
                  <span>Click to upload main image</span>
                  <input type="file" accept="image/*" onChange={handleMainImageChange} hidden />
                </label>
              )}
            </div>
          </div>

          {/* Details & Tags */}
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
              <input type="text" name="typeTag" value={formData.typeTag} onChange={handleChange} placeholder="e.g. Seasonal" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Subtitle / Tagline</label>
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="e.g. Sun, sea, and savings..." />
            </div>
            <div className="form-group">
              <label>Valid Until</label>
              <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Full marketing description..." style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
          </div>

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
              <label>Guests limit</label>
              <input type="text" name="guests" value={formData.guests} onChange={handleChange} placeholder="e.g. Up to 4" />
            </div>
          </div>

          {/* Detail Images */}
          <div className="form-group" style={{ marginTop: '1.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <label style={{ fontSize: '1rem', color: '#111827', marginBottom: '0.5rem' }}>Detail Images (3 Photos)</label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>These images appear below the main image on the offer's detail page.</p>
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
                      <input type="file" accept="image/*" onChange={(e) => handleDetailImageChange(index, e)} hidden />
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
                <label style={{ fontSize: '1rem', color: '#111827', marginBottom: '0' }}>Package Highlights</label>
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
    </section>
  );
}
