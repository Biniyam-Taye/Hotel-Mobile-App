import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import Modal from '../../components/common/Modal';
import {
  fetchFoodCategories,
  fetchMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../../services/restaurantApi';

const emptyForm = {
  name: '',
  category: 'Breakfast',
  price: '',
  description: '',
  status: 'Available',
};

export default function RestaurantMenu() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [itemsData, categoriesData] = await Promise.all([
        fetchMenuItems(),
        fetchFoodCategories(),
      ]);
      setItems(itemsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddClick = () => {
    setEditingItem(null);
    setFormData({
      ...emptyForm,
      category: categories[0]?.name || 'Breakfast',
    });
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      status: item.status,
    });
    setImageFile(null);
    setImagePreview(item.image || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMenuItem(itemToDelete.id);
      setItems(items.filter((i) => i.id !== itemToDelete.id));
      setIsConfirmOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete menu item');
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setFormError('Item name is required.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required.');
      return;
    }
    if (formData.price === '' || Number(formData.price) < 0) {
      setFormError('Valid price is required.');
      return;
    }

    try {
      setSaving(true);
      setFormError('');
      setError('');

      const payload = { ...formData, price: Number(formData.price) };

      if (editingItem) {
        const updated = await updateMenuItem(editingItem.id, payload, imageFile);
        setItems(items.map((i) => (i.id === editingItem.id ? updated : i)));
      } else {
        const created = await createMenuItem(payload, imageFile);
        setItems([created, ...items]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save menu item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Restaurant & Menu</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add Menu Item
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

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
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="empty-state"><p>Loading menu items...</p></div>
        ) : filteredItems.length > 0 ? (
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
                {filteredItems.map((item) => (
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
                    <td style={{ fontWeight: 500 }}>${Number(item.price).toFixed(2)}</td>
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
                        <button className="action-btn delete" onClick={() => handleDeleteClick(item)}>
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
        title={editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsModalOpen(false)} disabled={saving}>Cancel</button>
            <button className="primary-btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Item'}
            </button>
          </>
        }
      >
        <div className="custom-form">
          {formError && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              {formError}
            </div>
          )}
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              placeholder="e.g. Grilled Salmon"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={(e) => handleFormChange('category', e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleFormChange('price', e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Short description of the dish..."
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}
            />
          </div>
          <div className="form-group">
            <label>Availability Status</label>
            <select value={formData.status} onChange={(e) => handleFormChange('status', e.target.value)}>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dish Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ marginTop: '0.75rem', width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '0.5rem' }} />
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Delete Menu Item"
        footer={
          <>
            <button className="secondary-btn" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
            <button className="primary-btn delete" onClick={confirmDelete}>Delete</button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{itemToDelete?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </section>
  );
}
