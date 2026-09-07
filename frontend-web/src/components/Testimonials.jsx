// src/components/Testimonials.jsx
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from './common/ScrollReveal';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'London, UK',
      rating: 5,
      quote: 'An absolutely unforgettable experience! The service was impeccable, the room was stunning, and the views were breathtaking. I cannot recommend Villa Alpha enough.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'Singapore',
      rating: 5,
      quote: 'From the moment we arrived, we felt like royalty. The staff went above and beyond to make our stay special. The spa and pool were highlights. We’ll definitely be back.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Emily Davis',
      location: 'New York, USA',
      rating: 5,
      quote: 'The perfect getaway. The room was immaculate, the food was divine, and the location was ideal for exploring. Every detail was thoughtfully curated.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i < rating ? '#f97316' : '#e5e7eb'}
          color={i < rating ? '#f97316' : '#e5e7eb'}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <style>{`
        .testimonials-section {
          padding: 96px 24px;
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .testimonials-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
          background: rgba(212, 175, 55, 0.08);
          padding: 6px 18px;
          border-radius: 9999px;
        }

        .testimonials-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 14px;
        }

        .testimonials-header p {
          color: #6b7280;
          font-size: 16.5px;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        .testimonial-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(212, 175, 55, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, #f59e0b, #f97316, #ec4899, #8b5cf6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
          z-index: 1;
        }

        .testimonial-card:hover::before {
          transform: scaleX(1);
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 16px 48px rgba(0,0,0,0.09);
        }

        .testimonial-card .quote-icon {
          position: absolute;
          top: 24px;
          right: 28px;
          color: #e5e7eb;
          transition: color 0.4s ease;
        }

        .testimonial-card:hover .quote-icon {
          color: #c94d41;
        }

        .testimonial-card .profile img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(212, 175, 55, 0.2);
          transition: border-color 0.4s ease, transform 0.4s ease;
        }

        .testimonial-card:hover .profile img {
          border-color: #c94d41;
          transform: scale(1.06);
        }

        .testimonial-card .profile {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .testimonial-card .profile .info .name {
          font-size: 16.5px;
          font-weight: 700;
          color: #1a1a1a;
          transition: color 0.4s ease;
        }

        .testimonial-card:hover .profile .info .name {
          color: #c94d41;
        }

        .testimonial-card .profile .info .location {
          font-size: 13px;
          color: #6b7280;
        }

        .testimonial-card .stars {
          display: flex;
          gap: 3px;
          margin-bottom: 12px;
        }

        .testimonial-card .quote {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
          flex: 1;
        }

        @media (min-width: 640px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-container">
          <ScrollReveal variant="fade-up">
            <div className="testimonials-header">
              <div className="label">✦ Guest Reviews</div>
              <h2>What Our Guests Say</h2>
              <p>
                Don't just take our word for it – hear from the guests who have
                experienced the Villa Alpha difference.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerChildren={0.15} className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id} variant="zoom-in">
                <div className="testimonial-card">
                  <div className="quote-icon">
                    <Quote size={40} />
                  </div>
                  <div className="profile">
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div className="info">
                      <div className="name">{testimonial.name}</div>
                      <div className="location">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="stars">{renderStars(testimonial.rating)}</div>
                  <p className="quote">"{testimonial.quote}"</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
};

export default Testimonials;