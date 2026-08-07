import React, { useState } from 'react';
import './Team.css';
import { UserCheck, UserX, ShieldOff, Search, MoreVertical, Plus } from 'lucide-react';

const initialTeam = [
  { id: 1, name: 'Alice Smith', email: 'alice@hotelco.com', role: 'Hotel Manager', status: 'Active', joined: 'Jan 12, 2025', avatar: 'A' },
  { id: 2, name: 'Bob Johnson', email: 'bob@hotelco.com', role: 'Front Desk Officer', status: 'Active', joined: 'Mar 5, 2025', avatar: 'B' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@hotelco.com', role: 'Housekeeping Supervisor', status: 'Suspended', joined: 'Feb 20, 2025', avatar: 'C' },
  { id: 4, name: 'Diana Ross', email: 'diana@hotelco.com', role: 'Restaurant Manager', status: 'Pending Approval', joined: 'Aug 1, 2025', avatar: 'D' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@hotelco.com', role: 'Security Chief', status: 'Active', joined: 'Jun 15, 2025', avatar: 'E' },
  { id: 6, name: 'Fiona Green', email: 'fiona@hotelco.com', role: 'Event Coordinator', status: 'Pending Approval', joined: 'Aug 7, 2025', avatar: 'F' },
];

const statusClass = {
  'Active': 'badge-active',
  'Suspended': 'badge-suspended',
  'Pending Approval': 'badge-pending',
};

const Team = () => {
  const [team, setTeam] = useState(initialTeam);
  const [search, setSearch] = useState('');

  const handleAction = (id, action) => {
    setTeam(prev => prev.map(m => {
      if (m.id !== id) return m;
      if (action === 'approve') return { ...m, status: 'Active' };
      if (action === 'suspend') return { ...m, status: 'Suspended' };
      return m;
    }).filter(m => !(m.id === id && action === 'remove')));
  };

  const filtered = team.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="team-container">
      {/* Page Header */}
      <div className="team-page-header">
        <div>
          <h1 className="team-title">Team Management</h1>
          <p className="team-subtitle">Manage staff roles and access for your hotel operations.</p>
        </div>
        <button className="invite-btn">
          <Plus size={16} /> Invite Member
        </button>
      </div>

      {/* Stats Row */}
      <div className="team-stats-row">
        <div className="team-stat-card">
          <div className="stat-number">{team.length}</div>
          <div className="stat-label">Total Members</div>
        </div>
        <div className="team-stat-card">
          <div className="stat-number text-green">{team.filter(m => m.status === 'Active').length}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="team-stat-card">
          <div className="stat-number text-orange">{team.filter(m => m.status === 'Pending Approval').length}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="team-stat-card">
          <div className="stat-number text-red">{team.filter(m => m.status === 'Suspended').length}</div>
          <div className="stat-label">Suspended</div>
        </div>
      </div>

      {/* Table Card */}
      <div className="team-table-card">
        <div className="team-table-header">
          <h3 className="font-semibold">All Members</h3>
          <div className="team-search">
            <Search size={15} />
            <input
              placeholder="Search by name or role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="team-table-wrapper">
          <table className="team-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(member => (
                <tr key={member.id}>
                  <td>
                    <div className="member-cell">
                      <div className="member-avatar">{member.avatar}</div>
                      <div>
                        <div className="member-name">{member.name}</div>
                        <div className="member-email">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="role-badge">{member.role}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${statusClass[member.status]}`}>{member.status}</span>
                  </td>
                  <td className="joined-date">{member.joined}</td>
                  <td>
                    <div className="action-btns">
                      {member.status !== 'Active' && (
                        <button
                          className="action-btn btn-approve"
                          onClick={() => handleAction(member.id, 'approve')}
                          title="Approve"
                        >
                          <UserCheck size={15} /> Approve
                        </button>
                      )}
                      {member.status === 'Active' && (
                        <button
                          className="action-btn btn-suspend"
                          onClick={() => handleAction(member.id, 'suspend')}
                          title="Suspend"
                        >
                          <ShieldOff size={15} /> Suspend
                        </button>
                      )}
                      <button
                        className="action-btn btn-remove"
                        onClick={() => handleAction(member.id, 'remove')}
                        title="Remove"
                      >
                        <UserX size={15} /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-results">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
