// src/components/RoomDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Wifi, Tv, AirVent, Coffee, Car, Users, Bath, 
  ArrowLeft, Star, Check, 
  Utensils, Dumbbell, Sparkles, Bed, Maximize, MapPin
} from 'lucide-react';
import AvailabilityForm from './AvailabilityForm';

const RoomDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState('');

  // Exchange rate
  const usdToEtb = 57;

  // Helper to format price
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Room data with location, discount, and gallery
  const rooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      bedType: 'King Size Bed',
      priceUSD: 250,
      priceETB: 250 * usdToEtb,
      location: 'Adama',
      discount: 20,
      rating: 4.8,
      reviews: 200,
      capacity: 2,
      size: '45 m²',
      description: 'Elegant suite with city views, featuring a separate living area and premium amenities.',
      longDescription: 'The Deluxe Suite offers an unparalleled experience with breathtaking city views. Step into a world of elegance where every detail has been carefully curated for your comfort. The suite features a spacious separate living area, perfect for entertaining guests or simply relaxing in style. The bedroom boasts a luxurious king-size bed with premium linens, ensuring a restful night\'s sleep. The marble bathroom includes a deep soaking tub and separate rain shower. 24-hour room service ensures your every need is met, while the dedicated concierge team is always ready to assist with any request.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub', '24hr Room Service', 'Concierge Service'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: true,
      amenities: ['Free Wi-Fi', '24hr Room Service', 'Concierge', 'Laundry Service', 'Daily Housekeeping', 'Welcome Drink', 'Turn-down Service', 'Work Desk', 'Bathrobe & Slippers'],
      guests: 2,
      bed: 'King Size',
      gallery: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 2,
      name: 'Executive Double Room',
      bedType: 'Double Bed',
      priceUSD: 180,
      priceETB: 180 * usdToEtb,
      location: 'Adama',
      discount: 20,
      rating: 4.8,
      reviews: 200,
      capacity: 2,
      size: '32 m²',
      description: 'Modern room designed for business travelers, with workspace and high-speed internet.',
      longDescription: 'The Executive Room is designed with the modern business traveler in mind. Featuring a dedicated workspace with ergonomic chair and high-speed internet, this room provides the perfect environment for productivity. After a long day of meetings, unwind in the comfortable queen-size bed and enjoy the flat-screen TV with streaming services. The room also includes a mini-fridge, coffee maker, and luxurious bath amenities. Business services including printing, scanning, and secretarial support are available upon request.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Work Desk', 'Ergonomic Chair', 'Mini Refrigerator', 'Business Services'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Free Wi-Fi', 'Work Desk', 'Business Services', 'Express Check-in', 'Daily Housekeeping', 'Iron & Ironing Board'],
      guests: 2,
      bed: 'Double Bed',
      gallery: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 3,
      name: 'Presidential Suite',
      bedType: 'King Size Bed + Sofa Bed',
      priceUSD: 450,
      priceETB: 450 * usdToEtb,
      location: 'Adama',
      discount: 15,
      rating: 4.9,
      reviews: 150,
      capacity: 4,
      size: '85 m²',
      description: 'Our most luxurious suite with panoramic views, private terrace, and butler service.',
      longDescription: 'The Presidential Suite is the epitome of luxury living. Spanning an impressive 85 square meters, this suite offers panoramic views of the city skyline from a private terrace. The suite features a spacious living area with a designer sofa bed, a separate dining area, and a fully equipped kitchenette. The bedroom boasts a king-size bed with premium Egyptian cotton linens and a pillow menu for the perfect night\'s sleep. The marble bathroom includes a Jacuzzi bathtub, rain shower, and double vanities. A dedicated butler is available to cater to your every need, from packing and unpacking to arranging private tours and dining experiences.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub', 'Private Terrace', 'Butler Service'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Butler Service', 'Private Terrace', 'Jacuzzi', 'Kitchenette', 'Dining Area', 'Welcome Champagne', 'Turn-down Service', 'Premium Toiletries'],
      guests: 4,
      bed: 'King Size + Sofa',
      gallery: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 4,
      name: 'Standard Room',
      bedType: 'Double Bed',
      priceUSD: 120,
      priceETB: 120 * usdToEtb,
      location: 'Adama',
      discount: 0,
      rating: 4.5,
      reviews: 180,
      capacity: 2,
      size: '24 m²',
      description: 'Comfortable room with all essential amenities for a pleasant stay.',
      longDescription: 'The Standard Room offers a comfortable and inviting space for travelers seeking value without compromising on quality. The room features a cozy double bed with comfortable linens, a flat-screen TV, and a work desk. The private bathroom is equipped with a shower and complimentary toiletries. Enjoy the convenience of free Wi-Fi, air conditioning, and a coffee maker. This room is perfect for solo travelers, couples, or business guests looking for a comfortable stay at an affordable price.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Work Desk', 'Private Bathroom'],
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Free Wi-Fi', 'Daily Housekeeping', 'Complimentary Toiletries', 'Work Desk'],
      guests: 2,
      bed: 'Double Bed',
      gallery: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 5,
      name: 'Family Suite',
      bedType: 'King Size Bed + 2 Twin Beds',
      priceUSD: 320,
      priceETB: 320 * usdToEtb,
      location: 'Adama',
      discount: 10,
      rating: 4.7,
      reviews: 120,
      capacity: 5,
      size: '65 m²',
      description: 'Spacious suite designed for families, with separate children\'s area and entertainment.',
      longDescription: 'The Family Suite is perfect for families seeking space and comfort. This suite features a separate children\'s area with a game console, board games, and a selection of movies. The master bedroom boasts a king-size bed with premium linens, while the second area includes two comfortable twin beds. The suite also features a living area with a sofa bed, a dining area, and a kitchenette. The bathroom includes a bathtub and separate shower. Family-friendly amenities include a kids\' menu, babysitting services on request, and complimentary activities for children.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Game Console', 'Children\'s Area', 'Family Services'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Game Console', 'Kids Activities', 'Babysitting Service', 'Children\'s Menu', 'Family Board Games', 'Kitchenette'],
      guests: 5,
      bed: 'King Size + 2 Twins',
      gallery: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ]
    },
    {
      id: 6,
      name: 'Honeymoon Suite',
      bedType: 'King Size Bed',
      priceUSD: 380,
      priceETB: 380 * usdToEtb,
      location: 'Adama',
      discount: 25,
      rating: 4.9,
      reviews: 250,
      capacity: 2,
      size: '55 m²',
      description: 'Romantic suite with jacuzzi, rose petals, and breathtaking sunset views.',
      longDescription: 'The Honeymoon Suite is designed for romance and celebration. Upon arrival, guests are welcomed with rose petals, champagne, and chocolates. The suite features a king-size bed with premium linens, a cozy sitting area, and a private balcony with breathtaking sunset views. The highlight of the suite is the jacuzzi bathtub, perfect for a romantic soak. The suite also includes a mini bar, coffee maker, and luxurious bath amenities. Couples can enjoy personalized services including private dining, spa packages, and romantic excursions arranged by our dedicated concierge team.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Jacuzzi', 'Mini Bar', 'Private Balcony', 'Romantic Setup'],
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Jacuzzi', 'Private Balcony', 'Romantic Setup', 'Complimentary Champagne', 'Rose Petals', 'Chocolate Truffles', 'Couples Spa Services'],
      guests: 2,
      bed: 'King Size',
      gallery: [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ]
    }
  ];

  const room = rooms.find(r => r.id === parseInt(id));

  // Reset selected image when room changes
  useEffect(() => {
    if (room) {
      setSelectedImage(room.image);
    }
  }, [room]);

  if (!room) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Room not found</h2>
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