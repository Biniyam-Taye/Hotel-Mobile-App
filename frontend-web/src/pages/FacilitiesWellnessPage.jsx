import { useState, useEffect } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { fetchFacilities } from '../services/hospitalityApi';

export default function FacilitiesWellnessPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        setFacilities(await fetchFacilities());
      } catch (err) {
        setError(err.message || 'Failed to load facilities');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <style>{`
        .fw-page { background: #f8f9fa; min-height: 100vh; }
        .fw-hero {
          position: relative; height: 340px;
          display: flex; align-items: center; justify-content: flex-start;
          background: url('https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&auto=format&fit=crop') center/cover no-repeat;
          padding-left: 60px;
        }
        .fw-hero .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        .fw-hero .content { position: relative; z-index: 2; color: #fff; max-width: 700px; padding: 0 24px; }
        .fw-hero .badge {
          display: inline-block; background: rgba(212,175,55,0.2);
          padding: 6px 20px; border-radius: 9999px; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: #d4af37;
          border: 1px solid rgba(212,175,55,0.25); margin-bottom: 16px;
        }
        .fw-hero h1 { font-family: Georgia, serif; font-size: 46px; font-weight: 700; margin: 0 0 8px; }
        .fw-hero p { font-size: 17px; color: rgba(255,255,255,0.85); margin: 0; line-height: 1.6; }
        .fw-section { max-width: 1200px; margin: 0 auto; padding: 60px 24px 80px; }
        .fw-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;
        }
        .fw-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .fw-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .fw-card-body { padding: 20px; }
        .fw-card-body h3 { margin: 0 0 8px; font-size: 20px; color: #111827; }
        .fw-card-body p { margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 1.6; }
        .fw-hours {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: #374151; background: #f3f4f6;
          padding: 6px 12px; border-radius: 999px;
        }
        .fw-status { text-align: center; padding: 48px 24px; color: #6b7280; }
        .fw-status.error { color: #b91c1c; }
        @media (max-width: 768px) {
          .fw-hero { padding-left: 24px; height: 280px; }
          .fw-hero h1 { font-size: 32px; }
        }
      `}</style>

      <div className="fw-page">
        <div className="fw-hero">
          <div className="overlay" />
          <div className="content">
            <div className="badge">✦ Rejuvenate</div>
            <h1>Facilities & Wellness</h1>
            <p>Relax with spa treatments, fitness facilities, and premium wellness amenities managed by our team.</p>
          </div>
        </div>

        <div className="fw-section">
          {loading ? (
            <div className="fw-status"><Loader2 size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />Loading facilities...</div>
          ) : error ? (
            <div className="fw-status error">{error}</div>
          ) : facilities.length === 0 ? (
            <div className="fw-status">No facilities available yet.</div>
          ) : (
            <div className="fw-grid">
              {facilities.map((item) => (
                <article key={item.id} className="fw-card">
                  {item.image && !item.image.startsWith('default-') && (
                    <img src={item.image} alt={item.title} />
                  )}
                  <div className="fw-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.displayPrice && (
                      <div className="fw-hours"><Clock size={14} /> {item.displayPrice}</div>
                    )}
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
