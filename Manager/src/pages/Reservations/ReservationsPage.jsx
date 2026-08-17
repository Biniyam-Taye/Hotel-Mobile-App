import React, { useState } from 'react';
import {
  CalendarCheck, Search, Filter, Plus, Eye, Edit, Trash2,
  Clock, Users, DoorOpen, CheckCircle, AlertCircle, XCircle,
  ChevronDown, BedDouble, Phone, Mail, CreditCard
} from 'lucide-react';

const mockReservations = [
  {
    id: 'BK-9244',
    guest: 'Dawit Bekele',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80',
    email: 'dawit@email.com',
    phone: '+251 91 234 5678',
    room: 'Presidential Suite',
    roomNo: '501',
    type: 'Suite',
    guests: 2,
    checkIn: 'Aug 20, 2026',
    checkOut: 'Aug 24, 2026',
    nights: 4,
    amount: 'ETB 14,400',
    status: 'confirmed',
    payment: 'paid',
  },
  {
    id: 'BK-9243',
    guest: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=60&q=80',
    email: 'elena@email.com',
    phone: '+1 555 0192',
    room: 'Deluxe Ocean Suite',
    roomNo: '302',
    type: 'Deluxe',
    guests: 2,
    checkIn: 'Sep 2, 2026',
    checkOut: 'Sep 7, 2026',
    nights: 5,
    amount: 'ETB 6,200',
    status: 'confirmed',
    payment: 'paid',
  },
  {
    id: 'BK-9242',
    guest: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&q=80',
    email: 'james@email.com',
    phone: '+44 20 7946 0123',
    room: 'Executive Room',
    roomNo: '214',
    type: 'Executive',
    guests: 1,
    checkIn: 'Sep 10, 2026',
    checkOut: 'Sep 12, 2026',
    nights: 2,
    amount: 'ETB 2,400',
    status: 'pending',
    payment: 'deposit',
  },
  {
    id: 'BK-9241',
    guest: 'Amara Selassie',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=60&q=80',
    email: 'amara@email.com',
    phone: '+251 93 456 7890',
    room: 'Garden View Room',
    roomNo: '108',
    type: 'Standard',
    guests: 2,
    checkIn: 'Sep 15, 2026',
    checkOut: 'Sep 18, 2026',
    nights: 3,
    amount: 'ETB 3,100',
    status: 'confirmed',
    payment: 'paid',
  },
  {
    id: 'BK-9240',
    guest: 'Michael & Emma Smith',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=60&q=80',
    email: 'msmith@email.com',
    phone: '+1 312 555 0145',
    room: 'Family Connecting Room',
    roomNo: '410',
    type: 'Family',
    guests: 4,
    checkIn: 'Aug 17, 2026',
    checkOut: 'Aug 22, 2026',
    nights: 5,
    amount: 'ETB 9,500',
    status: 'checked-in',
    payment: 'paid',
  },
  {
    id: 'BK-9239',
    guest: 'Sophie Laurent',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=60&q=80',
    email: 'sophie@email.com',
    phone: '+33 1 42 86 8300',
    room: 'Standard Twin',
    roomNo: '115',
    type: 'Standard',
    guests: 2,
    checkIn: 'Aug 10, 2026',
    checkOut: 'Aug 13, 2026',
    nights: 3,
    amount: 'ETB 2,100',
    status: 'checked-out',
    payment: 'paid',
  },
  {
    id: 'BK-9238',
    guest: 'Peter Wong',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=60&q=80',
    email: 'peter@email.com',
    phone: '+852 2123 4567',
    room: 'Executive Suite',
    roomNo: '305',
    type: 'Suite',
    guests: 1,
    checkIn: 'Aug 5, 2026',
    checkOut: 'Aug 8, 2026',
    nights: 3,
    amount: 'ETB 5,400',
    status: 'cancelled',
    payment: 'refunded',
  },
];

const statusConfig = {
  confirmed:   { label: 'Confirmed',   bg: '#dbeafe', color: '#1d4ed8', icon: CheckCircle },
  pending:     { label: 'Pending',     bg: '#fef3c7', color: '#b45309', icon: Clock },
  'checked-in':  { label: 'Checked In',  bg: '#dcfce7', color: '#065f46', icon: DoorOpen },
  'checked-out': { label: 'Checked Out', bg: '#f3f4f6', color: '#6b7280', icon: CheckCircle },
  cancelled:   { label: 'Cancelled',   bg: '#fee2e2', color: '#dc2626', icon: XCircle },
};

