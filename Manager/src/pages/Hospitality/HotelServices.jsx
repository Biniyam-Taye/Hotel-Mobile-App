import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { mockServices } from '../../data/hospitalityMockData';

export default function HotelServices() {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Hotel Services</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add New Service
        </button>
      </div>

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

        {filteredServices.length > 0 ? (
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filteredServices.map(service => (
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
                      <button className="action-btn delete" onClick={() => handleDeleteClick(service.id)}>
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
        title={editingService ? "Edit Service" : "Add New Service"}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="primary-btn" onClick={() => setIsModalOpen(false)}>Save Service</button>
          </>
        }
      >
        <div className="custom-form">
          <div className="form-group">
            <label>Service Title</label>
            <input type="text" defaultValue={editingService?.title} placeholder="e.g. Airport Transfer" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pricing Note</label>
              <input type="text" defaultValue={editingService?.price} placeholder="e.g. From $50" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select defaultValue={editingService?.status || 'Active'}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" defaultValue={editingService?.description} placeholder="Describe the service..." style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}></textarea>
          </div>
        </div>
      </Modal>
    </section>
  );
}
