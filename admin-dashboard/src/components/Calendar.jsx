import React, { useState, useEffect, useCallback } from 'react';
import './Calendar.css';
import {
  ChevronLeft, ChevronRight, Plus, RefreshCw,
  Calendar as CalendarIcon, Clock, MapPin, Tag, X, Check, AlertCircle
} from 'lucide-react';

// ─── Config ────────────────────────────────────────────────────────────────
// To enable Google Calendar integration:
// 1. Go to https://console.cloud.google.com
// 2. Create a project → Enable "Google Calendar API"
// 3. Create OAuth 2.0 credentials (Web application)
// 4. Add http://localhost:5173 to Authorized JavaScript origins
// 5. Copy your Client ID below
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

// ─── Sample Events (fallback / demo) ────────────────────────────────────────
const SAMPLE_EVENTS = [
  { id: 1, title: 'Team Standup', date: new Date().toISOString().slice(0, 10), time: '09:00', color: '#6366f1', tag: 'Meeting', location: 'Conference Room A' },
  { id: 2, title: 'VIP Guest Arrival – Suite 501', date: new Date().toISOString().slice(0, 10), time: '14:00', color: '#fa5a2a', tag: 'Hospitality', location: 'Main Lobby' },
  { id: 3, title: 'Monthly Revenue Review', date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), time: '10:00', color: '#2ecc71', tag: 'Finance', location: 'Board Room' },
  { id: 4, title: 'Staff Training – Fire Safety', date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), time: '13:00', color: '#f39c12', tag: 'Training', location: 'Basement Hall' },
  { id: 5, title: 'Gala Dinner Setup', date: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10), time: '17:00', color: '#e74c3c', tag: 'Event', location: 'Grand Ballroom' },
  { id: 6, title: 'Supplier Meeting – Linens Co.', date: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10), time: '11:00', color: '#8b5cf6', tag: 'Procurement', location: 'Manager\'s Office' },
];

const TAG_COLORS = { Meeting: '#6366f1', Hospitality: '#fa5a2a', Finance: '#2ecc71', Training: '#f39c12', Event: '#e74c3c', Procurement: '#8b5cf6' };

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

