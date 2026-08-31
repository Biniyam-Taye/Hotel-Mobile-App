import React, { useState, useEffect } from 'react';
import {
  BarChart3, Send, FileText, Upload, Check,
  TrendingUp, Users, BedDouble, Calendar,
  Mail, Paperclip, X, Clock, CheckCircle, Loader, AlertCircle
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const quickStats = [
  { label: 'Occupancy Rate', value: '78%', change: '+5%', icon: BedDouble, color: '#dbeafe', iconColor: '#1d4ed8' },
  { label: 'Total Guests',   value: '1,240', change: '+8%', icon: Users,     color: '#ede9fe', iconColor: '#6d28d9' },
  { label: 'Avg. Stay',      value: '3.4 nights', change: '+0.2', icon: Calendar, color: '#fef3c7', iconColor: '#b45309' },
];

const reportTypes = [
  'Monthly Performance Report',
  'Occupancy & Room Report',
  'Revenue Summary',
  'Guest Satisfaction Report',
  'Maintenance Log',
  'Custom Report',
];

const input = {
  width: '100%', padding: '0.625rem 1rem', borderRadius: '0.625rem',
  border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit',
};

export default function ReportsPage() {
  const [sent, setSent]           = useState([]);
  const [loadingSent, setLoadingSent] = useState(true);
  const [subject, setSubject]     = useState('');
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [message, setMessage]     = useState('');
  const [files, setFiles]         = useState([]);
  const [sending, setSending]     = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError]         = useState('');

  const token = localStorage.getItem('token');
  const authHeaders = { Authorization: `Bearer ${token}` };

  // ── Load sent reports ────────────────────────────────────────────────────────
  const loadSent = async () => {
    setLoadingSent(true);
    try {
      const res  = await fetch(`${API_BASE}/reports/my`, { headers: authHeaders });
      const data = await res.json();
      if (res.ok) setSent(data.data.reports || []);
    } catch {
      // silently fail
    } finally {
      setLoadingSent(false);
    }
  };

  useEffect(() => { loadSent(); }, []);

  // ── File handlers ────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };
  const removeFile = (i) => setFiles(files.filter((_, idx) => idx !== i));

  // ── Send Report ──────────────────────────────────────────────────────────────
  const handleSend = async () => {
    setError('');
    if (!subject.trim()) { setError('Please enter a subject.'); return; }
    setSending(true);

    try {
      const formData = new FormData();
      formData.append('subject', subject.trim());
      formData.append('reportType', reportType);
      formData.append('message', message);
      files.forEach(f => formData.append('files', f));

      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        headers: authHeaders, // NOTE: no Content-Type – browser sets multipart boundary
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to send report');

      setSuccessMsg('Report sent to owner successfully!');
      setSubject('');
      setMessage('');
      setFiles([]);
      loadSent();
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section className="dashboard-section">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        <BarChart3 size={24} style={{ color: '#3b82f6' }} /> Reports
      </h1>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
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

        {/* ── Compose Report ── */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '2rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ width: 38, height: 38, borderRadius: '0.75rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} color="#3b82f6" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>Send Report to Owner</h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>Upload files and deliver to the hotel owner</p>
            </div>
          </div>

          {/* Alerts */}
          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <CheckCircle size={16} color="#16a34a" />
              <span style={{ fontSize: '0.875rem', color: '#166534', fontWeight: 500 }}>{successMsg}</span>
            </div>
          )}
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <AlertCircle size={16} color="#ef4444" />
              <span style={{ fontSize: '0.875rem', color: '#991b1b', fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {/* Report Type */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>Report Type</label>
              <select value={reportType} onChange={e => { setReportType(e.target.value); if (!subject) setSubject(e.target.value); }} style={{ ...input, color: '#111827', background: 'white' }}>
                {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>Subject *</label>
              <input type="text" placeholder="e.g. Monthly Performance Report — August 2026" value={subject} onChange={e => setSubject(e.target.value)} style={input} />
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>Message / Summary</label>
              <textarea placeholder="Write a summary or notes for the owner..." value={message} onChange={e => setMessage(e.target.value)} rows={4}
                style={{ ...input, resize: 'vertical', lineHeight: 1.6, padding: '0.75rem 1rem' }} />
            </div>

            {/* File upload */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.4rem' }}>
                Attach Files (PDF, DOCX, XLSX, ZIP, MP4…)
              </label>
              <label
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', padding: '1.25rem', borderRadius: '0.75rem', border: '2px dashed #e5e7eb', cursor: 'pointer', background: '#f9fafb' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#93c5fd'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
              >
                <Upload size={22} color="#9ca3af" />
                <span style={{ fontSize: '0.825rem', color: '#6b7280', fontWeight: 500 }}>Click to upload files</span>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>PDF, DOCX, XLSX, ZIP, MP4 and more · up to 100 MB each</span>
                <input type="file" multiple onChange={handleFileChange} hidden />
              </label>

              {files.length > 0 && (
                <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {files.map((file, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.875rem', background: '#eff6ff', borderRadius: '0.625rem', border: '1px solid #bfdbfe' }}>
                      <FileText size={15} color="#3b82f6" />
                      <span style={{ flex: 1, fontSize: '0.8rem', color: '#1d4ed8', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#9ca3af', flexShrink: 0 }}>{formatSize(file.size)}</span>
                      <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}>
                        <X size={13} />
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
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', background: sending ? '#6b7280' : 'linear-gradient(135deg,#3b82f6,#2563eb)', color: 'white', fontWeight: 600, fontSize: '0.9rem', cursor: sending ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}
            >
              {sending
                ? <><Loader size={16} style={{ animation: 'rSpin 0.8s linear infinite' }} /> Uploading &amp; Sending…</>
                : <><Send size={17} /> Send Report to Owner</>}
            </button>
          </div>
        </div>

        {/* ── Sent Reports History ── */}
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

          {loadingSent ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: '#9ca3af', gap: '0.5rem', alignItems: 'center' }}>
              <Loader size={20} style={{ animation: 'rSpin 0.8s linear infinite' }} /> Loading…
            </div>
          ) : sent.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
              <FileText size={40} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.3 }} />
              <p style={{ fontSize: '0.875rem' }}>No reports sent yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxHeight: '480px', overflowY: 'auto' }}>
              {sent.map(r => (
                <div key={r._id}
                  style={{ padding: '1rem 1.25rem', borderRadius: '0.875rem', border: '1px solid #f3f4f6', background: '#fafafa' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#dbeafe'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#f3f4f6'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.4rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{r.subject}</h4>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#d1fae5', color: '#065f46', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '9999px', flexShrink: 0 }}>
                      <Check size={11} /> Delivered
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: '#9ca3af', marginBottom: r.attachments?.length > 0 ? '0.5rem' : 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> {formatDate(r.createdAt)}</span>
                  </div>
                  {r.attachments?.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {r.attachments.map((a, i) => {
                        const dlUrl = a.publicId 
                          ? `${API_BASE}/reports/download/${a.publicId}?name=${encodeURIComponent(a.originalName)}&token=${token}`
                          : a.fileUrl;
                        return (
                          <a key={i} href={dlUrl} target="_blank" rel="noreferrer" download={a.originalName}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#eff6ff', color: '#1d4ed8', fontSize: '0.72rem', fontWeight: 500, padding: '0.2rem 0.6rem', borderRadius: '0.375rem', textDecoration: 'none' }}>
                            <Paperclip size={11} /> {a.originalName}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes rSpin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
