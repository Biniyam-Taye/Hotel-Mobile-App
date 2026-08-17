import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Clock } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { mockFacilities } from '../../data/hospitalityMockData';

export default function FacilitiesAmenities() {
  const [facilities, setFacilities] = useState(mockFacilities);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);

  const filteredFacilities = facilities.filter(facility => 
    facility.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingFacility(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (facility) => {
    setEditingFacility(facility);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setFacilities(facilities.filter(f => f.id !== id));
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Facilities & Amenities</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Facility
        </button>
      </div>

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

        {filteredFacilities.length > 0 ? (
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
                {filteredFacilities.map(facility => (
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
                        <button className="action-btn delete" onClick={() => handleDeleteClick(facility.id)}>
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
        title={editingFacility ? "Edit Facility" : "Add New Facility"}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="primary-btn" onClick={() => setIsModalOpen(false)}>Save Facility</button>
          </>
        }
      >
        <div className="custom-form">
          <div className="form-group">
            <label>Facility Name</label>
            <input type="text" defaultValue={editingFacility?.title} placeholder="e.g. Infinity Pool" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Operating Hours</label>
              <input type="text" defaultValue={editingFacility?.hours} placeholder="e.g. 06:00 AM - 10:00 PM" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select defaultValue={editingFacility?.status || 'Active'}>
                <option value="Active">Active</option>
                <option value="Closed">Closed for Maintenance</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" defaultValue={editingFacility?.description} placeholder="Short description for the website..." style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}></textarea>
          </div>
        </div>
      </Modal>
    </section>
  );
}
