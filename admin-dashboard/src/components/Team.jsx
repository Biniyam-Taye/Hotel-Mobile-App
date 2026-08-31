import React, { useState, useEffect } from 'react';
import './Team.css';
import {
  UserCheck, UserX, ShieldOff, Search, RefreshCw,
  AlertCircle, Loader
} from 'lucide-react';
import {
  fetchManagers, approveManagerApi, suspendManagerApi, removeManagerApi
} from '../services/teamApi';

// ─── Status helpers ────────────────────────────────────────────────────────────
const statusLabel = (approvalStatus) => {
  if (approvalStatus === 'approved')  return 'Active';
  if (approvalStatus === 'suspended') return 'Suspended';
  return 'Pending Approval';
};

const statusClass = {
  'Active':           'badge-active',
  'Suspended':        'badge-suspended',
  'Pending Approval': 'badge-pending',
};

const avatarLetter = (m) =>
  ((m.firstName?.[0] || '') + (m.lastName?.[0] || '')).toUpperCase() || '?';

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

// ─── Team Component ────────────────────────────────────────────────────────────
const Team = () => {
  const [managers, setManagers]         = useState([]);
  const [search, setSearch]             = useState('');
  const [loading, setLoading]           = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError]               = useState('');

  const loadManagers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchManagers();
      setManagers(data);
    } catch (err) {
      setError(err.message || 'Failed to load managers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadManagers(); }, []);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      if (action === 'approve') {
        await approveManagerApi(id);
        setManagers(prev => prev.map(m =>
          m._id === id ? { ...m, approvalStatus: 'approved' } : m
        ));
      } else if (action === 'suspend') {
        await suspendManagerApi(id);
        setManagers(prev => prev.map(m =>
          m._id === id ? { ...m, approvalStatus: 'suspended' } : m
        ));
      } else if (action === 'remove') {
        if (!window.confirm(`Remove ${managers.find(m => m._id === id)?.firstName}'s account permanently?`)) return;
        await removeManagerApi(id);
        setManagers(prev => prev.filter(m => m._id !== id));
      }
    } catch (err) {
      alert(err.message || 'Action failed. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = managers.filter(m => {
    const q = search.toLowerCase();
    return (
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="team-container">
      {/* Page Header */}
      <div className="team-page-header">
        <div>
          <h1 className="team-title">Team Management</h1>
          <p className="team-subtitle">Review and manage manager accounts for your hotel operations.</p>
        </div>
        <button className="invite-btn" onClick={loadManagers}>
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div className="team-stats-row">
        <div className="team-stat-card">
          <div className="stat-number">{managers.length}</div>
          <div className="stat-label">Total Managers</div>
        </div>
        <div className="team-stat-card">
          <div className="stat-number text-green">
            {managers.filter(m => m.approvalStatus === 'approved').length}
          </div>
          <div className="stat-label">Active</div>
        </div>
        <div className="team-stat-card">
          <div className="stat-number text-orange">
            {managers.filter(m => m.approvalStatus === 'pending').length}
          </div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="team-stat-card">
          <div className="stat-number text-red">
            {managers.filter(m => m.approvalStatus === 'suspended').length}
          </div>
          <div className="stat-label">Suspended</div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="team-error-banner">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Table Card */}
      <div className="team-table-card">
        <div className="team-table-header">
          <h3 className="font-semibold">All Managers</h3>
          <div className="team-search">
            <Search size={14} />
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="team-table-wrapper">
          {loading ? (
            <div className="team-loading">
              <Loader size={26} className="spin" />
              <p>Loading manager accounts...</p>
            </div>
          ) : (
            <table className="team-table">
              <thead>
                <tr>
                  <th>Manager</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(member => {
                  const label      = statusLabel(member.approvalStatus);
                  const isActioning = actionLoading === member._id;
                  return (
                    <tr key={member._id}>
                      <td>
                        <div className="member-cell">
                          <div className="member-avatar">{avatarLetter(member)}</div>
                          <div>
                            <div className="member-name">{member.firstName} {member.lastName}</div>
                            <div className="member-email">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="role-badge">{member.phone || '—'}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${statusClass[label]}`}>{label}</span>
                      </td>
                      <td className="joined-date">{formatDate(member.createdAt)}</td>
                      <td>
                        <div className="action-btns">
                          {isActioning ? (
                            <Loader size={16} className="spin" style={{ color: 'var(--text-light)' }} />
                          ) : (
                            <>
                              {label !== 'Active' && (
                                <button
                                  className="action-btn btn-approve"
                                  onClick={() => handleAction(member._id, 'approve')}
                                  title="Approve"
                                >
                                  <UserCheck size={14} /> Approve
                                </button>
                              )}
                              {label === 'Active' && (
                                <button
                                  className="action-btn btn-suspend"
                                  onClick={() => handleAction(member._id, 'suspend')}
                                  title="Suspend"
                                >
                                  <ShieldOff size={14} /> Suspend
                                </button>
                              )}
                              <button
                                className="action-btn btn-remove"
                                onClick={() => handleAction(member._id, 'remove')}
                                title="Remove"
                              >
                                <UserX size={14} /> Remove
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="no-results">
                      {managers.length === 0
                        ? 'No manager accounts registered yet.'
                        : 'No managers match your search.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
