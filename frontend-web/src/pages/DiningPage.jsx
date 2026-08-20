// src/pages/DiningPage.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Utensils, Coffee, Wine, Cake, Star } from 'lucide-react';

const DiningPage = () => {
  const menuItems = [
    { name: 'Grilled Lamb Chops', description: 'Rosemary potatoes & mint sauce', price: 'ETB 1,200', category: 'Main Course' },
    { name: 'Seafood Paella', description: 'Saffron rice with shrimp & mussels', price: 'ETB 1,400', category: 'Main Course' },
    { name: 'Bruschetta', description: 'Toasted bread with tomato & basil', price: 'ETB 450', category: 'Appetizer' },
    { name: 'Tiramisu', description: 'Classic Italian dessert with coffee', price: 'ETB 350', category: 'Dessert' },
  ];

  return (
    <div style={{ padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', textDecoration: 'none', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Restaurant & Bar</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Fine dining with local and international cuisine</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {menuItems.map((item, i) => (
          <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{item.name}</h3>
              <span style={{ color: '#d4af37', fontWeight: 700 }}>{item.price}</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px' }}>{item.description}</p>
            <span style={{ background: '#f3f4f6', padding: '2px 12px', borderRadius: '9999px', fontSize: '12px', color: '#6b7280' }}>{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiningPage;