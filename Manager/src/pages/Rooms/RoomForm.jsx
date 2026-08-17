import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { mockCategories, amenitiesList } from '../../data/mockData';

export default function RoomForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
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
      image: '',
      location: 'Adama',
      bedType: '',
      roomSize: '',
      description: '',
      amenities: []
    }
  );

  const [imagePreview, setImagePreview] = useState(initialData?.image || null);

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

  const handleImageChange = (e) => {
    // Mock image upload
    const file = e.target.files[0];
    if (file) {
      const dummyUrl = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80';
      setImagePreview(dummyUrl);
      setFormData(prev => ({ ...prev, image: dummyUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <div className="form-group">
        <label>Room Image</label>
        <div className="image-upload-area">
          {imagePreview ? (
            <div className="image-preview-wrapper">
              <img src={imagePreview} alt="Preview" />
              <button 
                type="button" 
                className="remove-image-btn"
                onClick={() => { setImagePreview(null); setFormData(prev => ({...prev, image: ''})); }}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="upload-placeholder">
              <UploadCloud size={32} color="#9ca3af" />
              <span>Click to upload image</span>
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
          )}
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
            {mockCategories.map(cat => (
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
          <label>Price ($/night) *</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Discounted Price ($/night)</label>
          <input 
            type="number" 
            name="discountedPrice" 
            value={formData.discountedPrice || ''} 
            onChange={handleChange} 
            min="0"
            placeholder="Optional"
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
        <button type="submit" className="primary-btn">Save Room</button>
      </div>
    </form>
  );
}
