// src/pages/PrivacyPage.jsx
const PrivacyPage = () => {
  return (
    <>
      <style>{`
        .privacy-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        .privacy-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .privacy-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .privacy-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .privacy-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .privacy-content {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .privacy-content h2 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 24px 0 12px;
        }

        .privacy-content h2:first-child {
          margin-top: 0;
        }

        .privacy-content p {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 12px;
        }

        .privacy-content ul {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.8;
          padding-left: 24px;
        }

        .privacy-content ul li {
          margin-bottom: 6px;
        }

        .privacy-content .last-updated {
          color: #9ca3af;
          font-size: 13px;
          text-align: center;
          margin-top: 32px;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }

        @media (max-width: 768px) {
          .privacy-page {
            padding: 30px 16px 60px;
          }
          .privacy-header h1 {
            font-size: 30px;
          }
          .privacy-content {
            padding: 24px 20px;
          }
        }

        @media (max-width: 480px) {
          .privacy-header h1 {
            font-size: 24px;
          }
          .privacy-content {
            padding: 16px;
          }
          .privacy-content h2 {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="privacy-page">
        <div className="privacy-header">
          <div className="label">✦ Legal</div>
          <h1>Privacy Policy</h1>
          <p>
            Your privacy matters to us. Learn how we collect, use, and protect your
            personal information when you stay with us.
          </p>
        </div>

        <div className="privacy-content">
          <h2>1. Information We Collect</h2>
          <p>
            When you make a reservation or stay at Villa Alpha, we collect information
            including your name, contact details, payment information, and preferences
            to enhance your stay.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to process reservations, personalize your stay,
            communicate with you, and improve our services. We may also use your
            feedback to enhance guest experiences.
          </p>

          <h2>3. Data Protection</h2>
          <p>
            We implement robust security measures to protect your personal information
            from unauthorized access, disclosure, or misuse. All payment transactions
            are encrypted and secure.
          </p>

          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may
            share data with trusted partners who assist us in providing services, such
            as payment processing, subject to strict confidentiality agreements.
          </p>

          <h2>5. Your Rights</h2>
          <ul>
            <li>Access and update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            We use cookies to improve your browsing experience and analyze website
            traffic. You can manage cookie preferences in your browser settings.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions about our privacy policy, please contact us at
            <strong style={{ color: '#d4af37' }}> privacy@villalpha.com</strong>
          </p>

          <div className="last-updated">
            Last Updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;