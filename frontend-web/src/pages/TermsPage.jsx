// src/pages/TermsPage.jsx
const TermsPage = () => {
  return (
    <>
      <style>{`
        .terms-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        .terms-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .terms-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .terms-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .terms-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .terms-content {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .terms-content h2 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 24px 0 12px;
        }

        .terms-content h2:first-child {
          margin-top: 0;
        }

        .terms-content p {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 12px;
        }

        .terms-content ul {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.8;
          padding-left: 24px;
        }

        .terms-content ul li {
          margin-bottom: 6px;
        }

        .terms-content .last-updated {
          color: #9ca3af;
          font-size: 13px;
          text-align: center;
          margin-top: 32px;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }

        @media (max-width: 768px) {
          .terms-page {
            padding: 30px 16px 60px;
          }
          .terms-header h1 {
            font-size: 30px;
          }
          .terms-content {
            padding: 24px 20px;
          }
        }

        @media (max-width: 480px) {
          .terms-header h1 {
            font-size: 24px;
          }
          .terms-content {
            padding: 16px;
          }
          .terms-content h2 {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="terms-page">
        <div className="terms-header">
          <div className="label">✦ Legal</div>
          <h1>Terms of Service</h1>
          <p>
            Please read these terms carefully before making a reservation or staying
            at Villa Alpha International Hotel.
          </p>
        </div>

        <div className="terms-content">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By making a reservation or staying at Villa Alpha, you agree to be bound
            by these Terms of Service. If you do not agree, please do not proceed
            with your booking.
          </p>

          <h2>2. Reservations and Payments</h2>
          <ul>
            <li>All reservations must be guaranteed with a valid credit card</li>
            <li>Full payment is required at check-in unless otherwise specified</li>
            <li>We accept credit cards, cash, and mobile money transfers</li>
            <li>Prices are subject to change without prior notice</li>
          </ul>

          <h2>3. Cancellation Policy</h2>
          <p>
            Cancellations made within 24 hours of arrival will be charged the first
            night's stay. For special packages, cancellation policies may vary and
            will be communicated at the time of booking.
          </p>

          <h2>4. Guest Responsibilities</h2>
          <ul>
            <li>Guests are responsible for the condition of their room</li>
            <li>Any damages will be charged to the guest's account</li>
            <li>Quiet hours are from 10:00 PM to 7:00 AM</li>
            <li>Smoking is prohibited in all indoor areas</li>
          </ul>

          <h2>5. Liability</h2>
          <p>
            Villa Alpha is not liable for loss, theft, or damage to personal property.
            We recommend using the in-room safe for valuable items.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be
            posted on this page and will take effect immediately.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            For questions about these terms, please contact us at
            <strong style={{ color: '#d4af37' }}> legal@villalpha.com</strong>
          </p>

          <div className="last-updated">
            Last Updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;