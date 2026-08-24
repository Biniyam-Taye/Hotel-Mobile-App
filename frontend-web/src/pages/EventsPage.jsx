// src/pages/EventsPage.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Award, Music, Camera, Coffee } from 'lucide-react';

const EventsPage = () => {
  const events = [
    { icon: Calendar, title: 'Conference Hall', description: 'State-of-the-art conference hall for 200+ guests', price: 'From ETB 15,000' },
    { icon: Users, title: 'Meeting Rooms', description: 'Private meeting rooms with AV equipment', price: 'From ETB 5,000' },
    { icon: Award, title: 'Wedding Packages', description: 'All-inclusive wedding packages with catering', price: 'From ETB 25,000' },
    { icon: Music, title: 'Live Music Events', description: 'Monthly live music and entertainment events', price: 'ETB 1,500' },
    { icon: Camera, title: 'Photo Studio', description: 'Professional photography and video services', price: 'From ETB 3,000' },
    { icon: Coffee, title: 'Catering Services', description: 'Custom catering for all types of events', price: 'From ETB 800' },
  ];

  return (
    <div style={{ padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Events & Conference</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Premium venues and services for your events and conferences</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {events.map((event, i) => (
          <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', color: '#d4af37', marginBottom: '12px' }}>
              <event.icon size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>{event.title}</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px' }}>{event.description}</p>
            <span style={{ color: '#d4af37', fontWeight: 700 }}>{event.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;