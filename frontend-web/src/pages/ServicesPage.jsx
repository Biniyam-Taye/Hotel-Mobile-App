// src/pages/ServicesPage.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Car, Phone, Shirt, Clock, Wifi, Coffee } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    { icon: Car, title: 'Airport Transfer', description: 'Complimentary shuttle service to/from the airport', price: 'Free' },
    { icon: Phone, title: 'Room Service', description: '24/7 in-dining with a wide selection of dishes', price: '24/7' },
    { icon: Shirt, title: 'Laundry & Dry Cleaning', description: 'Professional express cleaning and pressing', price: 'Premium' },
    { icon: Clock, title: 'Concierge Service', description: 'Dedicated concierge for tours, dining, and more', price: 'Complimentary' },
    { icon: Wifi, title: 'High-Speed Wi-Fi', description: 'Complimentary internet throughout the hotel', price: 'Free' },
    { icon: Coffee, title: 'Lounge Access', description: 'Exclusive access to the executive lounge', price: 'VIP' },
  ];

  return (
    <div style={{ padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Hotel Services</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>24/7 concierge and premium services for your comfort</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {services.map((service, i) => (
          <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: 'rgba(212,175,55,0.1)', borderRadius: '50%', color: '#d4af37', marginBottom: '12px' }}>
              <service.icon size={28} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>{service.title}</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px' }}>{service.description}</p>
            <span style={{ color: '#d4af37', fontWeight: 700 }}>{service.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;