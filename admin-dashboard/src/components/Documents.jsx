import React, { useState, useRef } from 'react';
import './Documents.css';
import {
  Search, Upload, Plus, Grid3x3, List, MoreVertical,
  FileText, FileImage, Film, Archive, Sheet,
  FolderOpen, Star, Clock, Trash2, Download,
  ChevronRight, Eye, Filter, SortAsc
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_FOLDERS = [
  { id: 'f1', name: 'Financial Reports', count: 12, color: '#6366f1', updated: 'Today' },
  { id: 'f2', name: 'Guest Contracts', count: 34, color: '#fa5a2a', updated: '2 days ago' },
  { id: 'f3', name: 'Staff Records', count: 8, color: '#2ecc71', updated: 'Yesterday' },
  { id: 'f4', name: 'Maintenance Logs', count: 21, color: '#f39c12', updated: '3 days ago' },
];

const INITIAL_FILES = [
  { id: 1, name: 'Q2 Revenue Report.pdf', type: 'pdf', size: '2.4 MB', modified: 'Aug 7, 2026', starred: true, category: 'Financial' },
  { id: 2, name: 'Suite 501 Contract.docx', type: 'doc', size: '540 KB', modified: 'Aug 6, 2026', starred: false, category: 'Contracts' },
  { id: 3, name: 'Lobby Renovation Plan.xlsx', type: 'sheet', size: '1.1 MB', modified: 'Aug 5, 2026', starred: true, category: 'Operations' },
  { id: 4, name: 'Brand Guidelines 2026.pdf', type: 'pdf', size: '8.2 MB', modified: 'Aug 4, 2026', starred: false, category: 'Marketing' },
  { id: 5, name: 'Staff Schedule - Aug.xlsx', type: 'sheet', size: '320 KB', modified: 'Aug 3, 2026', starred: false, category: 'HR' },
  { id: 6, name: 'Hotel Promo Video.mp4', type: 'video', size: '145 MB', modified: 'Aug 1, 2026', starred: true, category: 'Marketing' },
  { id: 7, name: 'Pool Area Photos.zip', type: 'archive', size: '34 MB', modified: 'Jul 30, 2026', starred: false, category: 'Operations' },
  { id: 8, name: 'Annual Audit 2025.pdf', type: 'pdf', size: '5.6 MB', modified: 'Jul 28, 2026', starred: false, category: 'Financial' },
  { id: 9, name: 'Room Upgrade Proposal.docx', type: 'doc', size: '890 KB', modified: 'Jul 25, 2026', starred: false, category: 'Operations' },
  { id: 10, name: 'Guest Feedback Q2.xlsx', type: 'sheet', size: '210 KB', modified: 'Jul 20, 2026', starred: false, category: 'Feedback' },
];

const FILE_ICONS = {
  pdf: { icon: FileText, color: '#e74c3c', bg: '#fde8e8' },
  doc: { icon: FileText, color: '#2b579a', bg: '#e8eeff' },
  sheet: { icon: Sheet, color: '#217346', bg: '#e6f4ea' },
  video: { icon: Film, color: '#8b5cf6', bg: '#f0ebff' },
  archive: { icon: Archive, color: '#f39c12', bg: '#fef3e2' },
  image: { icon: FileImage, color: '#fa5a2a', bg: '#fff0eb' },
};

const CATEGORIES = ['All', 'Financial', 'Contracts', 'Operations', 'Marketing', 'HR', 'Feedback'];

// ─── File Card (Grid View) ─────────────────────────────────────────────────
const FileCard = ({ file, onStar, onDelete }) => {
  const [menu, setMenu] = useState(false);
  const cfg = FILE_ICONS[file.type] || FILE_ICONS.doc;
  const Icon = cfg.icon;
  return (
    <div className="doc-card" onMouseLeave={() => setMenu(false)}>
      <div className="doc-card-top">
        <div className="doc-icon-wrap" style={{ background: cfg.bg }}>
          <Icon size={28} color={cfg.color} />
        </div>
        <div className="doc-card-actions">
          <button className={`star-btn ${file.starred ? 'starred' : ''}`} onClick={() => onStar(file.id)}>
            <Star size={15} fill={file.starred ? '#f39c12' : 'none'} color={file.starred ? '#f39c12' : '#bbb'} />
          </button>
          <button className="more-btn" onClick={() => setMenu(m => !m)}>
            <MoreVertical size={15} />
          </button>
          {menu && (
            <div className="doc-menu">
              <button><Eye size={13} /> Preview</button>
              <button><Download size={13} /> Download</button>
              <button className="menu-danger" onClick={() => onDelete(file.id)}><Trash2 size={13} /> Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="doc-card-name">{file.name}</div>
      <div className="doc-card-meta">
        <span className="doc-size">{file.size}</span>
        <span className="doc-tag" style={{ background: cfg.bg, color: cfg.color }}>{file.type.toUpperCase()}</span>
      </div>
      <div className="doc-card-date">{file.modified}</div>
    </div>
  );
};

// ─── File Row (List View) ──────────────────────────────────────────────────
const FileRow = ({ file, onStar, onDelete }) => {
  const cfg = FILE_ICONS[file.type] || FILE_ICONS.doc;
  const Icon = cfg.icon;
  return (
    <tr className="doc-row">
      <td>
        <div className="doc-row-name">
          <div className="doc-row-icon" style={{ background: cfg.bg }}>
            <Icon size={16} color={cfg.color} />
          </div>
          <span>{file.name}</span>
        </div>
      </td>
      <td><span className="doc-tag" style={{ background: cfg.bg, color: cfg.color }}>{file.type.toUpperCase()}</span></td>
      <td className="doc-row-cat">{file.category}</td>
      <td className="doc-row-size">{file.size}</td>
      <td className="doc-row-date">{file.modified}</td>
      <td>
        <div className="row-actions">
          <button className={`star-btn ${file.starred ? 'starred' : ''}`} onClick={() => onStar(file.id)}>
            <Star size={14} fill={file.starred ? '#f39c12' : 'none'} color={file.starred ? '#f39c12' : '#bbb'} />
          </button>
          <button className="row-icon-btn"><Download size={14} /></button>
          <button className="row-icon-btn danger" onClick={() => onDelete(file.id)}><Trash2 size={14} /></button>
        </div>
      </td>
    </tr>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────
const Documents = () => {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [view, setView] = useState('grid'); // grid | list
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [activeSection, setActiveSection] = useState('all'); // all | starred | recent | trash
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();

  const handleStar = (id) => setFiles(f => f.map(x => x.id === id ? { ...x, starred: !x.starred } : x));
  const handleDelete = (id) => setFiles(f => f.filter(x => x.id !== id));

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      type: f.name.split('.').pop().toLowerCase(),
      size: `${(f.size / 1024).toFixed(0)} KB`,
      modified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      starred: false,
      category: 'Operations',
    }));
    setFiles(prev => [...dropped, ...prev]);
  };

  const filtered = files.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || f.category === category;
    const matchSection = activeSection === 'all' ? true
      : activeSection === 'starred' ? f.starred
      : activeSection === 'recent' ? true
      : false;
    return matchSearch && matchCat && matchSection;
  });

  const totalSize = files.reduce((acc, f) => {
    const num = parseFloat(f.size);
    const unit = f.size.includes('MB') ? 1 : 0.001;
    return acc + num * unit;
  }, 0).toFixed(1);

  return (
    <div className="docs-page">
      {/* ── Left Sidebar ── */}
      <div className="docs-sidebar">
        <div className="docs-sidebar-top">
          <button className="upload-btn" onClick={() => fileInputRef.current.click()}>
            <Upload size={16} /> Upload File
          </button>
          <input ref={fileInputRef} type="file" multiple hidden onChange={e => {
            const dropped = Array.from(e.target.files).map((f, i) => ({
              id: Date.now() + i, name: f.name, type: f.name.split('.').pop().toLowerCase(),
              size: `${(f.size / 1024).toFixed(0)} KB`,
              modified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              starred: false, category: 'Operations',
            }));
            setFiles(prev => [...dropped, ...prev]);
          }} />
        </div>

        <nav className="docs-nav">
          <p className="docs-nav-label">Library</p>
          {[
            { key: 'all', label: 'All Files', Icon: FolderOpen, count: files.length },
            { key: 'starred', label: 'Starred', Icon: Star, count: files.filter(f => f.starred).length },
            { key: 'recent', label: 'Recent', Icon: Clock, count: files.slice(0, 5).length },
            { key: 'trash', label: 'Trash', Icon: Trash2, count: 0 },
          ].map(({ key, label, Icon, count }) => (
            <button
              key={key}
              className={`docs-nav-item ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              <Icon size={16} />
              <span>{label}</span>
              <span className="docs-nav-count">{count}</span>
            </button>
          ))}
        </nav>

        <div className="docs-nav">
          <p className="docs-nav-label">Folders</p>
          {INITIAL_FOLDERS.map(folder => (
            <button key={folder.id} className="docs-folder-item">
              <div className="folder-color" style={{ background: folder.color }}></div>
              <div className="folder-info">
                <span className="folder-name">{folder.name}</span>
                <span className="folder-count">{folder.count} files · {folder.updated}</span>
              </div>
              <ChevronRight size={14} className="text-light" />
            </button>
          ))}
        </div>

        <div className="docs-storage-card">
          <div className="storage-icon"><Archive size={18} color="#6366f1" /></div>
          <div className="storage-label">Storage Used</div>
          <div className="storage-bar-wrap">
            <div className="storage-bar" style={{ width: '62%' }}></div>
          </div>
          <div className="storage-meta">{totalSize} MB of 500 MB used</div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="docs-main">
        {/* Toolbar */}
        <div className="docs-toolbar">
          <div className="docs-search-wrap">
            <Search size={16} className="docs-search-icon" />
            <input
              className="docs-search"
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="docs-toolbar-right">
            <div className="cat-pills">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`cat-pill ${category === c ? 'active' : ''}`}
                  onClick={() => setCategory(c)}
                >{c}</button>
              ))}
            </div>
            <div className="view-toggle">
              <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><Grid3x3 size={16} /></button>
              <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><List size={16} /></button>
            </div>
          </div>
        </div>

        {/* Drag-and-drop zone */}
        <div
          className={`drop-zone ${dragging ? 'dragging' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <Upload size={18} /> <span>Drop files anywhere to upload</span>
        </div>

        {/* Count */}
        <div className="docs-count">
          <span>{filtered.length} {filtered.length === 1 ? 'document' : 'documents'}</span>
        </div>

        {/* Grid or List */}
        {view === 'grid' ? (
          <div className="docs-grid">
            {filtered.map(f => <FileCard key={f.id} file={f} onStar={handleStar} onDelete={handleDelete} />)}
            {filtered.length === 0 && <p className="docs-empty">No documents found.</p>}
          </div>
        ) : (
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Name <SortAsc size={12} /></th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => <FileRow key={f.id} file={f} onStar={handleStar} onDelete={handleDelete} />)}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="docs-empty">No documents found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
