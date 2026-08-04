// src/pages/ExperiencePage.jsx
const ExperiencePage = () => {
  return (
    <div style={{ padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>
        Unforgettable Experiences
      </h1>
      <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '700px', lineHeight: '1.6' }}>
        Beyond luxury accommodation, Villa Alpha offers curated experiences that
        will make your stay truly memorable.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
        {[
          { title: 'Gourmet Dining', desc: 'Savor exquisite cuisine prepared by award-winning chefs using locally sourced ingredients.' },
          { title: 'Spa & Wellness', desc: 'Rejuvenate with our signature spa treatments, sauna, and wellness programs.' },
          { title: 'City Tours', desc: 'Explore the city with our guided tours to historical landmarks and hidden gems.' },
          { title: 'Cultural Events', desc: 'Immerse yourself in local culture with live music, art exhibitions, and workshops.' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;