import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { amenitiesList } from '../../data/mockData';

export default function CategoryForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      description: '',
      basePrice: '',
      maxGuests: 1,
      bedConfiguration: '',
      roomSize: '',
      amenities: [],
      image: ''
    }
  );

  const [imagePreview, setImagePreview] = useState(initialData?.image || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    // Mock image upload by just using a dummy URL for now
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload to server and return a URL
      const dummyUrl = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';
      setImagePreview(dummyUrl);
      setFormData(prev => ({ ...prev, image: dummyUrl }));
    }
  };

  const handleAmenityToggle = (amenityId) => {
    setFormData(prev => {
      const currentAmenities = prev.amenities;
      if (currentAmenities.includes(amenityId)) {
        return { ...prev, amenities: currentAmenities.filter(id => id !== amenityId) };
      } else {
        return { ...prev, amenities: [...currentAmenities, amenityId] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <div className="form-group">
        <label>Feature Image</label>
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
          <label>Category Name *</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="e.g. Deluxe Ocean View"
          />
        </div>
        <div className="form-group">
          <label>Base Price ($/night) *</label>
          <input 
            type="number" 
            name="basePrice" 
            value={formData.basePrice} 
            onChange={handleChange} 
            required 
            min="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          rows="3"
          placeholder="Brief description of the room category..."
        ></textarea>
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
          <label>Bed Configuration</label>
          <input 
            type="text" 
            name="bedConfiguration" 
            value={formData.bedConfiguration} 
            onChange={handleChange} 
            placeholder="e.g. 1 King Bed"
          />
        </div>
        <div className="form-group">
          <label>Room Size</label>
          <input 
            type="text" 
            name="roomSize" 
            value={formData.roomSize} 
            onChange={handleChange} 
            placeholder="e.g. 35 sqm"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Amenities</label>
        <div className="amenities-grid">
          {amenitiesList.map(amenity => (
            <label key={amenity.id} className="amenity-checkbox">
              <input 
                type="checkbox" 
                checked={formData.amenities.includes(amenity.id)}
                onChange={() => handleAmenityToggle(amenity.id)}
              />
              <span>{amenity.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-btn">Save Category</button>
      </div>
    </form>
  );
}