const paymentConfig = {
  paid:     { label: 'Paid',     color: '#065f46' },
  deposit:  { label: 'Deposit', color: '#b45309' },
  refunded: { label: 'Refunded', color: '#6b7280' },
};

const filterStatuses = ['All', 'Confirmed', 'Pending', 'Checked In', 'Checked Out', 'Cancelled'];

const roomOptions = ['Presidential Suite', 'Deluxe Ocean Suite', 'Executive Suite', 'Executive Room', 'Family Connecting Room', 'Garden View Room', 'Standard Twin'];
const statusOptions = ['confirmed', 'pending', 'checked-in', 'checked-out', 'cancelled'];
const paymentOptions = ['paid', 'deposit', 'refunded'];

const emptyForm = {
  guest: '', email: '', phone: '', room: roomOptions[0], roomNo: '',
  type: 'Standard', guests: 1, checkIn: '', checkOut: '', nights: 1,
  amount: '', status: 'confirmed', payment: 'paid',
};

function FormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || emptyForm);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const labelStyle = { fontSize: '0.78rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.35rem' };
  const inputStyle = { width: '100%', padding: '0.6rem 0.875rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit', color: '#111827', boxSizing: 'border-box' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: 580, boxShadow: '0 25px 50px rgba(0,0,0,0.2)', animation: 'dropIn 0.2s ease', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>{initial ? 'Edit Reservation' : 'New Reservation'}</h2>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#9ca3af' }}>{initial ? `Editing ${initial.id}` : 'Fill in guest and booking details'}</p>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#f3f4f6', cursor: 'pointer', fontSize: '1rem', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>

          {/* Guest Info */}
          <div style={{ background: '#f9fafb', borderRadius: '1rem', padding: '1.25rem' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Guest Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Full Name *</label>
                <input style={inputStyle} placeholder="e.g. Dawit Bekele" value={form.guest} onChange={e => set('guest', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" placeholder="guest@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} placeholder="+251 91 234 5678" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>No. of Guests</label>
                <input style={inputStyle} type="number" min={1} max={10} value={form.guests} onChange={e => set('guests', Number(e.target.value))} />
              </div>
            </div>
          </div>

          {/* Room Info */}
          <div style={{ background: '#f9fafb', borderRadius: '1rem', padding: '1.25rem' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Room Details</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Room Type *</label>
                <select style={inputStyle} value={form.room} onChange={e => set('room', e.target.value)}>
                  {roomOptions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Room Number</label>
                <input style={inputStyle} placeholder="e.g. 501" value={form.roomNo} onChange={e => set('roomNo', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Room Category</label>
                <input style={inputStyle} placeholder="e.g. Suite" value={form.type} onChange={e => set('type', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div style={{ background: '#f9fafb', borderRadius: '1rem', padding: '1.25rem' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stay & Payment</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              <div>
                <label style={labelStyle}>Check-in Date *</label>
                <input style={inputStyle} type="date" value={form.checkIn} onChange={e => set('checkIn', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Check-out Date *</label>
                <input style={inputStyle} type="date" value={form.checkOut} onChange={e => set('checkOut', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Total Amount (ETB)</label>
                <input style={inputStyle} placeholder="e.g. 4800" value={form.amount} onChange={e => set('amount', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Payment Status</label>
                <select style={inputStyle} value={form.payment} onChange={e => set('payment', e.target.value)}>
                  {paymentOptions.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>Reservation Status</label>
                <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                  {statusOptions.map(s => <option key={s} value={s}>{s.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button className="secondary-btn" onClick={onClose}>Cancel</button>
            <button className="primary-btn" onClick={() => onSave(form)} style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)', borderRadius: '0.75rem', padding: '0.65rem 1.5rem' }}>
              {initial ? 'Save Changes' : 'Create Reservation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservationsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [formMode, setFormMode] = useState(null); // null | 'new' | reservation object
  const [reservations, setReservations] = useState(mockReservations);

  const filtered = reservations.filter(r => {
    const matchSearch =
      r.guest.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.room.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'All' ||
      r.status === statusFilter.toLowerCase().replace(' ', '-');
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Total',       value: reservations.length,                                     color: '#dbeafe', iconColor: '#1d4ed8' },
    { label: 'Confirmed',   value: reservations.filter(r => r.status === 'confirmed').length,   color: '#dbeafe', iconColor: '#1d4ed8' },
    { label: 'Checked In',  value: reservations.filter(r => r.status === 'checked-in').length,  color: '#dcfce7', iconColor: '#065f46' },
    { label: 'Pending',     value: reservations.filter(r => r.status === 'pending').length,     color: '#fef3c7', iconColor: '#b45309' },
    { label: 'Cancelled',   value: reservations.filter(r => r.status === 'cancelled').length,   color: '#fee2e2', iconColor: '#dc2626' },
  ];

  return (
    <section className="dashboard-section" style={{ paddingBottom: '3rem' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarCheck size={26} color="#3b82f6" /> Reservations
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem' }}>Manage all guest bookings and stays</p>
        </div>
        <button className="primary-btn" onClick={() => setFormMode('new')} style={{ borderRadius: '0.75rem', padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> New Reservation
        </button>
      </div>

      {/* Stat Pills */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: s.color, borderRadius: '9999px', padding: '0.4rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: s.iconColor }}>{s.value}</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 500, color: s.iconColor }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
          <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search guest, booking ID or room..."
            style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none', background: 'white' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {filterStatuses.map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              style={{
                padding: '0.4rem 0.875rem', borderRadius: '9999px', border: 'none',
                fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
                background: statusFilter === f ? '#111827' : '#f3f4f6',
                color: statusFilter === f ? 'white' : '#6b7280',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '1.25rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
              {['Booking', 'Guest', 'Room', 'Dates', 'Guests', 'Amount', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                  No reservations match your search.
                </td>
              </tr>
            ) : filtered.map((r, i) => {
              const s = statusConfig[r.status];
              const StatusIcon = s.icon;
              const p = paymentConfig[r.payment];
              return (
                <tr
                  key={r.id}
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f9fafb' : 'none', transition: 'background 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Booking ID */}
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#3b82f6' }}>{r.id}</span>
                  </td>

                  {/* Guest */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={r.avatar} alt={r.guest} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>{r.guest}</p>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>{r.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Room */}
                  <td style={{ padding: '1rem' }}>
                    <p style={{ margin: 0, fontSize: '0.825rem', fontWeight: 500, color: '#374151' }}>{r.room}</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>Room {r.roomNo} · {r.type}</p>
                  </td>

                  {/* Dates */}
                  <td style={{ padding: '1rem' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#374151', whiteSpace: 'nowrap' }}>{r.checkIn}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#374151', whiteSpace: 'nowrap' }}>→ {r.checkOut}</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>{r.nights} nights</p>
                  </td>

                  {/* Guests */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: '#374151' }}>
                      <Users size={14} color="#9ca3af" /> {r.guests}
                    </div>
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '1rem' }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>{r.amount}</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', fontWeight: 600, color: p.color }}>{p.label}</p>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: s.bg, color: s.color, fontSize: '0.72rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: '9999px', width: 'fit-content' }}>
                      <StatusIcon size={12} />
                      {s.label}
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <button
                        onClick={() => setSelected(r)}
                        style={{ width: 30, height: 30, borderRadius: '0.5rem', border: 'none', background: '#eff6ff', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => setFormMode(r)}
                        style={{ width: 30, height: 30, borderRadius: '0.5rem', border: 'none', background: '#f3f4f6', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button style={{ width: 30, height: 30, borderRadius: '0.5rem', border: 'none', background: '#fff0f0', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Cancel">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: 520, boxShadow: '0 25px 50px rgba(0,0,0,0.2)', animation: 'dropIn 0.2s ease' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={selected.avatar} alt={selected.guest} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '3px solid #f3f4f6' }} />
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>{selected.guest}</h2>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>Booking {selected.id}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#f3f4f6', cursor: 'pointer', fontSize: '1rem', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Room', value: `${selected.room} (${selected.roomNo})`, icon: BedDouble },
                { label: 'Guests', value: selected.guests, icon: Users },
                { label: 'Check-in', value: selected.checkIn, icon: CalendarCheck },
                { label: 'Check-out', value: selected.checkOut, icon: CalendarCheck },
                { label: 'Duration', value: `${selected.nights} nights`, icon: Clock },
                { label: 'Total Amount', value: selected.amount, icon: CreditCard },
                { label: 'Email', value: selected.email, icon: Mail },
                { label: 'Phone', value: selected.phone, icon: Phone },
              ].map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.label} style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                      <Icon size={12} /> {f.label}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{f.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Status + Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: statusConfig[selected.status].bg, color: statusConfig[selected.status].color, padding: '0.4rem 1rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.8rem' }}>
                {selected.status}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="secondary-btn">Edit Booking</button>
                <button className="primary-btn">Check In Guest</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Form Modal — New or Edit */}
      {formMode && (
        <FormModal
          initial={formMode === 'new' ? null : formMode}
          onClose={() => setFormMode(null)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
