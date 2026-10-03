import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Power, Filter } from 'lucide-react';
import Modal from '../../components/common/Modal';
import CategoryForm from './CategoryForm';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
  buildCategoryPayload,
  formatPrice,
} from '../../services/categoryApi';

export default function RoomCategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingCategory(null);
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(categoryToDelete.id);
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      setIsConfirmModalOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete category');
      setIsConfirmModalOpen(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updated = await toggleCategoryStatus(id);
      setCategories(categories.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      setError(err.message || 'Failed to update status');
    }
  };

  const handleSaveForm = async (formData) => {
    try {
      setSaving(true);
      setFormError('');
      const payload = buildCategoryPayload(formData);

      const duplicate = categories.find(
        (c) =>
          c.name.toLowerCase() === payload.name.toLowerCase() &&
          (!editingCategory || c.id !== editingCategory.id)
      );
      if (duplicate) {
        setFormError(`Category "${payload.name}" already exists.`);
        return;
      }

      if (editingCategory) {
        const updated = await updateCategory(editingCategory.id, payload);
        setCategories(categories.map((c) => (c.id === editingCategory.id ? updated : c)));
      } else {
        const created = await createCategory(payload);
        setCategories([...categories, created]);
      }

      setIsFormModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Room Categories</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Category
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <div className="data-card" style={{ padding: '1.5rem' }}>
        <div className="table-controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div className="search-wrapper" style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading categories...</p>
          </div>
        ) : filteredCategories.length > 0 ? (
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
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <div className="category-cell">
                        <img
                          src={category.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'}
                          alt={category.name}
                          className="category-image"
                          style={{ width: 48, height: 48, borderRadius: '0.375rem', objectFit: 'cover' }}
                        />
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{category.name}</h4>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>ETB {formatPrice(category.basePrice)}/night</td>
                    <td style={{ fontSize: '0.875rem', color: '#4b5563' }}>Up to {category.maxGuests} guests</td>
                    <td>{category.roomsCount ?? 0}</td>
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
                          <Power size={16} style={{ color: category.status === 'Active' ? '#10b981' : '#6b7280' }} />
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
            <Filter size={48} color="#d1d5db" />
            <h3>No categories found</h3>
            <p>Try adjusting your search or add a new category.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setFormError(''); }}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        footer={null}
      >
        <CategoryForm
          key={editingCategory?.id || 'new-category'}
          initialData={editingCategory}
          onSave={handleSaveForm}
          onCancel={() => { setIsFormModalOpen(false); setFormError(''); }}
          saving={saving}
          error={formError}
        />
      </Modal>

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
