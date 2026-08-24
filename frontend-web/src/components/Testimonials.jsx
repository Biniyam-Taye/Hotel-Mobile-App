// src/components/Testimonials.jsx
import { Star, Quote } from 'lucide-react';

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
          fill={i < rating ? '#f97316' : '#e5e7eb'} /* Changed gold to orange to match screenshot */
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
          padding: 80px 24px;
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          position: relative;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .testimonials-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .testimonials-header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .testimonials-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        /* ===== UPDATED CARD STYLES ===== */
        .testimonial-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid rgba(212, 175, 55, 0.06);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden; /* Keeps the top gradient bar inside rounded corners */
          transform: translateY(0);
        }

        /* 1. The Sliding Gradient Top Bar */
        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          /* Matches the yellow -> orange -> pink -> purple from your screenshot */
          background: linear-gradient(to right, #f59e0b, #f97316, #ec4899, #8b5cf6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
          z-index: 1;
        }

        .testimonial-card:hover::before {
          transform: scaleX(1); /* Slides the bar in */
        }

        .testimonial-card:hover {
          transform: translateY(-8px); /* Lifts the card */
          border-color: rgba(212, 175, 55, 0.15);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        /* 2. The Large Quote Icon */
        .testimonial-card .quote-icon {
          position: absolute;
          top: 20px;
          right: 24px;
          color: #e5e7eb; /* Default light gray */
          transition: color 0.4s ease;
        }

        .testimonial-card:hover .quote-icon {
          color: #c94d41; /* Turns deep red on hover (matching your brand) */
        }

        /* 3. Profile Image */
        .testimonial-card .profile img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(212, 175, 55, 0.1);
          transition: border-color 0.4s ease;
        }

        .testimonial-card:hover .profile img {
          border-color: #c94d41; /* Red border around image on hover */
        }

        .testimonial-card .profile {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }

        .testimonial-card .profile .info .name {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          transition: color 0.4s ease;
        }

        /* 4. The Author's Name */
        .testimonial-card:hover .profile .info .name {
          color: #c94d41; /* Turns deep red on hover */
        }

        .testimonial-card .profile .info .location {
          font-size: 13px;
          color: #6b7280;
        }

        /* 5. Stars */
        .testimonial-card .stars {
          display: flex;
          gap: 2px;
          margin-bottom: 10px;
        }

        .testimonial-card .quote {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
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
          .testimonials-section {
            padding: 100px 24px;
          }
        }

        @media (max-width: 480px) {
          .testimonials-section {
            padding: 60px 16px;
          }
          .testimonials-header h2 {
            font-size: 28px;
          }
          .testimonial-card {
            padding: 20px 16px;
          }
          .testimonial-card .profile img {
            width: 48px;
            height: 48px;
          }
          .testimonial-card .quote {
            font-size: 14px;
          }
        }
      `}</style>

      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <div className="label">✦ Guest Reviews</div>
            <h2>What Our Guests Say</h2>
            <p>
              Don't just take our word for it – hear from the guests who have
              experienced the Villa Alpha difference.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;