import React, { useState } from 'react';
import './TopNavPages.css';
import { Search as SearchIcon, Users, FileText, Key } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#34495e', marginBottom: '40px' }}>
        <div className="topnav-icon-wrap">
          <SearchIcon size={32} />
        </div>
        <div className="topnav-title" style={{ flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search across properties, guests, and invoices..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '16px 20px', fontSize: '18px', 
              border: '2px solid #e2e8f0', borderRadius: '12px', outline: 'none' 
            }}
          />
        </div>
      </div>

      <div className="topnav-content">
        <h3 style={{ color: 'var(--text-dark)', marginTop: '10px' }}>Suggested Categories</h3>
        <div className="topnav-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="topnav-card" style={{ alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '56px', height: '56px', background: '#e0f2fe', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Users size={28} />
            </div>
            <h3 style={{ margin: 0 }}>Guest Profiles</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-light)' }}>Find booking history and info</p>
          </div>
          
          <div className="topnav-card" style={{ alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '56px', height: '56px', background: '#fef08a', color: '#a16207', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Key size={28} />
            </div>
            <h3 style={{ margin: 0 }}>Rooms & Availability</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-light)' }}>Search room types and status</p>
          </div>
          
          <div className="topnav-card" style={{ alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '56px', height: '56px', background: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <FileText size={28} />
            </div>
            <h3 style={{ margin: 0 }}>Invoices & Documents</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-light)' }}>Locate billing and records</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
