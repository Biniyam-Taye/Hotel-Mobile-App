import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Power } from 'lucide-react';
import { mockCategories } from '../../data/mockData';
import Modal from '../../components/common/Modal';
import CategoryForm from './CategoryForm';

export default function RoomCategoriesList() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingCategory(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    setCategories(categories.filter(c => c.id !== categoryToDelete.id));
    setIsConfirmModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleToggleStatus = (id) => {
    setCategories(categories.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return c;
    }));
  };

  const handleSaveForm = (formData) => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
    } else {
      const newId = `c${categories.length + 1}`;
      setCategories([...categories, { id: newId, ...formData, roomsCount: 0, status: 'Active' }]);
    }
    setIsFormModalOpen(false);
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Room Categories</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="data-card" style={{ padding: '1.5rem' }}>
        <div className="table-controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div className="search-wrapper" style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category Info</th>
                  <th>Base Price</th>
                  <th>Capacity</th>
                  <th>Rooms</th>
                  <th>Status</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map(category => (
                  <tr key={category.id}>
                    <td>
                      <div className="category-cell">
                        <img src={category.image} alt={category.name} className="category-image" />
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{category.name}</h4>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{category.description}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>${category.basePrice}/night</td>
                    <td style={{ fontSize: '0.875rem', color: '#4b5563' }}>Up to {category.maxGuests} guests</td>
                    <td>{category.roomsCount}</td>
                    <td>
                      <span className={`status-badge ${category.status.toLowerCase()}`}>
                        {category.status}
                      </span>
                    </td>
                    <td align="right">
                      <div className="action-buttons">
                        <button className="action-btn" title="Edit" onClick={() => handleEditClick(category)}>
                          <Edit size={16} />
                        </button>
                        <button className="action-btn" title="Toggle Status" onClick={() => handleToggleStatus(category.id)}>
                          <Power size={16} style={{ color: category.status === 'Active' ? '#10b981' : '#6b7280' }}/>
                        </button>
                        <button className="action-btn delete" title="Delete" onClick={() => handleDeleteClick(category)}>
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
            <Tags size={48} color="#d1d5db" />
            <h3>No categories found</h3>
            <p>Try adjusting your search or add a new category.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        footer={null} // Footer is handled inside CategoryForm
      >
        <CategoryForm 
          initialData={editingCategory} 
          onSave={handleSaveForm} 
          onCancel={() => setIsFormModalOpen(false)} 
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
            <button className="danger-btn" onClick={confirmDelete}>Delete Category</button>
          </>
        }
      >
        <p>Are you sure you want to delete the category <strong>{categoryToDelete?.name}</strong>? This action cannot be undone.</p>
      </Modal>

    </section>
  );
}
