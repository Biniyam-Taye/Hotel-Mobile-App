// src/pages/FAQPage.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in is from 2:00 PM and check-out is until 11:00 AM. Early check-in and late check-out can be arranged upon request, subject to availability.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'You can cancel your reservation free of charge up to 24 hours before your scheduled arrival. Cancellations made within 24 hours will be charged the first night\'s stay.'
    },
    {
      question: 'Are pets allowed at Villa Alpha?',
      answer: 'Yes, we are a pet-friendly hotel! We welcome pets up to 25 kg. A small cleaning fee of ETB 500 applies per stay. Please inform us at the time of booking.'
    },
    {
      question: 'Is breakfast included in the room price?',
      answer: 'Breakfast is included in all room rates. Our buffet breakfast is served from 6:30 AM to 10:30 AM daily, featuring both local and international cuisine.'
    },
    {
      question: 'Does the hotel have a swimming pool?',
      answer: 'Yes, we have a beautiful outdoor swimming pool with a poolside bar. It is open from 7:00 AM to 9:00 PM daily. Towels and lounge chairs are provided complimentary.'
    },
    {
      question: 'Is there free Wi-Fi available?',
      answer: 'Yes, complimentary high-speed Wi-Fi is available throughout the hotel. Simply connect to the "VillaAlpha" network and enter the password provided at check-in.'
    },
    {
      question: 'Does the hotel offer airport shuttle service?',
      answer: 'Yes, we offer airport shuttle service to and from Adama International Airport. The service is available 24/7 and can be arranged at the time of booking. A fee of ETB 1,500 applies.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), cash, and mobile money transfers. Full payment is required at check-in.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ color: '#d4af37', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>✦ Support</span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Find answers to the most common questions about your stay at Villa Alpha.
        </p>
      </div>

      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            marginBottom: '12px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
        >
          <button
            onClick={() => toggleFAQ(index)}
            style={{
              width: '100%',
              padding: '18px 24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1a1a1a',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'left'
            }}
          >
            <span>{faq.question}</span>
            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <div
            style={{
              padding: openIndex === index ? '0 24px 20px' : '0 24px',
              maxHeight: openIndex === index ? '500px' : '0',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              color: '#4b5563',
              fontSize: '15px',
              lineHeight: 1.7
            }}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;