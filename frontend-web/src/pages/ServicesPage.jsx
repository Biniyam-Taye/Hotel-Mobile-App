// src/pages/ServicesPage.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Car, Phone, Shirt, Clock, Wifi, Coffee } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    { 
      icon: Car, 
      title: 'Airport Transfer', 
      description: 'Complimentary shuttle service to/from the airport', 
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1545459727-91a11aa93888?w=400&auto=format&fit=crop'
    },
    { 
      icon: Phone, 
      title: 'Room Service', 
      description: '24/7 in-dining with a wide selection of dishes', 
      price: '24/7',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop'
    },
    { 
      icon: Shirt, 
      title: 'Laundry & Dry Cleaning', 
      description: 'Professional express cleaning and pressing', 
      price: 'Premium',
      image: 'https://images.unsplash.com/photo-1545173166-9f3a3a2f79a0?w=400&auto=format&fit=crop'
    },
    { 
      icon: Clock, 
      title: 'Concierge Service', 
      description: 'Dedicated concierge for tours, dining, and more', 
      price: 'Complimentary',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop'
    },
    { 
      icon: Wifi, 
      title: 'High-Speed Wi-Fi', 
      description: 'Complimentary internet throughout the hotel', 
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&auto=format&fit=crop'
    },
    { 
      icon: Coffee, 
      title: 'Lounge Access', 
      description: 'Exclusive access to the executive lounge', 
      price: 'VIP',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop'
    },
  ];

  return (
    <>
      <style>{`
        .services-page {
          padding: 120px 24px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-hero {
          position: relative;
          height: 300px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 40px;
          background: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop') center/cover no-repeat;
        }

        .services-hero .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
          color: #ffffff;
        }

        .services-hero .overlay .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 16px;
          transition: color 0.3s;
        }

        .services-hero .overlay .back-link:hover {
          color: #d4af37;
        }

        .services-hero .overlay h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 42px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .services-hero .overlay p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          margin: 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .service-item {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          transition: all 0.4s ease;
        }

        .service-item:hover {
          transform: translateY(-6px);
          border-color: rgba(212, 175, 55, 0.15);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
        }

        .service-item .item-image {
          height: 160px;
          overflow: hidden;
        }

        .service-item .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-item:hover .item-image img {
          transform: scale(1.05);
        }

        .service-item .item-body {
          padding: 16px 20px 20px;
          text-align: center;
        }

        .service-item .item-body .icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(212, 175, 55, 0.08);
          border-radius: 50%;
          color: #d4af37;
          margin-bottom: 8px;
        }

        .service-item .item-body h3 {
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .service-item .item-body .description {
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 8px;
          line-height: 1.5;
        }

        .service-item .item-body .price-tag {
          display: inline-block;
          background: rgba(212, 175, 55, 0.1);
          color: #d4af37;
          padding: 2px 16px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .services-page { padding: 100px 16px 60px; }
          .services-hero { height: 220px; }
          .services-hero .overlay h1 { font-size: 28px; }
          .services-hero .overlay p { font-size: 15px; }
          .services-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 480px) {
          .services-hero { height: 180px; }
          .services-hero .overlay { padding: 20px; }
          .services-hero .overlay h1 { font-size: 22px; }
          .services-grid { grid-template-columns: 1fr; }
          .service-item .item-image { height: 130px; }
        }
      `}</style>

      <div className="services-page">
        <div className="services-hero">
          <div className="overlay">
            <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to Home</Link>
            <h1>Hotel Services</h1>
            <p>24/7 concierge and premium services for your comfort</p>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-item">
              <div className="item-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="item-body">
                <div className="icon-wrap"><service.icon size={22} /></div>
                <h3>{service.title}</h3>
                <p className="description">{service.description}</p>
                <span className="price-tag">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;