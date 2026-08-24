// src/pages/WellnessPage.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplets, Dumbbell, Sparkles, Clock, Users, Sun } from 'lucide-react';

const WellnessPage = () => {
  const wellnessItems = [
    { icon: Droplets, title: 'Swimming Pool', description: 'Outdoor pool with sun loungers and poolside bar', price: 'Free Access' },
    { icon: Dumbbell, title: 'Fitness Gym', description: 'State-of-the-art equipment with 24/7 access', price: 'Free Access' },
    { icon: Sparkles, title: 'Spa & Wellness', description: 'Signature treatments, sauna, and massage therapies', price: 'Book Now' },
    { icon: Sun, title: 'Yoga Studio', description: 'Daily yoga classes with certified instructors', price: 'Free' },
    { icon: Users, title: 'Group Classes', description: 'Spin, HIIT, and group fitness sessions', price: 'Free' },
    { icon: Clock, title: 'Wellness Hours', description: 'Facilities open 7:00 AM – 10:00 PM daily', price: '24/7' },
  ];

  return (
    <div style={{ padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Facilities & Wellness</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Recharge, relax, and rejuvenate with our premium facilities</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {wellnessItems.map((item, i) => (
          <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', color: '#d4af37', marginBottom: '12px' }}>
              <item.icon size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>{item.title}</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px' }}>{item.description}</p>
            <span style={{ color: '#d4af37', fontWeight: 700 }}>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessPage;