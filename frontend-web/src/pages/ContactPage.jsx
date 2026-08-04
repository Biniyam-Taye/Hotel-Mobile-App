// src/pages/ContactPage.jsx
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <style>{`
        .contact-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .contact-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .contact-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .contact-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        /* Contact Info Cards */
        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .info-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          border-color: #d4af37;
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }

        .info-card .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 50%;
          color: #d4af37;
          margin-bottom: 12px;
        }

        .info-card h4 {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .info-card p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
          line-height: 1.5;
        }

        /* Form and Map */
        .contact-form-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        .contact-form {
          background: #ffffff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
        }

        .contact-form h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .contact-form .subtitle {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.12);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .btn-submit {
          padding: 14px 40px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
        }

        .btn-submit:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }

        /* Map */
        .map-container {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          min-height: 300px;
          background: #f3f4f6;
        }

        .map-container iframe {
          width: 100%;
          height: 100%;
          min-height: 300px;
          border: none;
        }

        /* Social */
        .social-section {
          text-align: center;
          padding-top: 40px;
          border-top: 1px solid #e5e7eb;
        }

        .social-section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .social-links a {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-links a:hover {
          background: #d4af37;
          color: #1a1a1a;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }

        /* Responsive */
        @media (min-width: 992px) {
          .contact-form-wrapper {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .contact-page {
            padding: 30px 16px 60px;
          }
          .contact-header h1 {
            font-size: 30px;
          }
          .contact-form {
            padding: 24px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .contact-info {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .contact-header h1 {
            font-size: 24px;
          }
          .contact-info {
            grid-template-columns: 1fr;
          }
          .contact-form {
            padding: 16px;
          }
          .btn-submit {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="contact-page">
        <div className="contact-header">
          <div className="label">✦ Connect With Us</div>
          <h1>Get in Touch</h1>
          <p>
            We're here to help! Reach out to us for reservations, inquiries,
            or any assistance you may need.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-info">
          <div className="info-card">
            <div className="icon"><MapPin size={22} /></div>
            <h4>Address</h4>
            <p>Main Road, Adama, Ethiopia</p>
          </div>
          <div className="info-card">
            <div className="icon"><Phone size={22} /></div>
            <h4>Phone</h4>
            <p>+251 123 456 789</p>
          </div>
          <div className="info-card">
            <div className="icon"><Mail size={22} /></div>
            <h4>Email</h4>
            <p>info@villalpha.com</p>
          </div>
          <div className="info-card">
            <div className="icon"><Clock size={22} /></div>
            <h4>Hours</h4>
            <p>24/7 Customer Support</p>
          </div>
        </div>

        {/* Form and Map */}
        <div className="contact-form-wrapper">
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <p className="subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126258.6208965511!2d39.21421953876453!3d8.5482737862739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164731ff49a3f5df%3A0x1b198a97a8e717d4!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villa Alpha Hotel Location"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="social-section">
          <h3>Connect With Us on Social Media</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={22} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={22} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={22} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={22} /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;