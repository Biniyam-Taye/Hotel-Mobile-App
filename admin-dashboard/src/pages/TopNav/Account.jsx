import React, { useState } from 'react';
import './TopNavPages.css';
import { User, CreditCard, Shield, Download } from 'lucide-react';

const Account = () => {
  const [invoices] = useState([
    { id: 'INV-2026-001', date: 'Aug 01, 2026', amount: '$499.00', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Jul 01, 2026', amount: '$499.00', status: 'Paid' },
    { id: 'INV-2026-003', date: 'Jun 01, 2026', amount: '$499.00', status: 'Paid' },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#e74c3c' }}>
        <div className="topnav-icon-wrap">
          <User size={32} />
        </div>
        <div className="topnav-title">
          <h1>Account Settings</h1>
          <p>Manage billing, subscription plans, and enterprise limits.</p>
        </div>
      </div>

      <div className="topnav-content">
        <div className="topnav-grid">
          <div className="topnav-card">
            <h3><Shield size={18} /> Current Plan</h3>
            <div className="topnav-stat">Enterprise</div>
            <p style={{ margin: '8px 0 0', color: 'var(--text-light)', fontSize: '14px' }}>
              Your plan renews on Sep 01, 2026.
            </p>
            <button style={{ marginTop: '16px', padding: '10px', background: 'var(--text-dark)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Upgrade Plan</button>
          </div>
          
          <div className="topnav-card">
            <h3><CreditCard size={18} /> Payment Method</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              <div style={{ width: '48px', height: '32px', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#1e40af' }}>VISA</div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-dark)' }}>•••• •••• •••• 4242</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>Expires 12/28</span>
              </div>
            </div>
            <button style={{ marginTop: 'auto', padding: '10px', background: 'transparent', color: 'var(--text-dark)', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Update Method</button>
          </div>
        </div>

        <div className="topnav-table-wrap">
          <table className="topnav-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td><strong>{inv.id}</strong></td>
                  <td>{inv.date}</td>
                  <td>{inv.amount}</td>
                  <td><span className="topnav-badge badge-green">{inv.status}</span></td>
                  <td>
                    <button style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Download size={16} /> PDF
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

export default Account;