// ─── Add Event Modal ─────────────────────────────────────────────────────────
const AddEventModal = ({ date, onClose, onAdd }) => {
  const [form, setForm] = useState({ title: '', time: '09:00', location: '', tag: 'Meeting' });
  const tags = Object.keys(TAG_COLORS);
  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onAdd({ ...form, id: Date.now(), date, color: TAG_COLORS[form.tag] });
    onClose();
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>New Event</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-date-chip">{date}</div>
        <div className="modal-field">
          <label>Event Title</label>
          <input placeholder="e.g. Guest Check-in" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="modal-row">
          <div className="modal-field">
            <label><Clock size={13} /> Time</label>
            <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
          </div>
          <div className="modal-field">
            <label><Tag size={13} /> Category</label>
            <select value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}>
              {tags.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="modal-field">
          <label><MapPin size={13} /> Location</label>
          <input placeholder="e.g. Conference Room B" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-create" onClick={handleSubmit}><Check size={15} /> Create Event</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Calendar Component ─────────────────────────────────────────────────
const CalendarPage = () => {
  const today = new Date();
  const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState(today.toISOString().slice(0, 10));
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [showModal, setShowModal] = useState(false);
  const [googleStatus, setGoogleStatus] = useState('idle'); // idle | loading | connected | error
  const [tokenClient, setTokenClient] = useState(null);

  // ── Google Calendar API setup ──────────────────────────────────
  useEffect(() => {
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') return;
    const loadGsi = () => {
      if (!window.google) return;
      const tc = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response.error) { setGoogleStatus('error'); return; }
          fetchGoogleEvents(response.access_token);
        },
      });
      setTokenClient(tc);
    };
    if (window.google) { loadGsi(); return; }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = loadGsi;
    document.body.appendChild(script);
  }, []);

  const fetchGoogleEvents = useCallback(async (token) => {
    setGoogleStatus('loading');
    try {
      const now = new Date();
      const min = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
      const max = new Date(now.getFullYear(), now.getMonth() + 3, 0).toISOString();
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${min}&timeMax=${max}&singleEvents=true&orderBy=startTime`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      const mapped = (data.items || []).map((e, i) => ({
        id: e.id,
        title: e.summary || 'Untitled',
        date: (e.start?.date || e.start?.dateTime || '').slice(0, 10),
        time: e.start?.dateTime ? new Date(e.start.dateTime).toTimeString().slice(0, 5) : '00:00',
        color: ['#6366f1','#fa5a2a','#2ecc71','#f39c12','#e74c3c','#8b5cf6'][i % 6],
        tag: 'Google',
        location: e.location || '',
      }));
      setEvents(prev => [...prev.filter(ev => ev.tag !== 'Google'), ...mapped]);
      setGoogleStatus('connected');
    } catch { setGoogleStatus('error'); }
  }, []);

  const connectGoogle = () => {
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
      alert('Please add your Google Client ID to Calendar.jsx to enable Google Calendar sync.');
      return;
    }
    if (tokenClient) tokenClient.requestAccessToken();
  };

  // ── Calendar grid helpers ──────────────────────────────────────
  const { year, month } = viewDate;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = () => setViewDate(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const nextMonth = () => setViewDate(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  const eventsOnDay = (d) => events.filter(e => e.date === formatDate(year, month, d));
  const selectedEvents = events.filter(e => e.date === selectedDate);
  const upcomingEvents = events
    .filter(e => e.date >= today.toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  const addEvent = (ev) => setEvents(prev => [...prev, ev]);

  return (
    <div className="cal-page">
      {/* ── Left panel ── */}
      <div className="cal-main">
        {/* Header */}
        <div className="cal-header">
          <div className="cal-header-left">
            <h1 className="cal-title">{MONTHS[month]} {year}</h1>
            <button className="cal-today-btn" onClick={() => { setViewDate({ year: today.getFullYear(), month: today.getMonth() }); setSelectedDate(today.toISOString().slice(0, 10)); }}>
              Today
            </button>
          </div>
          <div className="cal-header-right">
            <div className="google-connect-area">
              {googleStatus === 'connected' && <span className="gcal-status connected"><span className="g-dot"></span>Google Synced</span>}
              {googleStatus === 'error' && <span className="gcal-status error"><AlertCircle size={13} /> Sync failed</span>}
              {googleStatus === 'loading' && <span className="gcal-status loading"><RefreshCw size={13} className="spin" /> Syncing…</span>}
              {googleStatus === 'idle' && (
                <button className="gcal-btn" onClick={connectGoogle}>
                  <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Connect Google Calendar
                </button>
              )}
            </div>
            <div className="cal-nav-btns">
              <button className="cal-nav-btn" onClick={prevMonth}><ChevronLeft size={18} /></button>
              <button className="cal-nav-btn" onClick={nextMonth}><ChevronRight size={18} /></button>
            </div>
            <button className="cal-add-btn" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Add Event
            </button>
          </div>
        </div>

        {/* Day labels */}
        <div className="cal-day-labels">
          {DAYS.map(d => <span key={d}>{d}</span>)}
        </div>

        {/* Grid */}
        <div className="cal-grid">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="cal-cell empty"></div>
          ))}
          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(year, month, day);
            const dayEvents = eventsOnDay(day);
            const isToday = dateStr === today.toISOString().slice(0, 10);
            const isSelected = dateStr === selectedDate;
            return (
              <div
                key={day}
                className={`cal-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDate(dateStr)}
              >
                <span className="cal-day-num">{day}</span>
                <div className="cal-event-dots">
                  {dayEvents.slice(0, 3).map(ev => (
                    <span key={ev.id} className="cal-event-pill" style={{ background: ev.color }}>
                      {ev.title.length > 12 ? ev.title.slice(0, 12) + '…' : ev.title}
                    </span>
                  ))}
                  {dayEvents.length > 3 && <span className="cal-more-pill">+{dayEvents.length - 3} more</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected day detail */}
        <div className="selected-day-panel">
          <h3 className="sel-day-title">
            <CalendarIcon size={16} />
            {selectedDate === today.toISOString().slice(0, 10) ? 'Today' : selectedDate}
            <span className="sel-count">{selectedEvents.length} events</span>
          </h3>
          {selectedEvents.length === 0
            ? <p className="sel-empty">No events scheduled. <button onClick={() => setShowModal(true)}>Add one?</button></p>
            : <div className="sel-events-list">
                {selectedEvents.map(ev => (
                  <div key={ev.id} className="sel-event-row">
                    <div className="sel-event-accent" style={{ background: ev.color }}></div>
                    <div className="sel-event-info">
                      <span className="sel-event-title">{ev.title}</span>
                      <span className="sel-event-meta">
                        <Clock size={11} /> {ev.time}
                        {ev.location && <><MapPin size={11} /> {ev.location}</>}
                      </span>
                    </div>
                    <span className="sel-event-tag" style={{ background: ev.color + '22', color: ev.color }}>{ev.tag}</span>
                  </div>
                ))}
              </div>
          }
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="cal-sidebar">
        <div className="cal-sidebar-card">
          <h3 className="sidebar-card-title">Upcoming Events</h3>
          <div className="upcoming-list">
            {upcomingEvents.map(ev => (
              <div key={ev.id} className="upcoming-item" onClick={() => setSelectedDate(ev.date)}>
                <div className="upcoming-accent" style={{ background: ev.color }}></div>
                <div className="upcoming-info">
                  <span className="upcoming-title">{ev.title}</span>
                  <span className="upcoming-sub">
                    <Clock size={11} /> {ev.time} · {ev.date}
                  </span>
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && <p className="no-upcoming">No upcoming events.</p>}
          </div>
        </div>

        <div className="cal-sidebar-card">
          <h3 className="sidebar-card-title">Legend</h3>
          <div className="legend-list">
            {Object.entries(TAG_COLORS).map(([tag, color]) => (
              <div key={tag} className="legend-item">
                <span className="legend-dot" style={{ background: color }}></span>
                <span className="legend-label">{tag}</span>
                <span className="legend-count">{events.filter(e => e.tag === tag).length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <AddEventModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onAdd={addEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
