// src/components/OfferDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Users, Star } from 'lucide-react';

const OfferDetail = () => {
  const { id } = useParams();

  // Full data array for all 4 offers
  const offers = [
    {
      id: 1,
      title: 'Early Bird Special',
      subtitle: 'Book 30+ Days in Advance',
      description: 'Plan ahead and save big! Enjoy 25% off on all room types when you book at least 30 days before your stay. Whether you are planning a family vacation or a solo recharge, this package layers premium perks onto an already exceptional stay.',
      discount: '25% OFF',
      highlightSubtitle: 'Sun, sea, and savings on your perfect coastal getaway',
      price: '240',
      originalPrice: '320',
      perNightText: 'per night · participating properties',
      stayLength: '3+ nights',
      guests: 'Up to 4',
      discountPercent: '25%',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      validUntil: 'August 31, 2026',
      popular: true,
      seasonalBadge: 'Seasonal',
      highlights: [
        { number: 1, title: '4th Night Free', desc: 'Stay 3 nights, get the 4th complimentary at select beachfront hotels.' },
        { number: 2, title: 'Daily Breakfast', desc: 'Full buffet or à la carte breakfast for all registered guests.' },
        { number: 3, title: 'Late Checkout', desc: 'Enjoy until 2 PM on your departure day — subject to availability.' },
        { number: 4, title: 'Resort Credit', desc: '$50 daily credit toward spa, dining, or activities.' }
      ]
    },
    {
      id: 2,
      title: 'Romantic Getaway',
      subtitle: 'Perfect for Couples',
      description: 'Indulge in romance with private dinners and spa experiences. Includes champagne on arrival, rose petal turndown, couples spa treatment, and a candlelit dinner under the stars.',
      discount: '15% OFF',
      highlightSubtitle: 'Indulge in romance with private dinners and spa experiences.',
      price: '340',
      originalPrice: '400',
      perNightText: 'per night · couple\'s suite',
      stayLength: '2+ nights',
      guests: 'Up to 2',
      discountPercent: '15%',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      validUntil: 'February 28, 2026',
      popular: false,
      seasonalBadge: 'Sweet Deal',
      highlights: [
        { number: 1, title: 'Champagne & Roses', desc: 'Champagne on arrival and rose petal turndown service.' },
        { number: 2, title: 'Couples Spa', desc: 'Complimentary 60-minute couples massage.' },
        { number: 3, title: 'Candlelit Dinner', desc: 'A curated 3-course dinner at our rooftop restaurant.' },
        { number: 4, title: 'Late Checkout', desc: 'Enjoy a romantic morning with checkout at 2 PM.' }
      ]
    },
    {
      id: 3,
      title: 'Family Fun Package',
      subtitle: 'Great for Families',
      description: 'Create unforgettable memories with activities and meals for the kids. Includes connecting rooms, complimentary kids meals, free airport transfers, and a family activity pass.',
      discount: '20% OFF',
      highlightSubtitle: 'Create unforgettable memories with activities and meals for the kids.',
      price: '450',
      originalPrice: '562',
      perNightText: 'per night · family suite',
      stayLength: '3+ nights',
      guests: 'Up to 4',
      discountPercent: '20%',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      validUntil: 'August 31, 2026',
      popular: true,
      seasonalBadge: 'Family Favorite',
      highlights: [
        { number: 1, title: 'Connecting Rooms', desc: 'Stay together with guaranteed adjoining room setup.' },
        { number: 2, title: 'Kids Eat Free', desc: 'Complimentary breakfast, lunch, and dinner for kids under 12.' },
        { number: 3, title: 'Airport Transfers', desc: 'Free roundtrip airport transfer with the package.' },
        { number: 4, title: 'Activity Pass', desc: 'Free access to the kids\' club and water park.' }
      ]
    },
    {
      id: 4,
      title: 'Business Class',
      subtitle: 'For Corporate Travelers',
      description: 'Streamline your work trip with executive perks and premium comfort. Includes executive room, airport transfers, meeting room access, and complimentary business services.',
      discount: '10% OFF',
      highlightSubtitle: 'Streamline your work trip with executive perks and premium comfort.',
      price: '380',
      originalPrice: '422',
      perNightText: 'per night · executive room',
      stayLength: 'Flexible',
      guests: 'Up to 2',
      discountPercent: '10%',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      validUntil: 'December 31, 2026',
      popular: false,
      seasonalBadge: 'Corporate',
      highlights: [
        { number: 1, title: 'Executive Room', desc: 'Access to the exclusive executive lounge with refreshments.' },
        { number: 2, title: 'Meeting Room', desc: '1 hour of complimentary meeting room usage daily.' },
        { number: 3, title: 'Business Services', desc: 'Complimentary printing, scanning, and office supplies.' },
        { number: 4, title: 'City Transfers', desc: 'Complimentary limousine transfers to nearby business districts.' }
      ]
    }
  ];

  const offer = offers.find((o) => o.id === parseInt(id));

  if (!offer) {
    return <div className="offers-section" style={{padding: '100px 24px', textAlign:'center'}}>Offer not found!</div>;
  }

  return (
    <>
      <style>{`
        .detail-page {
          padding: 40px 24px 80px;
          background: #ffffff;
          font-family: 'Poppins', sans-serif;
        }
        .detail-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 24px;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #d4af37;
        }

        /* --- Main Layout --- */
        .detail-hero {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        @media (min-width: 900px) {
          .detail-hero {
            flex-direction: row;
            gap: 50px;
          }
        }

        /* --- Left Side: Images --- */
        .detail-images {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .main-image-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          height: 450px;
        }
        .main-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badge-discount {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #ef4444;
          color: white;
          padding: 6px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        .badge-seasonal {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #d4af37;
          color: #1a1a1a;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .thumbnail-strip {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .thumbnail-strip::-webkit-scrollbar {
          height: 4px;
        }
        .thumbnail-strip::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 4px;
        }
        .thumbnail-strip img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: 0.2s;
          flex-shrink: 0;
        }
        .thumbnail-strip img:hover, .thumbnail-strip img.active {
          border-color: #d4af37;
        }

        /* --- Right Side: Content --- */
        .detail-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .validity-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef3c7;
          color: #b45309;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          width: fit-content;
          margin-bottom: 16px;
        }
        .detail-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }
        .detail-highlight {
          font-size: 18px;
          color: #d4af37;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .divider-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .divider-line .dot { width: 6px; height: 6px; background: #d4af37; border-radius: 50%; }
        .divider-line .line { flex: 1; height: 1px; background: #e5e7eb; max-width: 40px; }

        .detail-description {
          color: #4b5563;
          line-height: 1.8;
          font-size: 15px;
          margin-bottom: 24px;
        }

        /* --- Info Cards --- */
        .info-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 480px) {
          .info-cards { grid-template-columns: repeat(3, 1fr); }
        }
        .info-card {
          background: #f8fafc;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid #f1f3f5;
          transition: border-color 0.3s;
        }
        .info-card:hover {
          border-color: #d4af37;
        }
        .info-card .label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9ca3af;
          font-weight: 700;
        }
        .info-card .value {
          font-weight: 700;
          color: #1a1a1a;
          font-size: 18px;
        }
        .info-card .sub-value {
          font-size: 12px;
          color: #6b7280;
        }
        .info-card .savings-text {
          color: #d4af37;
          font-weight: 600;
          font-size: 13px;
          margin-top: 4px;
        }

        /* --- Package Highlights --- */
        .highlights-section {
          margin-top: 60px;
          text-align: center;
        }
        .highlights-top-badge {
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }
        .highlights-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 40px 0;
          color: #1a1a1a;
        }
        .highlights-title span {
          color: #d4af37;
        }
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .highlights-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .highlight-card {
          background: #f8fafc;
          padding: 24px 20px;
          border-radius: 16px;
          text-align: left;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
          border: 1px solid #f1f3f5;
        }

        .highlight-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #d4af37;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
          z-index: 1;
        }

        .highlight-card:hover::before {
          transform: scaleX(1);
        }

        .highlight-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
          border-color: rgba(212, 175, 55, 0.2);
        }

        .highlight-card .number-badge {
          background: #d4af37;
          color: #1a1a1a;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 12px;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .highlight-card:hover .number-badge {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        .highlight-card h4 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px 0;
          color: #1a1a1a;
        }
        .highlight-card p {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .highlight-card .bottom-line {
          height: 3px;
          width: 30px;
          margin-top: 16px;
          border-radius: 99px;
          background: #d4af37;
          transition: width 0.4s ease;
        }

        .highlight-card:hover .bottom-line {
          width: 100%;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .detail-title {
            font-size: 32px;
          }
          .main-image-wrapper {
            height: 320px;
          }
          .highlights-title {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .detail-title { font-size: 26px; }
          .main-image-wrapper { height: 240px; }
          .detail-highlight { font-size: 15px; }
          .highlights-title { font-size: 22px; }
          .thumbnail-strip img {
            width: 60px;
            height: 60px;
          }
          .info-card .value {
            font-size: 15px;
          }
        }
      `}</style>

      <section className="detail-page">
        <div className="detail-container">
          <Link to="/#offers" className="back-link">
            <ArrowLeft size={16} /> Back to offers
          </Link>

          <div className="detail-hero">
            {/* Left Image Column */}
            <div className="detail-images">
              <div className="main-image-wrapper">
                <img src={offer.image} alt={offer.title} />
                <div className="badge-discount">{offer.discount} OFF</div>
                <div className="badge-seasonal">{offer.seasonalBadge}</div>
              </div>
              {/* Thumbnail Carousel */}
              <div className="thumbnail-strip">
                <img src={offer.image} className="active" alt="Main" />
                <img src="https://images.unsplash.com/photo-1596528718950-8a6af2865ad8?w=200&auto=format&fit=crop" alt="Thumb 2" />
                <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&auto=format&fit=crop" alt="Thumb 3" />
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop" alt="Thumb 4" />
              </div>
            </div>

            {/* Right Content Column */}
            <div className="detail-content">
              <div className="validity-pill">
                <Clock size={14} /> Valid until {offer.validUntil}
              </div>
              <h1 className="detail-title">{offer.title}</h1>
              <div className="detail-highlight">{offer.highlightSubtitle}</div>
              <div className="divider-line">
                <div className="line"></div>
                <div className="dot"></div>
                <div className="line"></div>
              </div>
              <p className="detail-description">{offer.description}</p>

              <div className="info-cards">
                <div className="info-card">
                  <div className="label">Package Pricing</div>
                  <div className="sub-value" style={{textDecoration: 'line-through', color: '#9ca3af'}}>ETB {offer.originalPrice}</div>
                  <div className="value">ETB {offer.price}</div>
                  <div className="sub-value">{offer.perNightText}</div>
                  <div className="savings-text">Save {offer.discountPercent}% on eligible stays</div>
                </div>
                <div className="info-card">
                  <div className="label">Stay Length</div>
                  <div className="value">{offer.stayLength}</div>
                </div>
                <div className="info-card">
                  <div className="label">Guests</div>
                  <div className="value">{offer.guests}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlights Section */}
          <div className="highlights-section">
            <span className="highlights-top-badge">✦ Package Perks ✦</span>
            <h2 className="highlights-title">Package <span>Highlights</span></h2>
            <div className="highlights-grid">
              {offer.highlights.map((item) => (
                <div key={item.number} className="highlight-card">
                  <div className="number-badge">{item.number}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                  <div className="bottom-line"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default OfferDetail;