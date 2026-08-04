// src/pages/HospitalityPage.jsx
const HospitalityPage = () => {
  return (
    <div style={{ padding: '120px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>
        Hospitality Services
      </h1>
      <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '700px', lineHeight: '1.6' }}>
        At Villa Alpha, we pride ourselves on delivering world-class hospitality.
        From the moment you arrive, our dedicated team ensures your stay is nothing
        short of extraordinary.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
        {[
          { title: '24/7 Concierge', desc: 'Our concierge team is available around the clock to assist with any request.' },
          { title: 'Personalized Service', desc: 'We tailor every experience to your preferences – from pillow choices to dining.' },
          { title: 'Exclusive Amenities', desc: 'Enjoy access to our spa, pool, fitness center, and private lounges.' },
          { title: 'Event Planning', desc: 'From weddings to business conferences, we handle every detail with precision.' },
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

export default HospitalityPage;