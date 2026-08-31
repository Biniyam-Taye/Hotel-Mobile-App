import React, { useState, useEffect } from 'react';
import './Documents.css';
import {
  Search, Grid3x3, List, FileText, FileImage, Film,
  Archive, Star, Trash2, Download, Eye, Loader,
  AlertCircle, RefreshCw, ChevronDown, ChevronUp,
  Send, MessageSquare, Tag
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const SERVER_BASE = API_BASE.replace('/api/v1', '');

// ─── Helpers ──────────────────────────────────────────────────────────────────
const FILE_CFG = {
  pdf:     { color: '#e74c3c', bg: '#fef2f2', label: 'PDF' },
  doc:     { color: '#2b579a', bg: '#eff4ff', label: 'DOC' },
  sheet:   { color: '#217346', bg: '#f0fdf4', label: 'SHEET' },
  slide:   { color: '#b7472a', bg: '#fff7ed', label: 'PPT' },
  video:   { color: '#7c3aed', bg: '#f5f3ff', label: 'VIDEO' },
  archive: { color: '#d97706', bg: '#fffbeb', label: 'ZIP' },
  image:   { color: '#db2777', bg: '#fdf2f8', label: 'IMAGE' },
  audio:   { color: '#0891b2', bg: '#ecfeff', label: 'AUDIO' },
  doc_def: { color: '#374151', bg: '#f9fafb', label: 'FILE' },
};
const fileCfg = (t) => FILE_CFG[t] || FILE_CFG.doc_def;

const fmtSize = (b) => {
  if (!b) return '—';
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(1)} MB`;
};

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

// ─── Download helper ──────────────────────────────────────────────────────────
const triggerDownload = (publicId, filename) => {
  const token = localStorage.getItem('adminToken');
  const url = `${SERVER_BASE}/api/v1/reports/download/${publicId}?name=${encodeURIComponent(filename)}&token=${token}`;
  
  // Create invisible link and trigger native browser download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => a.remove(), 500);
};

const triggerPreview = (publicId, fileUrl) => {
  const token = localStorage.getItem('adminToken');
  const previewUrl = publicId 
    ? `${SERVER_BASE}/api/v1/reports/preview/${publicId}?token=${token}`
    : `${SERVER_BASE}${fileUrl}`;
  window.open(previewUrl, '_blank', 'noopener,noreferrer');
};

const getFileIcon = (type) => {
  if (type === 'video') return Film;
  if (type === 'archive') return Archive;
  if (type === 'image') return FileImage;
  return FileText;
};

// ─── Attachment Pill inside a report card ────────────────────────────────────
const AttachmentRow = ({ att }) => {
  const cfg = fileCfg(att.fileType);
  const Icon = getFileIcon(att.fileType);
  return (
    <div className="doc-att-row">
      <div className="doc-att-icon" style={{ background: cfg.bg }}>
        <Icon size={15} color={cfg.color} />
      </div>
      <span className="doc-att-name" title={att.originalName}>{att.originalName}</span>
      <span className="doc-att-size">{fmtSize(att.size)}</span>
      <span className="doc-att-badge" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
      <div className="doc-att-actions">
        <button
          className="doc-att-btn"
          title="Preview in new tab"
          onClick={() => triggerPreview(att.publicId, att.fileUrl)}
        >
          <Eye size={13} /> Preview
        </button>
        <button
          className="doc-att-btn primary"
          title="Download to local machine"
          onClick={() => triggerDownload(att.publicId, att.originalName)}
        >
          <Download size={13} /> Download
        </button>
      </div>
    </div>
  );
};

// ─── Report Card ──────────────────────────────────────────────────────────────
const ReportCard = ({ report, onStar, onTrash }) => {
  const [expanded, setExpanded] = useState(false);
  const hasMsg = report.message && report.message.trim().length > 0;
  const initials = (report.sender?.firstName?.[0] || '') + (report.sender?.lastName?.[0] || '');

  return (
    <div className={`report-card ${!report.isRead ? 'unread' : ''}`}>
      {/* ── Header row ── */}
      <div className="report-card-header">
        <div className="report-sender-chip">
          <div className="report-avatar">{initials}</div>
          <div>
            <div className="report-sender-name">
              {report.sender?.firstName} {report.sender?.lastName}
            </div>
            <div className="report-sender-role">Manager</div>
          </div>
        </div>

        <div className="report-header-right">
          <span className="report-type-badge">
            <Tag size={10} /> {report.reportType || 'General Report'}
          </span>
          <span className="report-date">{fmtDateTime(report.createdAt)}</span>
          <button
            className={`report-star-btn ${report.isStarred ? 'starred' : ''}`}
            onClick={() => onStar(report._id)}
            title={report.isStarred ? 'Unstar' : 'Star'}
          >
            <Star size={15} fill={report.isStarred ? 'currentColor' : 'none'} />
          </button>
          <button className="report-trash-btn" onClick={() => onTrash(report._id)} title="Move to trash">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* ── Subject ── */}
      <div className="report-subject">
        <Send size={14} style={{ color: '#3b82f6', flexShrink: 0 }} />
        <h3>{report.subject}</h3>
        {!report.isRead && <span className="report-new-badge">NEW</span>}
      </div>

      {/* ── Message / Summary ── */}
      {hasMsg && (
        <div className="report-message-box">
          <MessageSquare size={13} style={{ color: '#6b7280', flexShrink: 0, marginTop: 2 }} />
          <p className="report-message-text">{report.message}</p>
        </div>
      )}

      {/* ── Attachments ── */}
      {report.attachments?.length > 0 && (
        <div className="report-attachments">
          <button
            className="report-att-toggle"
            onClick={() => setExpanded(v => !v)}
          >
            <span>{report.attachments.length} file{report.attachments.length !== 1 ? 's' : ''} attached</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expanded && (
            <div className="report-att-list">
              {report.attachments.map((att, i) => (
                <AttachmentRow key={i} att={att} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Documents = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [search, setSearch]   = useState('');
  const [tab, setTab]         = useState('all');

  const loadReports = async (silent = false) => {
    if (!silent) setLoading(true);
    setError('');
    try {
      const url = tab === 'starred' ? `${API_BASE}/reports?starred=true` : `${API_BASE}/reports`;
      const res  = await fetch(url, { headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load');
      // Mark reports as read
      const list = data.data.reports || [];
      setReports(list);
      // Auto-mark unread as read after viewing
      list.filter(r => !r.isRead).forEach(r =>
        fetch(`${API_BASE}/reports/${r._id}/read`, { method: 'PUT', headers: authHeaders() }).catch(() => {})
      );
    } catch (err) {
      setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => { loadReports(); }, [tab]);

  const handleStar = async (id) => {
    await fetch(`${API_BASE}/reports/${id}/star`, { method: 'PUT', headers: authHeaders() }).catch(() => {});
    setReports(prev => prev.map(r => r._id === id ? { ...r, isStarred: !r.isStarred } : r));
  };

  const handleTrash = async (id) => {
    if (!window.confirm('Move this report to trash?')) return;
    await fetch(`${API_BASE}/reports/${id}/trash`, { method: 'PUT', headers: authHeaders() }).catch(() => {});
    setReports(prev => prev.filter(r => r._id !== id));
  };

  const filtered = reports
    .filter(r => !r.isTrashed)
    .filter(r => {
      const q = search.toLowerCase();
      return !q
        || r.subject?.toLowerCase().includes(q)
        || r.reportType?.toLowerCase().includes(q)
        || `${r.sender?.firstName} ${r.sender?.lastName}`.toLowerCase().includes(q)
        || r.message?.toLowerCase().includes(q);
    });

  const totalFiles   = reports.flatMap(r => r.attachments).length;
  const starredCount = reports.filter(r => r.isStarred).length;
  const unreadCount  = reports.filter(r => !r.isRead).length;

  return (
    <div className="docs-container">
      {/* ── Sidebar ── */}
      <div className="docs-sidebar">
        <div className="docs-sidebar-title">Documents</div>

        <div className="docs-library">
          <p className="docs-section-label">LIBRARY</p>
          {[
            { key: 'all',     label: 'All Reports',  count: reports.filter(r => !r.isTrashed).length },
            { key: 'starred', label: 'Starred',       count: starredCount },
            { key: 'unread',  label: 'Unread',        count: unreadCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              className={`docs-lib-item ${tab === key ? 'active' : ''}`}
              onClick={() => setTab(key)}
            >
              <span>{label}</span>
              {count > 0 && <span className="docs-lib-count">{count}</span>}
            </button>
          ))}
        </div>

        <div className="docs-sidebar-info">
          <div className="docs-stat-row">
            <span>Total Reports</span><strong>{reports.filter(r => !r.isTrashed).length}</strong>
          </div>
          <div className="docs-stat-row">
            <span>Total Files</span><strong>{totalFiles}</strong>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="docs-main">
        {/* Toolbar */}
        <div className="docs-toolbar">
          <div className="docs-search">
            <Search size={15} className="docs-search-icon" />
            <input
              placeholder="Search by subject, manager, report type..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="docs-icon-btn" onClick={() => loadReports()} title="Refresh">
            <RefreshCw size={16} />
          </button>
        </div>

        <p className="docs-count">
          {filtered.length} report{filtered.length !== 1 ? 's' : ''}
        </p>

        {error && (
          <div className="docs-error"><AlertCircle size={15} /> {error}</div>
        )}

        {loading ? (
          <div className="docs-loading">
            <Loader size={28} className="spin" />
            <span>Loading documents…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="docs-empty">
            <Send size={48} style={{ opacity: 0.15, display: 'block', margin: '0 auto 1rem' }} />
            <p>No reports received yet.<br />Reports uploaded by managers will appear here.</p>
          </div>
        ) : (
          <div className="docs-report-list">
            {filtered.map(report => (
              <ReportCard
                key={report._id}
                report={report}
                onStar={handleStar}
                onTrash={handleTrash}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
