import { useState, useEffect } from 'react';
import { Users, Loader2, MapPin, Check, Star } from 'lucide-react';
import { fetchEventSpaces } from '../services/hospitalityApi';

export default function EventsConferencesPage() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        setSpaces(await fetchEventSpaces());
      } catch (err) {
        setError(err.message || 'Failed to load event spaces');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <style>{`
        .ev-page { background: #f8f9fa; min-height: 100vh; }
        .ev-hero {
          position: relative; height: 340px;
          display: flex; align-items: center; justify-content: flex-start;
          background: url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop') center/cover no-repeat;
          padding-left: 60px;
        }
        .ev-hero .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        .ev-hero .content { position: relative; z-index: 2; color: #fff; max-width: 700px; padding: 0 24px; }
        .ev-hero .badge {
          display: inline-block; background: rgba(212,175,55,0.2);
          padding: 6px 20px; border-radius: 9999px; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: #d4af37;
          border: 1px solid rgba(212,175,55,0.25); margin-bottom: 16px;
        }
        .ev-hero h1 { font-family: Georgia, serif; font-size: 46px; font-weight: 700; margin: 0 0 8px; }
        .ev-hero p { font-size: 17px; color: rgba(255,255,255,0.85); margin: 0; line-height: 1.6; }
        .ev-section { max-width: 1200px; margin: 0 auto; padding: 60px 24px 80px; }
        .ev-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;
        }
        .ev-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .ev-card-image { position: relative; }
        .ev-card img { width: 100%; height: 210px; object-fit: cover; display: block; }
        .ev-featured {
          position: absolute; top: 14px; right: 14px;
          background: #d4af37; color: #1a1a1a; padding: 4px 12px;
          border-radius: 999px; font-size: 11px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 4px;
        }
        .ev-card-body { padding: 20px; }
        .ev-card-body h3 { margin: 0 0 8px; font-size: 20px; color: #111827; }
        .ev-card-body p { margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 1.6; }
        .ev-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .ev-meta span {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12px; color: #4b5563; background: #f3f4f6;
          padding: 4px 10px; border-radius: 999px;
        }
        .ev-amenities { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .ev-amenities span {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11px; color: #4b5563; background: #f9fafb;
          border: 1px solid #e5e7eb; padding: 3px 8px; border-radius: 999px;
        }
        .ev-price { font-size: 18px; font-weight: 700; color: #d4af37; }
        .ev-status { text-align: center; padding: 48px 24px; color: #6b7280; }
        .ev-status.error { color: #b91c1c; }
        @media (max-width: 768px) {
          .ev-hero { padding-left: 24px; height: 280px; }
          .ev-hero h1 { font-size: 32px; }
        }
      `}</style>

      <div className="ev-page">
        <div className="ev-hero">
          <div className="overlay" />
          <div className="content">
            <div className="badge">✦ Premium Venues</div>
            <h1>Events & Conference</h1>
            <p>Host memorable meetings, weddings, and conferences in our versatile premium venues.</p>
          </div>
        </div>

        <div className="ev-section">
          {loading ? (
            <div className="ev-status"><Loader2 size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />Loading event spaces...</div>
          ) : error ? (
            <div className="ev-status error">{error}</div>
          ) : spaces.length === 0 ? (
            <div className="ev-status">No published event spaces available yet.</div>
          ) : (
            <div className="ev-grid">
              {spaces.map((space) => (
                <article key={space.id} className="ev-card">
                  <div className="ev-card-image">
                    {space.image && !space.image.startsWith('default-') && (
                      <img src={space.image} alt={space.title} />
                    )}
                    {space.popular && (
                      <span className="ev-featured"><Star size={12} fill="currentColor" /> Featured</span>
                    )}
                  </div>
                  <div className="ev-card-body">
                    <h3>{space.title}</h3>
                    <p>{space.description}</p>
                    <div className="ev-meta">
                      {space.location && <span><MapPin size={12} /> {space.location}</span>}
                      <span><Users size={12} /> Up to {space.maxGuests || '—'} guests</span>
                    </div>
                    {space.amenities?.length > 0 && (
                      <div className="ev-amenities">
                        {space.amenities.slice(0, 4).map((tag) => (
                          <span key={tag}><Check size={10} /> {tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="ev-price">{space.displayPrice} <span style={{ fontSize: 13, fontWeight: 400, color: '#6b7280' }}>/ day</span></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
