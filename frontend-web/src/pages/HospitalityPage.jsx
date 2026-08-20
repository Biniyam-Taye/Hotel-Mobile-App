// src/pages/HospitalityPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, Coffee, Wine, Cake, Dumbbell, Droplets, Sparkles, 
  Clock, Car, Shirt, Phone, MapPin, Star, ArrowRight,
  Wifi, Users, Bath
} from 'lucide-react';

const HospitalityPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const menuItems = [
    { category: 'Appetizers', name: 'Bruschetta', description: 'Toasted bread with tomato, garlic, and basil', price: '450' },
    { category: 'Appetizers', name: 'Calamari Fritti', description: 'Crispy fried squid with lemon aioli', price: '550' },
    { category: 'Main Courses', name: 'Grilled Lamb Chops', description: 'Served with rosemary potatoes and mint sauce', price: '1,200' },
    { category: 'Main Courses', name: 'Seafood Paella', description: 'Saffron rice with shrimp, mussels, and clams', price: '1,400' },
    { category: 'Desserts', name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: '350' },
    { category: 'Desserts', name: 'Chocolate Fondant', description: 'Warm chocolate cake with vanilla ice cream', price: '400' },
    { category: 'Drinks', name: 'Signature Cocktails', description: 'Handcrafted by our expert mixologists', price: '400' },
    { category: 'Drinks', name: 'Fresh Juices', description: 'Seasonal fruit juices and smoothies', price: '200' },
  ];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Drinks'];

  // Wellness facilities
  const wellnessFacilities = [
    { icon: Droplets, title: 'Swimming Pool', description: 'Outdoor pool with sun loungers and poolside bar. Open 7:00 AM – 9:00 PM daily.', link: '/pool' },
    { icon: Dumbbell, title: 'Fitness Gym', description: 'State‑of‑the‑art equipment with 24/7 access for all guests.', link: '/fitness' },
    { icon: Sparkles, title: 'Spa & Wellness', description: 'Signature treatments, sauna, and massage therapies for ultimate relaxation.', link: '/spa' },
  ];

  // Hotel services
  const hotelServices = [
    { icon: Phone, title: '24/7 Room Service', description: 'In-room dining with a wide selection of dishes, available around the clock.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop' },
    { icon: Car, title: 'Airport Transport', description: 'Complimentary shuttle service to and from Adama International Airport.', image: 'https://images.unsplash.com/photo-1545459727-91a11aa93888?w=400&auto=format&fit=crop' },
    { icon: Shirt, title: 'Laundry & Dry Cleaning', description: 'Professional laundry and dry cleaning services with express delivery options.', image: 'https://images.unsplash.com/photo-1545173166-9f3a3a2f79a0?w=400&auto=format&fit=crop' },
  ];

  return (
    <>
      <style>{`
        .hospitality-page {
          background: #f8f9fa;
          min-height: 100vh;
          padding: 120px 24px 80px;
        }

        .hospitality-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ===== HEADER ===== */
        .hospitality-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .hospitality-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .hospitality-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .hospitality-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ===== SECTION 1: RESTAURANT & MENU ===== */
        .menu-section {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
        }

        .menu-section .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .menu-section .section-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .menu-section .section-header h2 span {
          color: #d4af37;
        }

        .menu-categories {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .menu-categories button {
          padding: 6px 18px;
          border: 2px solid #e5e7eb;
          background: transparent;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .menu-categories button:hover {
          border-color: #d4af37;
          color: #d4af37;
        }

        .menu-categories button.active {
          background: #d4af37;
          border-color: #d4af37;
          color: #1a1a1a;
        }

        .menu-items {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .menu-item:hover {
          background: #fef9e7;
          transform: translateX(4px);
        }

        .menu-item .info {
          flex: 1;
        }

        .menu-item .info .name {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .menu-item .info .desc {
          font-size: 13px;
          color: #6b7280;
          margin: 2px 0 0;
        }

        .menu-item .price-order {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-item .price-order .price {
          font-size: 16px;
          font-weight: 700;
          color: #d4af37;
        }

        .menu-item .price-order .btn-order {
          padding: 6px 18px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          text-decoration: none;
        }

        .menu-item .price-order .btn-order:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* ===== SECTION 2: WELLNESS & LEISURE ===== */
        .wellness-section {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
        }

        .wellness-section .section-header {
          margin-bottom: 24px;
        }

        .wellness-section .section-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .wellness-section .section-header h2 span {
          color: #d4af37;
        }

        .wellness-section .section-header p {
          color: #6b7280;
          font-size: 14px;
        }

        .wellness-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .wellness-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background: #f8f9fa;
          border-radius: 16px;
          border: 1px solid #f1f3f5;
          transition: all 0.4s ease;
          text-decoration: none;
          color: inherit;
        }

        .wellness-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.2);
          box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        .wellness-card .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 50%;
          color: #d4af37;
          flex-shrink: 0;
        }

        .wellness-card .content {
          flex: 1;
        }

        .wellness-card .content h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 2px;
        }

        .wellness-card .content p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }

        .wellness-card .arrow {
          color: #d4af37;
          flex-shrink: 0;
        }

        /* ===== SECTION 3: HOTEL SERVICES ===== */
        .services-section {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
        }

        .services-section .section-header {
          margin-bottom: 24px;
        }

        .services-section .section-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .services-section .section-header h2 span {
          color: #d4af37;
        }

        .services-section .section-header p {
          color: #6b7280;
          font-size: 14px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .service-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          transition: all 0.4s ease;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
          border-color: rgba(212, 175, 55, 0.15);
        }

        .service-card .service-image {
          height: 180px;
          overflow: hidden;
        }

        .service-card .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-card:hover .service-image img {
          transform: scale(1.05);
        }

        .service-card .service-body {
          padding: 20px 24px 24px;
        }

        .service-card .service-body .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(212, 175, 55, 0.08);
          border-radius: 50%;
          color: #d4af37;
          margin-bottom: 10px;
        }

        .service-card .service-body h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .service-card .service-body p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 12px;
        }

        .service-card .service-body .btn-service {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 20px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }

        .service-card .service-body .btn-service:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        /* ===== RESPONSIVE ===== */
        @media (min-width: 768px) {
          .wellness-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .menu-items {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hospitality-page {
            padding: 100px 16px 60px;
          }
          .hospitality-header h1 {
            font-size: 30px;
          }
          .menu-section .section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .wellness-card {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .hospitality-page {
            padding: 90px 12px 40px;
          }
          .hospitality-header h1 {
            font-size: 24px;
          }
          .menu-section, .wellness-section, .services-section {
            padding: 20px 16px;
          }
          .menu-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .menu-item .price-order {
            width: 100%;
            justify-content: space-between;
          }
          .service-card .service-image {
            height: 140px;
          }
        }
      `}</style>

      <div className="hospitality-page">
        <div className="hospitality-container">
          {/* Header */}
          <div className="hospitality-header">
            <div className="label">✦ Hospitality</div>
            <h1>Villa Alpha International Hotel</h1>
            <p>LUXURY ACCOMMODATION & SERVICES</p>
          </div>

          {/* ===== SECTION 1: RESTAURANT & MENU ===== */}
          <div className="menu-section">
            <div className="section-header">
              <h2>Restaurant & <span>Menu</span></h2>
              <div className="menu-categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={activeCategory === cat ? 'active' : ''}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="menu-items">
              {filteredItems.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="info">
                    <div className="name">{item.name}</div>
                    <div className="desc">{item.description}</div>
                  </div>
                  <div className="price-order">
                    <span className="price">ETB {item.price}</span>
                    <button className="btn-order" onClick={() => alert(`Ordered: ${item.name}`)}>
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== SECTION 2: WELLNESS & LEISURE ===== */}
          <div className="wellness-section">
            <div className="section-header">
              <h2>Wellness & <span>Leisure</span></h2>
              <p>Recharge, relax, and rejuvenate with our premium facilities</p>
            </div>
            <div className="wellness-grid">
              {wellnessFacilities.map((facility, index) => (
                <Link key={index} to={facility.link} className="wellness-card">
                  <div className="icon">
                    <facility.icon size={28} />
                  </div>
                  <div className="content">
                    <h4>{facility.title}</h4>
                    <p>{facility.description}</p>
                  </div>
                  <div className="arrow">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ===== SECTION 3: HOTEL SERVICES ===== */}
          <div className="services-section">
            <div className="section-header">
              <h2>Hotel <span>Services</span></h2>
              <p>Exclusive services designed for your comfort and convenience</p>
            </div>
            <div className="services-grid">
              {hotelServices.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service-body">
                    <div className="icon">
                      <service.icon size={22} />
                    </div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                    <button className="btn-service" onClick={() => alert(`Requested: ${service.title}`)}>
                      Request Service <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalityPage;