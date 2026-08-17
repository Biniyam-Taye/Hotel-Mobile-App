import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { mockMenuItems } from '../../data/hospitalityMockData';

export default function RestaurantMenu() {
  const [items, setItems] = useState(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddClick = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Restaurant & Menu</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Menu Item
        </button>
      </div>

      <div className="data-card" style={{ padding: '1.5rem' }}>
        <div className="table-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div className="search-wrapper" style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem' }}
            />
          </div>
          
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#374151', minWidth: '150px' }}
          >
            <option value="">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>

        {filteredItems.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="room-cell" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: '0.5rem', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{item.name}</h4>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#4b5563' }}>{item.category}</td>
                    <td style={{ fontWeight: 500 }}>${item.price.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${item.status === 'Available' ? 'published' : 'draft'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td align="right">
                      <div className="action-buttons">
                        <button className="action-btn" onClick={() => handleEditClick(item)}>
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteClick(item.id)}>
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
            <h3>No items found</h3>
            <p>Try adjusting your search filters or add a new item.</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button className="primary-btn" onClick={() => setIsModalOpen(false)}>Save Item</button>
          </>
        }
      >
        <div className="custom-form">
          <div className="form-group">
            <label>Item Name</label>
            <input type="text" defaultValue={editingItem?.name} placeholder="e.g. Grilled Salmon" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select defaultValue={editingItem?.category || 'Breakfast'}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" defaultValue={editingItem?.price} placeholder="0.00" />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" defaultValue={editingItem?.description} placeholder="Short description of the dish..." style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}></textarea>
          </div>
          <div className="form-group">
            <label>Availability Status</label>
            <select defaultValue={editingItem?.status || 'Available'}>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>
        </div>
      </Modal>
    </section>
  );
}
