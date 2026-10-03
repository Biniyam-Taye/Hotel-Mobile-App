// src/components/EventBookingForm.jsx
import { useState } from 'react';
import { X, Upload, Calendar, Users, MapPin, DollarSign, ChevronDown, Check } from 'lucide-react';

const EventBookingForm = ({ isOpen, onClose, venue }) => {
  const [formData, setFormData] = useState({
    spaceCode: '',
    category: '',
    basePrice: '',
    discountedPrice: '',
    maxCapacity: '',
    spaceSize: '',
    floor: '',
    availabilityStatus: 'Available',
    description: '',
    amenities: [],
    featuredSpace: false,
    publishImmediately: false
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['Conference Hall', 'Banquet Hall', 'Boardroom', 'Garden', 'Ballroom', 'Meeting Room'];
  const floors = ['1', '2', '3', '4', '5'];
  const availabilityOptions = ['Available', 'Occupied', 'Maintenance'];

  const amenitiesList = [
    'Projector & Screen',
    'PA Sound System',
    'Catering Service',
    'Video Conferencing',
    'High-speed Wi-Fi',
    'Stage & Podium',
    'Climate Control',
    'Cocktail Bar Set'
  ];

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Event space booked successfully! We will contact you within 24 hours.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          background: #ffffff;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0;
          animation: slideUp 0.4s ease;
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
        }

        .modal-container::-webkit-scrollbar {
          width: 6px;
        }
        .modal-container::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 4px;
        }

        .modal-header {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 24px 32px;
          border-radius: 20px 20px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .modal-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .modal-header .subtitle {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin: 2px 0 0;
        }

        .modal-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          padding: 4px;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: #ffffff;
        }

        .modal-body {
          padding: 32px;
        }

        .image-upload-area {
          border: 2px dashed #e5e7eb;
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 24px;
        }

        .image-upload-area:hover {
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.02);
        }

        .image-upload-area .icon {
          color: #d4af37;
          margin-bottom: 8px;
        }

        .image-upload-area .text {
          font-size: 14px;
          color: #6b7280;
        }

        .image-upload-area .text strong {
          color: #1a1a1a;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .form-group label .required {
          color: #ef4444;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          background: #f9fafb;
          width: 100%;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.12);
          background: #ffffff;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 8px;
        }

        .amenity-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .amenity-checkbox:hover {
          background: #fef9e7;
          border-color: rgba(212, 175, 55, 0.2);
        }

        .amenity-checkbox.checked {
          background: #fef9e7;
          border-color: #d4af37;
        }

        .amenity-checkbox .box {
          width: 18px;
          height: 18px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .amenity-checkbox.checked .box {
          background: #d4af37;
          border-color: #d4af37;
        }

        .amenity-checkbox .box svg {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .amenity-checkbox.checked .box svg {
          opacity: 1;
        }

        .amenity-checkbox .label {
          font-size: 13px;
          color: #374151;
        }

        .toggle-group {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          padding-top: 4px;
        }

        .toggle-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .toggle-item .toggle-track {
          width: 40px;
          height: 22px;
          background: #d1d5db;
          border-radius: 9999px;
          position: relative;
          transition: all 0.3s ease;
        }

        .toggle-item .toggle-track.active {
          background: #d4af37;
        }

        .toggle-item .toggle-track .toggle-thumb {
          width: 18px;
          height: 18px;
          background: #ffffff;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .toggle-item .toggle-track.active .toggle-thumb {
          left: 20px;
        }

        .toggle-item .label {
          font-size: 13px;
          color: #374151;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .btn-cancel {
          padding: 10px 32px;
          border: 2px solid #e5e7eb;
          background: transparent;
          color: #6b7280;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .btn-cancel:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .btn-save {
          padding: 10px 32px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .btn-save:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .modal-body {
            padding: 20px;
          }
          .modal-header {
            padding: 18px 20px;
          }
          .modal-header h2 {
            font-size: 20px;
          }
          .amenities-grid {
            grid-template-columns: 1fr;
          }
          .form-actions {
            flex-direction: column;
          }
          .btn-cancel, .btn-save {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .modal-container {
            border-radius: 16px;
          }
          .modal-header {
            padding: 14px 16px;
          }
          .modal-header h2 {
            font-size: 18px;
          }
          .modal-body {
            padding: 16px;
          }
          .image-upload-area {
            padding: 24px 16px;
          }
          .toggle-group {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="modal-header">
            <div>
              <h2>Add New Event Space</h2>
              <p className="subtitle">{venue?.title || 'Event Space Booking'}</p>
            </div>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className="image-upload-area" onClick={() => document.getElementById('imageUpload').click()}>
                <div className="icon">
                  <Upload size={32} />
                </div>
                <div className="text">
                  <strong>Click to upload image</strong> or drag and drop<br />
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>SVG, PNG, JPG (Max 5MB)</span>
                </div>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setSelectedImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </div>

              {/* Form Grid */}
              <div className="form-grid">
                <div className="form-group">
                  <label>Space Code / Number <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. GB-100"
                    value={formData.spaceCode}
                    onChange={(e) => setFormData({...formData, spaceCode: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category <span className="required">*</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Base Rent Price ($/day) <span className="required">*</span></label>
                  <input
                    type="number"
                    placeholder="e.g. 1000"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Discounted Price ($/day) <span style={{fontSize:'11px', color:'#9ca3af'}}>Optional</span></label>
                  <input
                    type="number"
                    placeholder="e.g. 800"
                    value={formData.discountedPrice}
                    onChange={(e) => setFormData({...formData, discountedPrice: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Max Capacity (Guests) <span className="required">*</span></label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({...formData, maxCapacity: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Space Size (m²) <span className="required">*</span></label>
                  <input
                    type="number"
                    placeholder="e.g. 250"
                    value={formData.spaceSize}
                    onChange={(e) => setFormData({...formData, spaceSize: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Space Name <span className="required">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Ballroom"
                    value={formData.spaceName}
                    onChange={(e) => setFormData({...formData, spaceName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Floor <span className="required">*</span></label>
                  <select
                    value={formData.floor}
                    onChange={(e) => setFormData({...formData, floor: e.target.value})}
                    required
                  >
                    <option value="">Select floor</option>
                    {floors.map((f) => (
                      <option key={f} value={f}>Fl. {f}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Availability Status <span className="required">*</span></label>
                  <select
                    value={formData.availabilityStatus}
                    onChange={(e) => setFormData({...formData, availabilityStatus: e.target.value})}
                    required
                  >
                    {availabilityOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter event space description..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div style={{ marginTop: '24px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '8px' }}>
                  Amenities / Space Features
                </label>
                <div className="amenities-grid">
                  {amenitiesList.map((amenity) => (
                    <div
                      key={amenity}
                      className={`amenity-checkbox ${formData.amenities.includes(amenity) ? 'checked' : ''}`}
                      onClick={() => toggleAmenity(amenity)}
                    >
                      <div className="box">
                        <Check size={12} color="#1a1a1a" />
                      </div>
                      <span className="label">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div style={{ marginTop: '20px' }}>
                <div className="toggle-group">
                  <div
                    className="toggle-item"
                    onClick={() => setFormData({...formData, featuredSpace: !formData.featuredSpace})}
                  >
                    <div className={`toggle-track ${formData.featuredSpace ? 'active' : ''}`}>
                      <div className="toggle-thumb"></div>
                    </div>
                    <span className="label">Featured Space</span>
                  </div>
                  <div
                    className="toggle-item"
                    onClick={() => setFormData({...formData, publishImmediately: !formData.publishImmediately})}
                  >
                    <div className={`toggle-track ${formData.publishImmediately ? 'active' : ''}`}>
                      <div className="toggle-thumb"></div>
                    </div>
                    <span className="label">Publish immediately</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Space Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventBookingForm;