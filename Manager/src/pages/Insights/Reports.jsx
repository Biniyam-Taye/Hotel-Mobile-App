import React, { useState } from 'react';
import {
  BarChart3, Send, FileText, Upload, Trash2, Check,
  TrendingUp, DollarSign, Users, BedDouble, Calendar,
  Mail, Paperclip, X, Eye, Clock, CheckCircle
} from 'lucide-react';

const sentReports = [
  {
    id: 1,
    subject: 'Monthly Performance Report — July 2026',
    to: 'owner@villaalpha.com',
    sentAt: 'Aug 1, 2026, 09:00 AM',
    attachments: ['July_Report.pdf'],
    status: 'delivered',
  },
  {
    id: 2,
    subject: 'Q2 Revenue Summary 2026',
    to: 'owner@villaalpha.com',
    sentAt: 'Jul 1, 2026, 08:30 AM',
    attachments: ['Q2_Revenue.pdf', 'Q2_Occupancy.pdf'],
    status: 'delivered',
  },
  {
    id: 3,
    subject: 'Guest Satisfaction Report — June 2026',
    to: 'owner@villaalpha.com',
    sentAt: 'Jun 30, 2026, 11:00 AM',
    attachments: [],
    status: 'delivered',
  },
];

const quickStats = [
  { label: 'Occupancy Rate', value: '78%', change: '+5%', icon: BedDouble, color: '#dbeafe', iconColor: '#1d4ed8' },
  { label: 'Total Guests', value: '1,240', change: '+8%', icon: Users, color: '#ede9fe', iconColor: '#6d28d9' },
  { label: 'Avg. Stay Length', value: '3.4 nights', change: '+0.2', icon: Calendar, color: '#fef3c7', iconColor: '#b45309' },
];

const reportTypes = [
  'Monthly Performance Report',
  'Occupancy & Room Report',
  'Guest Satisfaction Report',
  'Custom Report',
];

export default function ReportsPage() {
  const [sent, setSent] = useState(sentReports);
  const [ownerEmail, setOwnerEmail] = useState('owner@villaalpha.com');
  const [subject, setSubject] = useState('');
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (index) => setFiles(files.filter((_, i) => i !== index));

  const handleSend = () => {
    if (!subject.trim()) { alert('Please enter a subject.'); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccessMsg(`Report sent to ${ownerEmail} successfully!`);
      setSent(prev => [{
        id: Date.now(),
        subject,
        to: ownerEmail,
        sentAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        attachments: files.map(f => f.name),
        status: 'delivered',
      }, ...prev]);
      setSubject('');
      setMessage('');
      setFiles([]);
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1800);
  };

  return (
    <section className="dashboard-section">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        <BarChart3 size={24} style={{ color: '#3b82f6' }} /> Reports
      </h1>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {quickStats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 46, height: 46, borderRadius: '0.875rem', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={s.iconColor} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.2rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600, marginTop: '0.2rem' }}>{s.change} this month</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>

        {/* Compose Report */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ width: 38, height: 38, borderRadius: '0.75rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} color="#3b82f6" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Send Report to Owner</h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>Compose and deliver a report via email</p>
            </div>
          </div>

          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <CheckCircle size={16} color="#16a34a" />
              <span style={{ fontSize: '0.875rem', color: '#166534', fontWeight: 500 }}>{successMsg}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {/* To */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>To (Owner Email)</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={e => setOwnerEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            {/* Report Type */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>Report Type</label>
              <select
                value={reportType}
                onChange={e => { setReportType(e.target.value); setSubject(e.target.value); }}
                style={{ width: '100%', padding: '0.625rem 1rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit', color: '#111827', background: 'white' }}
              >
                {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>Subject *</label>
              <input
                type="text"
                placeholder="e.g. Monthly Performance Report — August 2026"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                style={{ width: '100%', padding: '0.625rem 1rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>Message / Summary</label>
              <textarea
                placeholder="Write a summary or any notes for the owner..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>

            {/* File Attachments */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>Attach PDF Reports</label>
              <label
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.25rem', borderRadius: '0.75rem', border: '2px dashed #e5e7eb', cursor: 'pointer', background: '#f9fafb', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#93c5fd'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
              >
                <Upload size={22} color="#9ca3af" />
                <span style={{ fontSize: '0.825rem', color: '#6b7280', fontWeight: 500 }}>Click to upload PDF files</span>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Supports .pdf, .xlsx, .csv</span>
                <input type="file" multiple accept=".pdf,.xlsx,.csv" onChange={handleFileChange} hidden />
              </label>

              {files.length > 0 && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {files.map((file, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.875rem', background: '#eff6ff', borderRadius: '0.625rem', border: '1px solid #bfdbfe' }}>
                      <FileText size={16} color="#3b82f6" />
                      <span style={{ flex: 1, fontSize: '0.825rem', color: '#1d4ed8', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#9ca3af', flexShrink: 0 }}>{(file.size / 1024).toFixed(1)} KB</span>
                      <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.875rem 1.5rem', borderRadius: '0.75rem', border: 'none', background: sending ? '#6b7280' : 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', fontWeight: 600, fontSize: '0.9rem', cursor: sending ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}
            >
              {sending ? (
                <>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Sending...
                </>
              ) : (
                <><Send size={17} /> Send Report to Owner</>
              )}
            </button>
          </div>
        </div>

        {/* Sent Reports History */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ width: 38, height: 38, borderRadius: '0.75rem', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} color="#16a34a" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Sent Reports</h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>History of reports sent to owner</p>
            </div>
          </div>

          {sent.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
              <FileText size={40} style={{ margin: '0 auto 1rem', display: 'block' }} />
              <p>No reports sent yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {sent.map(r => (
                <div key={r.id} style={{ padding: '1rem 1.25rem', borderRadius: '0.875rem', border: '1px solid #f3f4f6', background: '#fafafa', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#dbeafe'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#f3f4f6'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{r.subject}</h4>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#d1fae5', color: '#065f46', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '9999px', flexShrink: 0 }}>
                      <Check size={11} /> Delivered
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: '#9ca3af', marginBottom: r.attachments.length > 0 ? '0.625rem' : 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={12} /> {r.to}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> {r.sentAt}</span>
                  </div>
                  {r.attachments.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {r.attachments.map((a, i) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#eff6ff', color: '#1d4ed8', fontSize: '0.72rem', fontWeight: 500, padding: '0.2rem 0.6rem', borderRadius: '0.375rem' }}>
                          <Paperclip size={11} /> {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
