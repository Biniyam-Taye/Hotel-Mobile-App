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
    <>
      <style>{`
        .faq-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .faq-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .faq-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .faq-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .faq-item {
          background: #ffffff;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: #d4af37;
        }

        .faq-question {
          width: 100%;
          padding: 18px 24px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          font-family: 'Poppins', sans-serif;
          transition: color 0.3s ease;
          text-align: left;
        }

        .faq-question:hover {
          color: #d4af37;
        }

        .faq-question svg {
          color: #d4af37;
          flex-shrink: 0;
        }

        .faq-answer {
          padding: 0 24px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.7;
        }

        .faq-answer.open {
          padding: 0 24px 20px;
          max-height: 500px;
        }

        @media (max-width: 768px) {
          .faq-page {
            padding: 30px 16px 60px;
          }
          .faq-header h1 {
            font-size: 30px;
          }
          .faq-question {
            font-size: 14px;
            padding: 14px 18px;
          }
          .faq-answer {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .faq-header h1 {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="faq-page">
        <div className="faq-header">
          <div className="label">✦ Support</div>
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to the most common questions about your stay at Villa Alpha.
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQPage;