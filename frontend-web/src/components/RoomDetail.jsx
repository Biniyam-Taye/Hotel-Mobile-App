// src/components/RoomDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Wifi, Tv, AirVent, Coffee, Car, Users, Bath, 
  ArrowLeft, Star, Calendar, User, Check, 
  Utensils, Dumbbell, Sparkles, Phone, Mail, MapPin 
} from 'lucide-react';

const RoomDetail = () => {
  const { id } = useParams();
  const [showBooking, setShowBooking] = useState(false);

  // Room data - same as before but with more details
  const rooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      price: 250,
      capacity: 2,
      bedType: 'King Size Bed',
      size: '45 m²',
      description: 'Elegant suite with city views, featuring a separate living area and premium amenities.',
      longDescription: 'The Deluxe Suite offers an unparalleled experience with breathtaking city views. Step into a world of elegance where every detail has been carefully curated for your comfort. The suite features a spacious separate living area, perfect for entertaining guests or simply relaxing in style. The bedroom boasts a luxurious king-size bed with premium linens, ensuring a restful night\'s sleep. The marble bathroom includes a deep soaking tub and separate rain shower. 24-hour room service ensures your every need is met, while the dedicated concierge team is always ready to assist with any request.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub', '24hr Room Service', 'Concierge Service'],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: true,
      amenities: ['Free Wi-Fi', '24hr Room Service', 'Concierge', 'Laundry Service', 'Daily Housekeeping', 'Welcome Drink', 'Turn-down Service', 'Work Desk', 'Bathrobe & Slippers'],
      guests: 2,
      bed: 'King Size'
    },
    {
      id: 2,
      name: 'Executive Room',
      price: 180,
      capacity: 2,
      bedType: 'Queen Size Bed',
      size: '32 m²',
      description: 'Modern room designed for business travelers, with workspace and high-speed internet.',
      longDescription: 'The Executive Room is designed with the modern business traveler in mind. Featuring a dedicated workspace with ergonomic chair and high-speed internet, this room provides the perfect environment for productivity. After a long day of meetings, unwind in the comfortable queen-size bed and enjoy the flat-screen TV with streaming services. The room also includes a mini-fridge, coffee maker, and luxurious bath amenities. Business services including printing, scanning, and secretarial support are available upon request.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Work Desk', 'Ergonomic Chair', 'Mini Refrigerator', 'Business Services'],
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Free Wi-Fi', 'Work Desk', 'Business Services', 'Express Check-in', 'Daily Housekeeping', 'Iron & Ironing Board'],
      guests: 2,
      bed: 'Queen Size'
    },
    {
      id: 3,
      name: 'Presidential Suite',
      price: 450,
      capacity: 4,
      bedType: 'King Size Bed + Sofa Bed',
      size: '85 m²',
      description: 'Our most luxurious suite with panoramic views, private terrace, and butler service.',
      longDescription: 'The Presidential Suite is the epitome of luxury living. Spanning an impressive 85 square meters, this suite offers panoramic views of the city skyline from a private terrace. The suite features a spacious living area with a designer sofa bed, a separate dining area, and a fully equipped kitchenette. The bedroom boasts a king-size bed with premium Egyptian cotton linens and a pillow menu for the perfect night\'s sleep. The marble bathroom includes a Jacuzzi bathtub, rain shower, and double vanities. A dedicated butler is available to cater to your every need, from packing and unpacking to arranging private tours and dining experiences.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub', 'Private Terrace', 'Butler Service'],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: true,
      amenities: ['Butler Service', 'Private Terrace', 'Jacuzzi', 'Kitchenette', 'Dining Area', 'Welcome Champagne', 'Turn-down Service', 'Premium Toiletries'],
      guests: 4,
      bed: 'King Size + Sofa'
    },
    {
      id: 4,
      name: 'Standard Room',
      price: 120,
      capacity: 2,
      bedType: 'Double Bed',
      size: '24 m²',
      description: 'Comfortable room with all essential amenities for a pleasant stay.',
      longDescription: 'The Standard Room offers a comfortable and inviting space for travelers seeking value without compromising on quality. The room features a cozy double bed with comfortable linens, a flat-screen TV, and a work desk. The private bathroom is equipped with a shower and complimentary toiletries. Enjoy the convenience of free Wi-Fi, air conditioning, and a coffee maker. This room is perfect for solo travelers, couples, or business guests looking for a comfortable stay at an affordable price.',
      features: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker', 'Work Desk', 'Private Bathroom'],
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Free Wi-Fi', 'Daily Housekeeping', 'Complimentary Toiletries', 'Work Desk'],
      guests: 2,
      bed: 'Double Bed'
    },
    {
      id: 5,
      name: 'Family Suite',
      price: 320,
      capacity: 5,
      bedType: 'King Size Bed + 2 Twin Beds',
      size: '65 m²',
      description: 'Spacious suite designed for families, with separate children\'s area and entertainment.',
      longDescription: 'The Family Suite is perfect for families seeking space and comfort. This suite features a separate children\'s area with a game console, board games, and a selection of movies. The master bedroom boasts a king-size bed with premium linens, while the second area includes two comfortable twin beds. The suite also features a living area with a sofa bed, a dining area, and a kitchenette. The bathroom includes a bathtub and separate shower. Family-friendly amenities include a kids\' menu, babysitting services on request, and complimentary activities for children.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Game Console', 'Children\'s Area', 'Family Services'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: false,
      amenities: ['Game Console', 'Kids Activities', 'Babysitting Service', 'Children\'s Menu', 'Family Board Games', 'Kitchenette'],
      guests: 5,
      bed: 'King Size + 2 Twins'
    },
    {
      id: 6,
      name: 'Honeymoon Suite',
      price: 380,
      capacity: 2,
      bedType: 'King Size Bed',
      size: '55 m²',
      description: 'Romantic suite with jacuzzi, rose petals, and breathtaking sunset views.',
      longDescription: 'The Honeymoon Suite is designed for romance and celebration. Upon arrival, guests are welcomed with rose petals, champagne, and chocolates. The suite features a king-size bed with premium linens, a cozy sitting area, and a private balcony with breathtaking sunset views. The highlight of the suite is the jacuzzi bathtub, perfect for a romantic soak. The suite also includes a mini bar, coffee maker, and luxurious bath amenities. Couples can enjoy personalized services including private dining, spa packages, and romantic excursions arranged by our dedicated concierge team.',
      features: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Jacuzzi', 'Mini Bar', 'Private Balcony', 'Romantic Setup'],
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      popular: true,
      amenities: ['Jacuzzi', 'Private Balcony', 'Romantic Setup', 'Complimentary Champagne', 'Rose Petals', 'Chocolate Truffles', 'Couples Spa Services'],
      guests: 2,
      bed: 'King Size'
    }
  ];

  const room = rooms.find(r => r.id === parseInt(id));

  if (!room) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Room not found</h2>
        <Link to="/" style={{ color: '#d4af37' }}>Go back home</Link>
      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();
    alert('🎉 Booking confirmed! We will contact you shortly.');
    setShowBooking(false);
  };

  // Feature icons
  const getFeatureIcon = (feature) => {
    if (feature.includes('Wi-Fi')) return <Wifi size={18} />;
    if (feature.includes('TV') || feature.includes('Smart')) return <Tv size={18} />;
    if (feature.includes('Air')) return <AirVent size={18} />;
    if (feature.includes('Coffee') || feature.includes('Mini Bar')) return <Coffee size={18} />;
    if (feature.includes('Car') || feature.includes('Parking')) return <Car size={18} />;
    if (feature.includes('Gym') || feature.includes('Fitness')) return <Dumbbell size={18} />;
    if (feature.includes('Bathtub') || feature.includes('Jacuzzi')) return <Bath size={18} />;
    if (feature.includes('Terrace') || feature.includes('Balcony')) return <Sparkles size={18} />;
    if (feature.includes('Butler') || feature.includes('Concierge')) return <Star size={18} />;
    if (feature.includes('Game')) return <Users size={18} />;
    if (feature.includes('Room Service')) return <Utensils size={18} />;
    return <Check size={18} />;
  };

  return (
    <>
      <style>{`
        /* ===== ROOM DETAIL STYLES ===== */
        .room-detail-page {
          padding: 40px 24px 80px;
          background: #f8f9fa;
          min-height: 100vh;
        }

        .room-detail-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Back Button */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 24px;
          transition: color 0.3s;
        }

        .back-btn:hover {
          color: #d4af37;
        }

        /* Main Layout */
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        .detail-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .detail-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        .detail-image .badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #d4af37;
          color: #1a1a1a;
          padding: 6px 18px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .detail-content .room-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .detail-content .room-price {
          font-size: 36px;
          font-weight: 700;
          color: #d4af37;
        }

        .detail-content .room-price span {
          font-size: 16px;
          color: #6b7280;
          font-weight: 400;
        }

        .detail-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 16px 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-meta .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4b5563;
          font-size: 14px;
        }

        .detail-meta .meta-item svg {
          color: #d4af37;
        }

        .detail-description {
          color: #4b5563;
          font-size: 16px;
          line-height: 1.8;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 8px 0;
        }

        .features-grid .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
          color: #374151;
        }

        .features-grid .feature-item svg {
          color: #d4af37;
          flex-shrink: 0;
        }

        /* Amenities */
        .amenities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 4px 0 8px;
        }

        .amenities-list .amenity {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f3f4f6;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 13px;
          color: #4b5563;
        }

        .amenities-list .amenity svg {
          color: #d4af37;
        }

        .btn-book-now {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 40px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }

        .btn-book-now:hover {
          background: #c5a028;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.35);
        }

        /* Booking Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: #ffffff;
          border-radius: 20px;
          max-width: 520px;
          width: 100%;
          padding: 32px;
          animation: slideUp 0.4s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content .modal-close {
          float: right;
          background: none;
          border: none;
          font-size: 24px;
          color: #6b7280;
          cursor: pointer;
          transition: color 0.3s;
        }

        .modal-content .modal-close:hover {
          color: #1a1a1a;
        }

        .modal-content h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .modal-content .modal-price {
          color: #d4af37;
          font-size: 28px;
          font-weight: 700;
        }

        .modal-content .modal-price span {
          font-size: 14px;
          color: #6b7280;
          font-weight: 400;
        }

        .modal-content .form-group {
          margin: 16px 0;
        }

        .modal-content .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }

        .modal-content .form-group input,
        .modal-content .form-group select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .modal-content .form-group input:focus,
        .modal-content .form-group select:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }

        .modal-content .btn-confirm {
          width: 100%;
          padding: 14px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
          font-family: 'Poppins', sans-serif;
        }

        .modal-content .btn-confirm:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        }

        .modal-content .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Responsive */
        @media (min-width: 992px) {
          .detail-grid {
            grid-template-columns: 1fr 1fr;
          }
          .detail-image img {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .room-detail-page {
            padding: 24px 16px 60px;
          }
          .detail-content .room-title {
            font-size: 26px;
          }
          .detail-content .room-price {
            font-size: 28px;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .detail-image img {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .detail-meta {
            gap: 12px;
          }
          .modal-content {
            padding: 20px;
          }
          .modal-content .form-row {
            grid-template-columns: 1fr;
          }
          .btn-book-now {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="room-detail-page">
        <div className="room-detail-container">
          {/* Back Button */}
          <Link to="/#rooms" className="back-btn">
            <ArrowLeft size={18} /> Back to Rooms
          </Link>

          <div className="detail-grid">
            {/* Image */}
            <div className="detail-image">
              <img src={room.image} alt={room.name} />
              {room.popular && (
                <div className="badge">✦ Popular</div>
              )}
            </div>

            {/* Content */}
            <div className="detail-content">
              <h1 className="room-title">{room.name}</h1>
              <div className="room-price">
                ${room.price} <span>/ night</span>
              </div>

              <div className="detail-meta">
                <span className="meta-item">
                  <Users size={16} /> {room.guests} Guests
                </span>
                <span className="meta-item">
                  <Star size={16} /> {room.bed}
                </span>
                <span className="meta-item">
                  <Sparkles size={16} /> {room.size}
                </span>
              </div>

              <p className="detail-description">{room.longDescription}</p>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                  Room Features
                </h4>
                <div className="features-grid">
                  {room.features.map((feature, index) => (
                    <span key={index} className="feature-item">
                      {getFeatureIcon(feature)} {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                  Premium Amenities
                </h4>
                <div className="amenities-list">
                  {room.amenities.map((amenity, index) => (
                    <span key={index} className="amenity">
                      <Check size={14} /> {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <button className="btn-book-now" onClick={() => setShowBooking(true)}>
                Book This Room <Calendar size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="modal-overlay" onClick={() => setShowBooking(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBooking(false)}>✕</button>
            <h3>{room.name}</h3>
            <div className="modal-price">
              ${room.price} <span>/ night</span>
            </div>

            <form onSubmit={handleBooking}>
              <div className="form-row">
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input type="date" required />
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1 234 567 890" required />
                </div>
                <div className="form-group">
                  <label>Number of Guests</label>
                  <select required>
                    <option value="1">1 Guest</option>
                    <option value="2" selected>2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-confirm">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetail;