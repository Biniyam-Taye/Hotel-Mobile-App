// src/components/Rooms.jsx
import { Link } from 'react-router-dom';
import { 
  Wifi, Tv, AirVent, Coffee, Car, Users, Bath, 
  ArrowRight, Star, Bed, Maximize, Utensils, Dumbbell, Sparkles,
  Home
} from 'lucide-react';

const Rooms = () => {
  // Exchange rate: 1 USD = 57 ETB (approx)
  const usdToEtb = 57;

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      priceUSD: 250,
      priceETB: 250 * usdToEtb,
      capacity: 2,
      bedType: 'King Size Bed',
      size: '45 m²',
      shortDescription: 'Elegant suite with stunning city views and premium amenities.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true
    },
    {
      id: 2,
      name: 'Executive Room',
      priceUSD: 180,
      priceETB: 180 * usdToEtb,
      capacity: 2,
      bedType: 'Queen Size Bed',
      size: '32 m²',
      shortDescription: 'Modern room designed for business travelers with workspace.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Work Desk'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: false
    },
    {
      id: 3,
      name: 'Presidential Suite',
      priceUSD: 450,
      priceETB: 450 * usdToEtb,
      capacity: 4,
      bedType: 'King Size Bed + Sofa Bed',
      size: '85 m²',
      shortDescription: 'Our most luxurious suite with private terrace and butler service.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub', 'Private Terrace'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true
    },
    {
      id: 4,
      name: 'Standard Room',
      priceUSD: 120,
      priceETB: 120 * usdToEtb,
      capacity: 2,
      bedType: 'Double Bed',
      size: '24 m²',
      shortDescription: 'Comfortable room with all essential amenities for a pleasant stay.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker'],
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: false
    },
    {
      id: 5,
      name: 'Family Suite',
      priceUSD: 320,
      priceETB: 320 * usdToEtb,
      capacity: 5,
      bedType: 'King Size Bed + 2 Twin Beds',
      size: '65 m²',
      shortDescription: 'Spacious suite designed for families with children\'s entertainment area.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Game Console'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: false
    },
    {
      id: 6,
      name: 'Honeymoon Suite',
      priceUSD: 380,
      priceETB: 380 * usdToEtb,
      capacity: 2,
      bedType: 'King Size Bed',
      size: '55 m²',
      shortDescription: 'Romantic suite with jacuzzi, rose petals, and sunset views.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Jacuzzi', 'Mini Bar'],
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true
    }
  ];

  // Format ETB price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <style>{`
        .rooms-section {
          padding: 80px 24px;
          background: #f8f9fa;
        }

        .rooms-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .rooms-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .rooms-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .rooms-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .rooms-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .room-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(0,0,0,0.04);
          text-decoration: none;
          color: inherit;
          display: block;
          cursor: pointer;
        }

        .room-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.14);
        }

        .room-card .room-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .room-card .room-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .room-card:hover .room-image img {
          transform: scale(1.08);
        }

        .room-card .room-image .popular-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #d4af37;
          color: #1a1a1a;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .room-card .room-details {
          padding: 20px 24px 24px;
        }

        .room-card .room-details .room-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }

        .room-card .room-details .room-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .room-card .room-details .room-header .price {
          text-align: right;
        }

        .room-card .room-details .room-header .price .amount {
          font-size: 22px;
          font-weight: 700;
          color: #d4af37;
        }

        .room-card .room-details .room-header .price .currency {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
        }

        .room-card .room-details .room-header .price .per-night {
          font-size: 12px;
          color: #6b7280;
          display: block;
          line-height: 1;
        }

        .room-card .room-details .room-meta {
          display: flex;
          gap: 12px;
          margin: 6px 0 10px;
          font-size: 13px;
          color: #6b7280;
          flex-wrap: wrap;
        }

        .room-card .room-details .room-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .room-card .room-details .short-description {
          color: #4b5563;
          font-size: 14px;
          line-height: 1.6;
          margin: 4px 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .room-card .room-details .btn-view {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 28px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          width: 100%;
          justify-content: center;
        }

        .room-card .room-details .btn-view:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35);
        }

        @media (min-width: 768px) {
          .rooms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .rooms-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .rooms-section {
            padding: 60px 16px;
          }
          .rooms-header h2 {
            font-size: 28px;
          }
          .room-card .room-details .room-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .room-card .room-details .room-header .price {
            text-align: left;
            margin-top: 2px;
          }
          .room-card .room-image {
            height: 200px;
          }
          .room-card .room-details {
            padding: 16px 18px 20px;
          }
          .room-card .room-details .btn-view {
            font-size: 13px;
            padding: 8px 20px;
          }
        }
      `}</style>

      <section className="rooms-section" id="rooms">
        <div className="rooms-container">
          <div className="rooms-header">
            <div className="label">✦ ACCOMMODATIONS</div>
            <h2>Luxury Rooms & Suites</h2>
            <p>
              Experience comfort and elegance in our beautifully designed rooms,
              each crafted to provide the perfect stay.
            </p>
          </div>

          <div className="rooms-grid">
            {rooms.map((room) => (
              <Link key={room.id} to={`/room/${room.id}`} className="room-card">
                <div className="room-image">
                  <img src={room.image} alt={room.name} />
                  {room.popular && (
                    <div className="popular-badge">✦ Popular</div>
                  )}
                </div>
                <div className="room-details">
                  <div className="room-header">
                    <h3>{room.name}</h3>
                    <div className="price">
                      <span className="amount">{formatPrice(room.priceETB)}</span>
                      <span className="currency"> ETB</span>
                      <span className="per-night">/ night</span>
                    </div>
                  </div>
                  <div className="room-meta">
                    <span><Users size={14} /> {room.capacity} Guests</span>
                    <span>•</span>
                    <span><Bed size={14} /> {room.bedType}</span>
                    <span>•</span>
                    <span><Maximize size={14} /> {room.size}</span>
                  </div>
                  <p className="short-description">{room.shortDescription}</p>
                  <span className="btn-view">
                    View Details <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Rooms;