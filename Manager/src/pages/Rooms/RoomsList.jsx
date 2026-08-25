import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Star, Filter } from 'lucide-react';
import Modal from '../../components/common/Modal';
import RoomForm from './RoomForm';
import {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  buildRoomPayload,
  formatPrice,
} from '../../services/roomApi';
import { fetchCategories } from '../../services/categoryApi';

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [saving, setSaving] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [formError, setFormError] = useState('');

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError('');
      const [roomsData, categoriesData] = await Promise.all([
        fetchRooms(),
        fetchCategories(),
      ]);
      setRooms(roomsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || 'Unknown';

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.name && room.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter ? room.categoryId === categoryFilter : true;
    const matchesStatus = statusFilter ? room.status === statusFilter : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddClick = () => {
    setEditingRoom(null);
    setFormError('');
    setError('');
    setIsFormModalOpen(true);
  };

  const handleEditClick = (room) => {
    setEditingRoom(room);
    setFormError('');
    setError('');
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRoom(roomToDelete.id);
      setRooms(rooms.filter((r) => r.id !== roomToDelete.id));
      setIsConfirmModalOpen(false);
      setRoomToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete room');
    }
  };

  const handleSaveForm = async (formData) => {
    try {
      setSaving(true);
      setFormError('');
      setError('');
      const payload = buildRoomPayload(formData, categories);

      const duplicate = rooms.find(
        (room) =>
          String(room.roomNumber).trim() === payload.roomNumber &&
          (!editingRoom || room.id !== editingRoom.id)
      );
      if (duplicate) {
        setFormError(`Room number "${payload.roomNumber}" already exists. Please choose another number.`);
        return;
      }

      if (editingRoom) {
        const updated = await updateRoom(editingRoom.id, payload);
        setRooms(rooms.map((r) => (r.id === editingRoom.id ? updated : r)));
      } else {
        const created = await createRoom(payload);
        setRooms([...rooms, created]);
      }

      setIsFormModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save room');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="dashboard-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="section-title">Rooms Inventory</h1>
        <button className="primary-btn" onClick={handleAddClick}>
          <Plus size={18} /> Add New Room
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
              placeholder="Search by room number or name..."
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
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#374151', minWidth: '150px' }}
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading rooms...</p>
          </div>
        ) : filteredRooms.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Floor</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th align="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.id}>
                    <td>
                      <div className="room-cell">
                        <img src={room.image || room.mainImage} alt={room.name} className="room-image" style={{ width: 40, height: 40, borderRadius: '0.375rem', objectFit: 'cover' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>Room {room.roomNumber}</h4>
                            {room.isFeatured && <Star size={12} fill="#fbbf24" color="#fbbf24" title="Featured" />}
                          </div>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{room.name || 'Standard'}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#4b5563' }}>{room.categoryName || getCategoryName(room.categoryId)}</td>
                    <td>
                      <div style={{ fontWeight: 500 }}>ETB {formatPrice(room.discountedPrice || room.price)}</div>
                      {room.discountedPrice && (
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                          ETB {formatPrice(room.price)}
                        </div>
                      )}
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#4b5563' }}>Fl. {room.floor}</td>
                    <td>
                      <span className={`status-badge ${room.status.toLowerCase()}`}>
                        {room.status}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${room.publishStatus.toLowerCase()}`}>
                        {room.publishStatus}
                      </span>
                    </td>
                    <td align="right">
                      <div className="action-buttons">
                        <button className="action-btn" title="View/Edit" onClick={() => handleEditClick(room)}>
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete" title="Delete" onClick={() => handleDeleteClick(room)}>
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
            <h3>No rooms found</h3>
            <p>Try adjusting your search filters or add a new room.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setFormError(''); }}
        title={editingRoom ? `Edit Room ${editingRoom.roomNumber}` : 'Add New Room'}
        footer={null}
      >
        <RoomForm
          key={editingRoom?.id || 'new-room'}
          initialData={editingRoom}
          categories={categories}
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
            <button className="danger-btn" onClick={confirmDelete}>Delete Room</button>
          </>
        }
      >
        <p>Are you sure you want to delete Room <strong>{roomToDelete?.roomNumber}</strong>? This action cannot be undone.</p>
      </Modal>
    </section>
  );
}
