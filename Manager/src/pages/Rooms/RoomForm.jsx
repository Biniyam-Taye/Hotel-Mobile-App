import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { amenitiesList } from '../../data/mockData';

const normalizeInitialData = (data) => {
  if (!data) {
    return {
      roomNumber: '',
      name: '',
      categoryId: '',
      price: '',
      discountedPrice: '',
      maxGuests: 2,
      floor: 1,
      status: 'Available',
      publishStatus: 'Draft',
      isFeatured: false,
      mainImage: '',
      detailImages: ['', '', ''],
      location: 'Adama',
      bedType: '',
      roomSize: '',
      description: '',
      amenities: [],
    };
  }

  const detailImages = [...(data.detailImages || [])];
  while (detailImages.length < 3) detailImages.push('');

  return {
    ...data,
    mainImage: data.mainImage || data.image || '',
    detailImages: detailImages.slice(0, 3),
    amenities: data.amenities || [],
  };
};

export default function RoomForm({ initialData, categories = [], onSave, onCancel, saving = false, error = '' }) {
  const [formData, setFormData] = useState(() => normalizeInitialData(initialData));

  const [mainImagePreview, setMainImagePreview] = useState(
    initialData?.mainImage || initialData?.image || null
  );
  const [detailImagePreviews, setDetailImagePreviews] = useState(() => {
    const images = initialData?.detailImages || [];
    return [0, 1, 2].map((i) => images[i] || null);
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleAmenityChange = (amenityId) => {
    setFormData(prev => {
      const currentAmenities = prev.amenities || [];
      if (currentAmenities.includes(amenityId)) {
        return { ...prev, amenities: currentAmenities.filter(id => id !== amenityId) };
      } else {
        return { ...prev, amenities: [...currentAmenities, amenityId] };
      }
    });
  };

  const handleMainImageChange = (e) => {
    // Mock image upload
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
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
      ];
      const newUrl = dummyUrls[index % 3];
      
      const newPreviews = [...detailImagePreviews];
      newPreviews[index] = newUrl;
      setDetailImagePreviews(newPreviews);
      
      const newDetailImages = [...formData.detailImages];
      newDetailImages[index] = newUrl;
      setFormData(prev => ({ ...prev, detailImages: newDetailImages }));
    }
  };

  const removeDetailImage = (index) => {
    const newPreviews = [...detailImagePreviews];
    newPreviews[index] = null;
    setDetailImagePreviews(newPreviews);
    
    const newDetailImages = [...formData.detailImages];
    newDetailImages[index] = '';
    setFormData(prev => ({ ...prev, detailImages: newDetailImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
      <div className="form-group">
        <label>Main Room Image</label>
        <div className="image-upload-area">
          {mainImagePreview ? (
            <div className="image-preview-wrapper">
              <img src={mainImagePreview} alt="Main Preview" />
              <button 
                type="button" 
                className="remove-image-btn"
                onClick={() => { setMainImagePreview(null); setFormData(prev => ({...prev, mainImage: ''})); }}
              >
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

      <div className="form-group">
        <label>Detail Images (3 Photos)</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[0, 1, 2].map((index) => (
            <div key={index} className="image-upload-area" style={{ minHeight: '120px' }}>
              {detailImagePreviews[index] ? (
                <div className="image-preview-wrapper" style={{ height: '100%' }}>
                  <img src={detailImagePreviews[index]} alt={`Detail ${index + 1}`} style={{ height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={() => removeDetailImage(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder" style={{ padding: '1rem' }}>
                  <UploadCloud size={24} color="#9ca3af" />
                  <span style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Detail {index + 1}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleDetailImageChange(index, e)} hidden />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Room Number *</label>
          <input 
            type="text" 
            name="roomNumber" 
            value={formData.roomNumber} 
            onChange={handleChange} 
            required 
            placeholder="e.g. 101"
          />
        </div>
        <div className="form-group">
          <label>Room Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="e.g. Presidential Suite"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category *</label>
          <select 
            name="categoryId" 
            value={formData.categoryId} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Floor</label>
          <input 
            type="number" 
            name="floor" 
            value={formData.floor} 
            onChange={handleChange} 
            min="1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price (ETB/night) *</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required
            min="0"
            step="1"
            placeholder="e.g. 6840"
          />
        </div>
        <div className="form-group">
          <label>Discounted Price (ETB/night)</label>
          <input 
            type="number" 
            name="discountedPrice" 
            value={formData.discountedPrice || ''} 
            onChange={handleChange} 
            min="0"
            step="1"
            placeholder="Optional, e.g. 5700"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Max Guests</label>
          <input 
            type="number" 
            name="maxGuests" 
            value={formData.maxGuests} 
            onChange={handleChange} 
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Availability Status</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            name="location" 
            value={formData.location || ''} 
            onChange={handleChange} 
            placeholder="e.g. Adama"
          />
        </div>
        <div className="form-group">
          <label>Room Size (m²)</label>
          <input 
            type="number" 
            name="roomSize" 
            value={formData.roomSize || ''} 
            onChange={handleChange} 
            min="1"
            placeholder="e.g. 85"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <label>Bed Type</label>
          <input 
            type="text" 
            name="bedType" 
            value={formData.bedType || ''} 
            onChange={handleChange} 
            placeholder="e.g. King Size Bed + Sofa Bed"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea 
          name="description" 
          value={formData.description || ''} 
          onChange={handleChange} 
          rows="4"
          placeholder="Enter room description..."
          style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit', resize: 'vertical' }}
        ></textarea>
      </div>

      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label>Room Features / Amenities</label>
        <div className="amenities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
          {amenitiesList.map(amenity => (
            <label key={amenity.id} className="amenity-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
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
          <input 
            type="checkbox" 
            name="isFeatured" 
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          <span style={{ fontWeight: 500, color: '#111827' }}>Featured Room</span>
        </label>
        
        <label className="amenity-checkbox">
          <input 
            type="checkbox" 
            name="publishStatus" 
            checked={formData.publishStatus === 'Published'}
            onChange={(e) => setFormData(prev => ({...prev, publishStatus: e.target.checked ? 'Published' : 'Draft'}))}
          />
          <span style={{ fontWeight: 500, color: '#111827' }}>Publish immediately</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save Room'}
        </button>
      </div>
    </form>
  );
}
