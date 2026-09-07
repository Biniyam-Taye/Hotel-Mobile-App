// src/components/common/Logo.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const LOGO_CANDIDATES = [
  '/logo.png',
  '/logo.svg',
  '/logo.jpg',
  '/logo.webp',
  '/logo-icon.png',
  '/download (1).jpg',
];

export default function Logo({ size = 'medium', forceText = false, className = '' }) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

  const handleImgError = () => {
    if (candidateIndex + 1 < LOGO_CANDIDATES.length) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setUseFallback(true);
    }
  };

  // Preset sizes
  const dimensions = size === 'small'
    ? { imgH: '34px', maxH: '38px', iconS: '32px', fontT: '13px', fontSub: '6px' }
    : size === 'large'
    ? { imgH: '54px', maxH: '64px', iconS: '44px', fontT: '18px', fontSub: '9px' }
    : { imgH: '42px', maxH: '48px', iconS: '36px', fontT: '15px', fontSub: '7px' };

  return (
    <div className={`brand-logo-wrapper ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      {!useFallback ? (
        <img
          src={LOGO_CANDIDATES[candidateIndex]}
          alt="Villa Alpha International Hotel Logo"
          style={{
            height: dimensions.imgH,
            maxHeight: dimensions.maxH,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
          onError={handleImgError}
        />
      ) : (
        <>
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            style={{
              width: dimensions.iconS,
              height: dimensions.iconS,
              background: 'linear-gradient(135deg, #d4af37 0%, #f0cc5a 100%)',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a1a1a',
              fontWeight: 800,
              fontSize: size === 'large' ? '20px' : '15px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.35)',
              flexShrink: 0,
              fontFamily: "'Cinzel', 'Georgia', serif",
            }}
          >
            V
          </motion.div>

          <div style={{ lineHeight: 1.2 }}>
            <h1 style={{
              fontSize: dimensions.fontT,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '0.5px',
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: 1.1,
            }}>
              VILLA ALPHA
            </h1>
            <p style={{
              fontSize: dimensions.fontSub,
              color: 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '2.5px',
              margin: 0,
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
              marginTop: '2px',
            }}>
              INTERNATIONAL HOTEL
            </p>
          </div>
        </>
      )}

      {!useFallback && forceText && (
        <div style={{ lineHeight: 1.2 }}>
          <h1 style={{
            fontSize: dimensions.fontT,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '0.5px',
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.1,
          }}>
            VILLA ALPHA
          </h1>
          <p style={{
            fontSize: dimensions.fontSub,
            color: 'rgba(255, 255, 255, 0.65)',
            letterSpacing: '2.5px',
            margin: 0,
            textTransform: 'uppercase',
            fontFamily: "'Poppins', sans-serif",
            marginTop: '2px',
          }}>
            INTERNATIONAL HOTEL
          </p>
        </div>
      )}
    </div>
  );
}
