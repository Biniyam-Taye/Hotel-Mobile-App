import React, { useState } from 'react';
import './TopNavPages.css';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

const Reports = () => {
  const [reports] = useState([
    { id: 'REP-001', name: 'Monthly Financial Summary', type: 'Finance', date: 'Aug 01, 2026' },
    { id: 'REP-002', name: 'Housekeeping Efficiency', type: 'Operations', date: 'Aug 05, 2026' },
    { id: 'REP-003', name: 'Guest Satisfaction Index', type: 'Marketing', date: 'Aug 07, 2026' },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#f39c12' }}>
        <div className="topnav-icon-wrap">
          <FileText size={32} />
        </div>
        <div className="topnav-title">
          <h1>Custom Reports</h1>
          <p>Generate, export, and schedule automated analytics reports.</p>
        </div>
      </div>

      <div className="topnav-content">
        <div className="topnav-card" style={{ flexDirection: 'row', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-light)', marginBottom: '8px' }}>Report Type</label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}>
              <option>Financial Overview</option>
              <option>Occupancy Stats</option>
              <option>Revenue by Channel</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-light)', marginBottom: '8px' }}>Date Range</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', gap: '8px' }}>
              <Calendar size={18} color="var(--text-light)" />
              <span style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Last 30 Days</span>
            </div>
          </div>
          <button style={{ padding: '12px 24px', background: 'var(--primary-orange)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Generate Report
          </button>
        </div>

        <h3 style={{ color: 'var(--text-dark)', marginTop: '10px' }}>Saved Templates</h3>
        <div className="topnav-table-wrap">
          <table className="topnav-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Category</th>
                <th>Last Generated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td><strong>{report.name}</strong></td>
                  <td>
                    <span className={`topnav-badge ${report.type === 'Finance' ? 'badge-green' : report.type === 'Operations' ? 'badge-blue' : 'badge-purple'}`}>
                      {report.type}
                    </span>
                  </td>
                  <td>{report.date}</td>
                  <td>
                    <button style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Download size={16} /> Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
