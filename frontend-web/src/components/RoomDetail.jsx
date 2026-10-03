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
          padding: 120px 24px 80px;
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
          font-family: 'Poppins', sans-serif;
        }

        .back-link:hover {
          color: #d4af37;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: start;
        }

        @media (min-width: 992px) {
          .detail-grid {
            grid-template-columns: 1.35fr 1fr;
            gap: 40px;
          }
        }

        /* ====== LEFT COLUMN: MEDIA CARD ====== */
        .detail-media-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.04);
        }

        .detail-image {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
        }

        .detail-image img {
          width: 100%;
          aspect-ratio: 16 / 10;
          max-height: 400px;
          object-fit: cover;
          display: block;
        }

        .detail-image .discount-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #ef4444;
          color: #ffffff;
          padding: 6px 16px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          z-index: 2;
          font-family: 'Montserrat', sans-serif;
        }

        /* Gallery */
        .room-gallery {
          margin-top: 16px;
        }

        .room-gallery .gallery-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-family: 'Montserrat', sans-serif;
        }

        .gallery-thumbnails {
          display: flex;
          gap: 12px;
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

        .gallery-thumb {
          width: 110px;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          cursor: pointer;
          border: 2.5px solid transparent;
          border-radius: 8px;
          transition: all 0.28s ease;
          flex-shrink: 0;
        }

        .gallery-thumb:hover {
          border-color: #d4af37;
          transform: translateY(-2px);
        }

        .gallery-thumb.active {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.25);
        }

        /* ====== LEFT COLUMN: INFO CARD ====== */
        .detail-info-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          margin-top: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.04);
        }

        .detail-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 13.5px;
          margin-bottom: 6px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
        }

        .detail-location svg {
          color: #d4af37;
          width: 15px;
          height: 15px;
        }

        .detail-name {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 10px 0;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: -0.5px;
        }

        .detail-name .bed-type {
          font-size: 16px;
          font-weight: 500;
          color: #6b7280;
          font-family: 'Poppins', sans-serif;
        }

        /* Rating Row inside Info Card */
        .detail-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .detail-rating .stars {
          display: flex;
          gap: 2px;
        }

        .detail-rating .rating-text {
          font-weight: 700;
          color: #1a1a1a;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
        }

        .detail-rating .review-count {
          color: #6b7280;
          font-size: 13.5px;
          font-family: 'Poppins', sans-serif;
        }

        .divider {
          border: none;
          border-top: 1px solid #f1f5f9;
          margin: 24px 0;
        }

        /* Room Meta Chips styling */
        .room-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .room-meta .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4b5563;
          font-size: 13.5px;
          background: #f8fafc;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid #f1f5f9;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
        }

        .room-meta .meta-item svg {
          color: #d4af37;
        }

        .detail-description {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.8;
          margin: 24px 0;
          font-family: 'Poppins', sans-serif;
        }

        /* Features Section */
        .features-title {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 16px 0;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin: 0;
        }

        .features-list .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          font-size: 13.5px;
          color: #374151;
          font-family: 'Poppins', sans-serif;
        }

        .features-list .feature-item svg {
          color: #d4af37;
          flex-shrink: 0;
        }

        /* ====== RIGHT COLUMN: STICKY BOOKING CARD ====== */
        .booking-sidebar-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
          position: sticky;
          top: 120px;
        }

        .detail-price {
          margin-bottom: 20px;
          font-family: 'Montserrat', sans-serif;
        }

        .detail-price .original-price {
          font-size: 15px;
          color: #9ca3af;
          text-decoration: line-through;
          margin-bottom: 2px;
          font-weight: 500;
        }

        .detail-price .current-price {
          font-size: 30px;
          font-weight: 800;
          color: #d4af37;
        }

        .detail-price .per-night {
          font-size: 13.5px;
          color: #6b7280;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
        }

        /* Form Container Inside Sidebar */
        .form-wrapper {
          margin-top: 8px;
        }

        /* Responsive Settings overrides */
        @media (max-width: 991px) {
          .room-detail-page {
            padding: 90px 16px 60px;
          }
          .detail-media-card,
          .detail-info-card,
          .booking-sidebar-card {
            padding: 24px;
          }
          .booking-sidebar-card {
            position: static;
            margin-top: 24px;
          }
        }

        @media (max-width: 640px) {
          .features-list {
            grid-template-columns: 1fr;
          }
          .detail-name {
            font-size: 22px;
          }
          .detail-price .current-price {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .room-detail-page {
            padding: 80px 12px 40px;
          }
          .detail-media-card,
          .detail-info-card,
          .booking-sidebar-card {
            padding: 16px;
          }
          .detail-name {
            font-size: 20px;
          }
          .gallery-thumb {
            width: 85px;
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
            {/* Left Column – Media & Info */}
            <div>
              {/* Media Card */}
              <div className="detail-media-card">
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
                      <Sparkles size={14} color="#d4af37" /> More Views
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

              {/* Info Card */}
              <div className="detail-info-card">
                {/* Location */}
                <div className="detail-location">
                  <MapPin size={15} />
                  {room.location}
                </div>

                {/* Room Name */}
                <h1 className="detail-name">
                  {room.name}
                  <span className="bed-type"> ({room.bedType})</span>
                </h1>

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
                <h4 className="features-title">Room Features</h4>
                <div className="features-list">
                  {room.features.map((feature, index) => (
                    <span key={index} className="feature-item">
                      {getFeatureIcon(feature)} {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column – Booking Sidebar Card */}
            <div className="booking-sidebar-card">
              {/* Price */}
              <div className="detail-price">
                {room.originalPriceETB && (
                  <div className="original-price">
                    ETB {formatPrice(room.originalPriceETB)}
                  </div>
                )}
                <div>
                  <span className="current-price">ETB {formatPrice(room.priceETB)}</span>
                  <span className="per-night"> / night</span>
                </div>
              </div>

              <hr className="divider" />

              {/* Booking Form */}
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