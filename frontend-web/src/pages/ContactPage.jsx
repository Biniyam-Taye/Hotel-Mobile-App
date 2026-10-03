// src/pages/ContactPage.jsx
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ color: '#d4af37', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>✦ Connect With Us</span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>
          Get in Touch
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          We're here to help! Reach out to us for reservations, inquiries, or any assistance you may need.
        </p>
      </div>

      {/* Contact Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {[
          { icon: MapPin, title: 'Address', info: 'Main Road, Adama, Ethiopia' },
          { icon: Phone, title: 'Phone', info: '+251 123 456 789' },
          { icon: Mail, title: 'Email', info: 'info@villalpha.com' },
          { icon: Clock, title: 'Hours', info: '24/7 Customer Support' }
        ].map((item, i) => (
          <div key={i} style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              background: 'rgba(212, 175, 55, 0.1)',
              borderRadius: '50%',
              color: '#d4af37',
              marginBottom: '12px'
            }}>
              <item.icon size={22} />
            </div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px' }}>{item.title}</h4>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{item.info}</p>
          </div>
        ))}
      </div>

      {/* Form & Map */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px'
      }}>
        {/* Form */}
        <div style={{
          background: '#ffffff',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Send Us a Message</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  minHeight: '120px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '14px 40px',
                background: '#d4af37',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '16px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.3s ease'
              }}
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

        {/* Map */}
        <div style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          minHeight: '300px',
          background: '#f3f4f6'
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126258.6208965511!2d39.21421953876453!3d8.5482737862739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164731ff49a3f5df%3A0x1b198a97a8e717d4!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Villa Alpha Hotel Location"
            style={{ width: '100%', height: '100%', minHeight: '300px', border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;