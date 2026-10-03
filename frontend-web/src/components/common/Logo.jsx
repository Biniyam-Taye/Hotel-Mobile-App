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
    ? { imgH: '38px', maxH: '42px', iconS: '34px', fontT: '14px', fontSub: '6px' }
    : size === 'large'
    ? { imgH: '66px', maxH: '74px', iconS: '48px', fontT: '20px', fontSub: '10px' }
    : { imgH: '52px', maxH: '58px', iconS: '40px', fontT: '16px', fontSub: '7.5px' };

  return (
    <div className={`brand-logo-wrapper ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      {!useFallback ? (
        <motion.div
          whileHover={{ scale: 1.05, filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.35))' }}
          transition={{ type: 'spring', stiffness: 350, damping: 15 }}
        >
          <img
            src={LOGO_CANDIDATES[candidateIndex]}
            alt="Villa Alpha International Hotel Logo"
            style={{
              height: dimensions.imgH,
              maxHeight: dimensions.maxH,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              transition: 'filter 0.3s ease',
            }}
            onError={handleImgError}
          />
        </motion.div>
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
