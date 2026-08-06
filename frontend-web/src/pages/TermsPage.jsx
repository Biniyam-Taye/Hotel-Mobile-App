// src/pages/TermsPage.jsx
const TermsPage = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ color: '#d4af37', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>✦ Legal</span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>
          Terms of Service
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Please read these terms carefully before making a reservation.
        </p>
      </div>

      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '40px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>1. Acceptance of Terms</h2>
        <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>
          By making a reservation or staying at Villa Alpha, you agree to be bound by these Terms of Service.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>2. Reservations and Payments</h2>
        <ul style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8, paddingLeft: '24px' }}>
          <li>All reservations must be guaranteed with a valid credit card</li>
          <li>Full payment is required at check-in unless otherwise specified</li>
          <li>We accept credit cards, cash, and mobile money transfers</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>3. Cancellation Policy</h2>
        <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>
          Cancellations made within 24 hours of arrival will be charged the first night's stay.
        </p>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>4. Guest Responsibilities</h2>
        <ul style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8, paddingLeft: '24px' }}>
          <li>Guests are responsible for the condition of their room</li>
          <li>Any damages will be charged to the guest's account</li>
          <li>Quiet hours are from 10:00 PM to 7:00 AM</li>
        </ul>

        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>5. Contact Information</h2>
        <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8 }}>
          For questions, contact us at <strong style={{ color: '#d4af37' }}>legal@villalpha.com</strong>
        </p>

        <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;