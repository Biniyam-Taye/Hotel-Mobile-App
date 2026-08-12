// src/pages/SignUpPage.jsx
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div style={{ padding: '100px 24px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'Georgia', fontSize: '32px', marginBottom: '12px' }}>
        Create an <span style={{ color: '#d4af37' }}>Account</span>
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        (This is a placeholder page. You can customize this later.)
      </p>
      <Link 
        to="/login" 
        style={{ 
          display: 'inline-block', 
          padding: '12px 32px', 
          background: '#d4af37', 
          color: '#1a1a1a', 
          textDecoration: 'none', 
          borderRadius: '9999px', 
          fontWeight: '600' 
        }}
      >
        Go back to Login
      </Link>
    </div>
  );
};

export default SignUpPage;