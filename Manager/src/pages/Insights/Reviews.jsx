import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, TrendingUp, Filter, Search, Reply, Flag } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    guestName: 'James Okonkwo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    rating: 5,
    room: 'Deluxe Ocean Suite',
    date: 'Aug 15, 2026',
    comment: 'Absolutely stunning property! The staff went above and beyond to make our anniversary trip unforgettable. The ocean view from the suite was breathtaking and the room was immaculate.',
    helpful: 12,
    status: 'published',
    replied: false,
  },
  {
    id: 2,
    guestName: 'Amara Selassie',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=80&q=80',
    rating: 4,
    room: 'Executive Room',
    date: 'Aug 13, 2026',
    comment: 'Great experience overall. The breakfast spread was exceptional and the pool facilities were top-notch. Checkout took longer than expected but staff were very polite.',
    helpful: 7,
    status: 'published',
    replied: true,
    reply: "Thank you for your kind words, Amara! We apologize for the checkout delay and have already addressed the process. Hope to welcome you back soon!",
  },
  {
    id: 3,
    guestName: 'Lena Hoffmann',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
    rating: 3,
    room: 'Standard Twin',
    date: 'Aug 11, 2026',
    comment: 'Room was clean and comfortable but a bit small for the price. AC was noisy during the night which affected sleep quality. Location is perfect though.',
    helpful: 3,
    status: 'published',
    replied: false,
  },
  {
    id: 4,
    guestName: 'Dawit Bekele',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
    rating: 5,
    room: 'Presidential Suite',
    date: 'Aug 8, 2026',
    comment: 'Villa Alpha is in a class of its own. The concierge team arranged everything perfectly — from our airport transfer to the private dinner. Will definitely be returning.',
    helpful: 24,
    status: 'published',
    replied: true,
    reply: "We are so grateful for your kind words, Dawit! It was our absolute pleasure hosting you in the Presidential Suite. We look forward to welcoming you back!",
  },
  {
    id: 5,
    guestName: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&q=80',
    rating: 2,
    room: 'Garden View Room',
    date: 'Aug 5, 2026',
    comment: 'Disappointing stay. The room had maintenance issues that were not fixed promptly. Internet was very slow and food service took too long. Expected better for the price.',
    helpful: 1,
    status: 'flagged',
    replied: false,
  },
];

const ratingColors = { 5: '#16a34a', 4: '#65a30d', 3: '#d97706', 2: '#ea580c', 1: '#dc2626' };
const ratingBg = { 5: '#dcfce7', 4: '#ecfccb', 3: '#fef3c7', 2: '#ffedd5', 1: '#fee2e2' };

function StarRow({ rating, count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? '#fbbf24' : 'none'} color={i < rating ? '#fbbf24' : '#d1d5db'} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1);
  const fiveStars = reviews.filter(r => r.rating === 5).length;

  const filtered = reviews.filter(r => {
    const matchFilter = filter === 'All' || (filter === 'Replied' ? r.replied : filter === 'Pending' ? !r.replied : filter === 'Flagged' ? r.status === 'flagged' : r.rating === Number(filter));
    const matchSearch = r.guestName.toLowerCase().includes(search.toLowerCase()) || r.comment.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const submitReply = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, replied: true, reply: replyText } : r));
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <section className="dashboard-section">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>
        <Star size={24} style={{ color: '#f59e0b' }} fill="#f59e0b" /> Guest Reviews
      </h1>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Average Rating', value: avgRating, sub: 'Out of 5.0', icon: '⭐', color: '#fef3c7', border: '#fde68a' },
          { label: 'Total Reviews', value: totalReviews, sub: 'All time', icon: '💬', color: '#dbeafe', border: '#bfdbfe' },
          { label: '5-Star Reviews', value: fiveStars, sub: `${Math.round((fiveStars / totalReviews) * 100)}% of total`, icon: '🏆', color: '#dcfce7', border: '#bbf7d0' },
          { label: 'Awaiting Reply', value: reviews.filter(r => !r.replied).length, sub: 'Need response', icon: '✉️', color: '#fce7f3', border: '#fbcfe8' },
        ].map(s => (
          <div key={s.label} style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: '1rem', padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginTop: '0.25rem' }}>{s.label}</div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.125rem' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Rating Breakdown */}
      <div className="data-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Rating Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[5, 4, 3, 2, 1].map(star => {
            const count = reviews.filter(r => r.rating === star).length;
            const pct = Math.round((count / totalReviews) * 100);
            return (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: 40, flexShrink: 0 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{star}</span>
                  <Star size={12} fill="#fbbf24" color="#fbbf24" />
                </div>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#f3f4f6', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: ratingColors[star], borderRadius: 4, transition: 'width 0.5s ease' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', width: 32, textAlign: 'right' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reviews or guests..." style={{ width: '100%', padding: '0.575rem 1rem 0.575rem 2.25rem', borderRadius: '0.625rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['All', '5', '4', '3', '2', '1', 'Pending', 'Replied', 'Flagged'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', border: 'none', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', background: filter === f ? '#111827' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
              {f}{['5','4','3','2','1'].includes(f) ? '★' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(review => (
          <div key={review.id} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', border: review.status === 'flagged' ? '1px solid #fca5a5' : '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <img src={review.avatar} alt={review.guestName} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #f3f4f6' }} />
                <div>
                  <h4 style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>{review.guestName}</h4>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>{review.room} · {review.date}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: ratingBg[review.rating], padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                  <Star size={13} fill={ratingColors[review.rating]} color={ratingColors[review.rating]} />
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: ratingColors[review.rating] }}>{review.rating}.0</span>
                </div>
                {review.status === 'flagged' && (
                  <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>Flagged</span>
                )}
              </div>
            </div>

            {/* Comment */}
            <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, margin: '0 0 1rem' }}>{review.comment}</p>

            {/* Existing Reply */}
            {review.replied && review.reply && (
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', margin: '0 0 0.3rem' }}>📩 Your Reply</p>
                <p style={{ fontSize: '0.825rem', color: '#374151', margin: 0, lineHeight: 1.5 }}>{review.reply}</p>
              </div>
            )}

            {/* Reply Input */}
            {replyingTo === review.id && (
              <div style={{ marginBottom: '1rem' }}>
                <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write your reply to this guest..." rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.625rem', border: '1px solid #bfdbfe', fontSize: '0.875rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }} />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setReplyingTo(null)} style={{ padding: '0.4rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', background: 'white', fontSize: '0.8rem', cursor: 'pointer', color: '#6b7280' }}>Cancel</button>
                  <button onClick={() => submitReply(review.id)} style={{ padding: '0.4rem 0.875rem', borderRadius: '0.5rem', border: 'none', background: '#3b82f6', color: 'white', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>Send Reply</button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.875rem', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.775rem', color: '#6b7280' }}>
                <ThumbsUp size={13} /> <span>{review.helpful} helpful</span>
              </div>
              <div style={{ flex: 1 }} />
              {!review.replied && (
                <button onClick={() => { setReplyingTo(replyingTo === review.id ? null : review.id); setReplyText(''); }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #3b82f6', background: 'white', color: '#3b82f6', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>
                  <Reply size={14} /> Reply
                </button>
              )}
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.875rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', background: 'white', color: '#9ca3af', fontSize: '0.8rem', cursor: 'pointer' }}>
                <Flag size={14} /> Flag
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
