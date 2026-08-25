// src/components/RoomDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Wifi, Tv, AirVent, Coffee, Car, Users, Bath, 
  ArrowLeft, Star, Check, 
  Utensils, Dumbbell, Sparkles, Bed, Maximize, MapPin
} from 'lucide-react';
import AvailabilityForm from './AvailabilityForm';
import { fetchRoomById, formatPrice } from '../services/roomApi';

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchRoomById(id);
        if (!data) {
          setError('Room not found');
          return;
        }
        setRoom(data);
        setSelectedImage(data.image);
      } catch (err) {
        setError(err.message || 'Failed to load room');
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p>Loading room details...</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>{error || 'Room not found'}</h2>
        <Link to="/" style={{ color: '#d4af37' }}>Go back home</Link>
      </div>
    );
  }

  // Generate stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={18} fill="#d4af37" color="#d4af37" />);
    }
    if (halfStar) {
      stars.push(<Star key="half" size={18} fill="#d4af37" color="#d4af37" style={{ opacity: 0.5 }} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={18} color="#d1d5db" />);
    }
    return stars;
  };

  // Feature icons
  const getFeatureIcon = (feature) => {
    if (feature.includes('Wi-Fi')) return <Wifi size={16} />;
    if (feature.includes('TV') || feature.includes('Smart')) return <Tv size={16} />;
    if (feature.includes('Air')) return <AirVent size={16} />;
    if (feature.includes('Coffee') || feature.includes('Mini Bar')) return <Coffee size={16} />;
    if (feature.includes('Car') || feature.includes('Parking')) return <Car size={16} />;
    if (feature.includes('Gym') || feature.includes('Fitness')) return <Dumbbell size={16} />;
    if (feature.includes('Bathtub') || feature.includes('Jacuzzi')) return <Bath size={16} />;
    if (feature.includes('Terrace') || feature.includes('Balcony')) return <Sparkles size={16} />;
    if (feature.includes('Butler') || feature.includes('Concierge')) return <Star size={16} />;
    if (feature.includes('Game')) return <Users size={16} />;
    if (feature.includes('Room Service')) return <Utensils size={16} />;
    return <Check size={16} />;
  };

  return (
    <>
      <style>{`
        .room-detail-page {
          background: #f8f9fa;
          min-height: 100vh;
          padding: 100px 24px 80px;
        }

        .room-detail-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 24px;
          transition: color 0.3s;
        }

        .back-link:hover {
          color: #d4af37;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        /* Main Image */
        .detail-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .detail-image img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }

        .detail-image .discount-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #ef4444;
          color: #ffffff;
          padding: 8px 20px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          z-index: 2;
        }

        /* ===== GALLERY THUMBNAILS ===== */
        .room-gallery {
          margin-top: 16px;
        }

        .room-gallery .gallery-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .gallery-thumbnails {
          display: flex;
          gap: 16px; /* Increased gap for spacing */
          overflow-x: auto;
          padding-bottom: 8px;
          scroll-behavior: smooth;
        }

        .gallery-thumbnails::-webkit-scrollbar {
          height: 4px;
        }

        .gallery-thumbnails::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 4px;
        }

        /* UPDATED: Made the thumbnails much larger */
        .gallery-thumb {
          width: 180px;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .gallery-thumb:hover {
          border-color: #d4af37;
          transform: scale(1.05);
        }

        .gallery-thumb.active {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
        }

        /* Content Card (right side) */
        .detail-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          border: 1px solid #e5e7eb;
        }

        .detail-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .detail-location svg {
          color: #d4af37;
          width: 16px;
          height: 16px;
        }

        .detail-name {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .detail-name .bed-type {
          font-size: 16px;
          font-weight: 400;
          color: #6b7280;
        }

        .detail-price {
          margin: 12px 0 8px;
        }

        .detail-price .original-price {
          font-size: 16px;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .detail-price .current-price {
          font-size: 32px;
          font-weight: 700;
          color: #d4af37;
        }

        .detail-price .per-night {
          font-size: 14px;
          color: #6b7280;
          font-weight: 400;
        }

        .detail-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0 16px;
          flex-wrap: wrap;
        }

        .detail-rating .stars {
          display: flex;
          gap: 2px;
        }

        .detail-rating .rating-text {
          font-weight: 600;
          color: #1a1a1a;
        }

        .detail-rating .review-count {
          color: #6b7280;
          font-size: 14px;
        }

        .divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 16px 0;
        }

        .room-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .room-meta .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4b5563;
          font-size: 14px;
        }

        .room-meta .meta-item svg {
          color: #d4af37;
        }

        .detail-description {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.8;
          margin: 16px 0;
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin: 12px 0;
        }

        .features-list .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 14px;
          color: #374151;
        }

        .features-list .feature-item svg {
          color: #d4af37;
          flex-shrink: 0;
        }

        /* ----- AvailabilityForm container ----- */
        .form-wrapper {
          margin-top: 20px;
        }

        @media (min-width: 992px) {
          .detail-grid {
            grid-template-columns: 1fr 1fr;
          }
          /* Larger on desktop */
          .gallery-thumb {
            width: 200px;
          }
        }

        @media (max-width: 768px) {
          .room-detail-page {
            padding: 90px 16px 60px;
          }
          .detail-card {
            padding: 20px;
          }
          .detail-name {
            font-size: 22px;
          }
          .detail-price .current-price {
            font-size: 26px;
          }
          /* Slightly smaller on tablets */
          .gallery-thumb {
            width: 140px;
          }
          .features-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .room-detail-page {
            padding: 80px 12px 40px;
          }
          .detail-card {
            padding: 16px;
          }
          .detail-name {
            font-size: 18px;
          }
          .detail-price .current-price {
            font-size: 22px;
          }
          .detail-rating {
            gap: 4px;
          }
          .detail-rating .stars {
            gap: 1px;
          }
          /* Mobile size */
          .gallery-thumb {
            width: 110px;
          }
          .features-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="room-detail-page">
        <div className="room-detail-container">
          {/* Back Button */}
          <Link to="/#rooms" className="back-link">
            <ArrowLeft size={18} /> Back to Rooms
          </Link>

          <div className="detail-grid">
            {/* Left Column – Image & Gallery */}
            <div>
              <div className="detail-image">
                <img src={selectedImage} alt={room.name} />
                {room.discount > 0 && (
                  <div className="discount-badge">{room.discount}% OFF</div>
                )}
              </div>

              {/* Gallery */}
              {room.gallery && room.gallery.length > 1 && (
                <div className="room-gallery">
                  <div className="gallery-label">
                    <Sparkles size={16} color="#d4af37" /> More Views
                  </div>
                  <div className="gallery-thumbnails">
                    {room.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${room.name} view ${idx + 1}`}
                        className={`gallery-thumb ${selectedImage === img ? 'active' : ''}`}
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column – Details + Availability Form */}
            <div className="detail-card">
              {/* Location */}
              <div className="detail-location">
                <MapPin size={16} />
                {room.location}
              </div>

              {/* Room Name */}
              <h1 className="detail-name">
                {room.name}
                <span className="bed-type"> ({room.bedType})</span>
              </h1>

              {/* Price */}
              <div className="detail-price">
                {room.discount > 0 && (
                  <div className="original-price">
                    ETB {formatPrice(Math.round(room.priceETB + (room.priceETB * room.discount / 100)))}
                  </div>
                )}
                <div>
                  <span className="current-price">ETB {formatPrice(room.priceETB)}</span>
                  <span className="per-night"> / night</span>
                </div>
              </div>

              {/* Rating */}
              <div className="detail-rating">
                <div className="stars">{renderStars(room.rating)}</div>
                <span className="rating-text">{room.rating}</span>
                <span className="review-count">({room.reviews}+ reviews)</span>
              </div>

              <hr className="divider" />

              {/* Room Meta */}
              <div className="room-meta">
                <span className="meta-item"><Users size={16} /> {room.guests} Guests</span>
                <span className="meta-item"><Bed size={16} /> {room.bed}</span>
                <span className="meta-item"><Maximize size={16} /> {room.size}</span>
              </div>

              {/* Description */}
              <p className="detail-description">{room.longDescription}</p>

              <hr className="divider" />

              {/* Features */}
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 12px 0' }}>
                Room Features
              </h4>
              <div className="features-list">
                {room.features.map((feature, index) => (
                  <span key={index} className="feature-item">
                    {getFeatureIcon(feature)} {feature}
                  </span>
                ))}
              </div>

              {/* ===== AVAILABILITY FORM ===== */}
              <div className="form-wrapper">
                <AvailabilityForm roomName={room.name} roomPrice={room.priceETB} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;