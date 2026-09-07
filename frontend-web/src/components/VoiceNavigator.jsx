// src/components/VoiceNavigator.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Navigation, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  { route: '/', label: 'Home', keywords: ['home', 'go home', 'homepage', 'main page', 'start'] },
  { route: '/rooms', label: 'Rooms & Suites', keywords: ['room', 'rooms', 'show rooms', 'suite', 'accommodation', 'book room'] },
  { route: '/hospitality', label: 'Hospitality', keywords: ['hospitality', 'hotel services', 'amenities', 'services'] },
  { route: '/hotel-services', label: 'Hotel Services', keywords: ['services', 'all services', 'explore services'] },
  { route: '/facilities-wellness', label: 'Facilities & Wellness', keywords: ['facilities', 'wellness', 'gym', 'health'] },
  { route: '/events-conferences', label: 'Events & Conferences', keywords: ['events', 'conferences', 'meeting', 'ballroom', 'wedding'] },
  { route: '/experience', label: 'Experience', keywords: ['experience', 'activities', 'things to do', 'fun'] },
  { route: '/restaurant', label: 'Restaurant & Bar', keywords: ['restaurant', 'bar', 'food', 'dining', 'eat', 'menu'] },
  { route: '/pool', label: 'Pool', keywords: ['pool', 'swimming pool', 'swim'] },
  { route: '/spa', label: 'Spa & Wellness', keywords: ['spa', 'massage', 'relax', 'sauna'] },
  { route: '/fitness', label: 'Fitness Center', keywords: ['fitness', 'gym', 'workout', 'exercise'] },
  { route: '/offers', label: 'Offers & Deals', keywords: ['offers', 'deals', 'discounts', 'special offers', 'promotions'] },
  { route: '/about', label: 'About Us', keywords: ['about', 'about us', 'story', 'info'] },
  { route: '/contact', label: 'Contact', keywords: ['contact', 'support', 'help', 'call us'] },
  { route: '/faq', label: 'FAQ', keywords: ['faq', 'questions', 'help'] },
  { route: '/login', label: 'Sign In', keywords: ['login', 'sign in', 'log in', 'my account'] },
  { route: '/signup', label: 'Sign Up', keywords: ['signup', 'sign up', 'register'] },
  { route: '/my-orders', label: 'My Bookings', keywords: ['my orders', 'bookings', 'reservations', 'history'] },
];

function match(text) {
  if (!text) return null;
  const t = text.toLowerCase().trim();
  for (const cmd of COMMANDS) {
    if (cmd.keywords.some(k => t.includes(k))) return cmd;
  }
  return null;
}

export default function VoiceNavigator() {
  const navigate = useNavigate();
  const [state, setState] = useState('idle');    // idle | listening | success | error
  const [toast, setToast] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const recRef = useRef(null);
  const timerRef = useRef(null);

  function stopRec() {
    clearTimeout(timerRef.current);
    if (recRef.current) {
      try { recRef.current.stop(); } catch (_) { }
      recRef.current = null;
    }
  }

  function toast_(msg, type, ms = 3000) {
    setToast(msg);
    setState(type);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast('');
      setState('idle');
    }, ms);
  }

  function startListen() {
    if (state === 'listening') {
      stopRec();
      setState('idle');
      setToast('');
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      toast_('Voice control not supported in browser', 'error');
      return;
    }

    stopRec();

    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    recRef.current = rec;

    setState('listening');
    setToast('Listening… Speak a page or command');

    rec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        const found = match(transcript);

        if (found) {
          stopRec();
          toast_(`Navigating to ${found.label}…`, 'success', 2000);
          setTimeout(() => navigate(found.route), 500);
          return;
        }

        if (e.results[i].isFinal && !found) {
          stopRec();
          toast_(`"${transcript}" — Command not recognized`, 'error', 3000);
          return;
        }
      }
    };

    rec.onerror = (e) => {
      stopRec();
      if (e.error === 'not-allowed') {
        toast_('Mic access denied — check browser settings', 'error', 4000);
      } else if (e.error === 'network') {
        toast_('Network error — check connection', 'error', 3000);
      } else if (e.error === 'aborted') {
        setState('idle'); setToast('');
      } else {
        console.warn('SpeechRecognition error:', e.error);
      }
    };

    timerRef.current = setTimeout(() => {
      stopRec();
      setState('idle');
      setToast('');
    }, 15000);

    rec.start();
  }

  return (
    <>
      <style>{`
        /* Fixed Bottom-Right Floating Widget */
        .bottom-right-voice-ai-widget {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 99999;
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: 'Poppins', sans-serif;
          pointer-events: auto;
        }

        /* Floating Mic Orb */
        .voice-fab-orb {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid #d4af37;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #d4af37;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.5), 0 0 25px rgba(212, 175, 55, 0.35);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .voice-fab-orb:hover {
          border-color: #f5d879;
          box-shadow: 0 14px 35px rgba(15, 23, 42, 0.6), 0 0 35px rgba(212, 175, 55, 0.55);
        }

        .voice-fab-orb.listening {
          background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
          border-color: #f5d879;
          color: #f5d879;
          box-shadow: 0 0 40px rgba(245, 216, 121, 0.7);
        }

        .voice-fab-orb.success {
          border-color: #22c55e;
          color: #22c55e;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
        }

        .voice-fab-orb.error {
          border-color: #ef4444;
          color: #f87171;
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
        }

        /* Sonar Pulse Animations when Listening */
        .sonar-wave-1, .sonar-wave-2 {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(212, 175, 55, 0.7);
          animation: sonarPulseOuter 1.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
          pointer-events: none;
        }

        .sonar-wave-2 {
          animation-delay: 0.6s;
        }

        @keyframes sonarPulseOuter {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        /* Equalizer Sound Bars */
        .fab-sound-bars {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 18px;
        }

        .fab-bar {
          width: 3px;
          background: #f5d879;
          border-radius: 99px;
          animation: fabBarPulse 0.7s ease-in-out infinite alternate;
        }

        .fab-bar:nth-child(1) { height: 7px; animation-delay: 0.1s; }
        .fab-bar:nth-child(2) { height: 16px; animation-delay: 0.3s; }
        .fab-bar:nth-child(3) { height: 10px; animation-delay: 0.2s; }
        .fab-bar:nth-child(4) { height: 17px; animation-delay: 0.4s; }

        @keyframes fabBarPulse {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1.1); }
        }

        /* Floating Toast / Label Card */
        .voice-fab-toast-card {
          background: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 9999px;
          padding: 10px 20px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          white-space: nowrap;
        }

        .voice-fab-toast-card.listening { border-color: rgba(245, 216, 121, 0.6); color: #f5d879; }
        .voice-fab-toast-card.success { border-color: rgba(34, 197, 94, 0.6); color: #4ade80; }
        .voice-fab-toast-card.error { border-color: rgba(239, 68, 68, 0.6); color: #fca5a5; }

        @media (max-width: 768px) {
          .bottom-right-voice-ai-widget {
            bottom: 20px;
            right: 20px;
          }
          .voice-fab-orb {
            width: 52px;
            height: 52px;
          }
          .voice-fab-toast-card {
            font-size: 11.5px;
            padding: 8px 14px;
          }
        }
      `}</style>

      <div className="bottom-right-voice-ai-widget">
        {/* Toast Guidance / Status Pill */}
        <AnimatePresence>
          {(toast || isHovered) && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`voice-fab-toast-card ${state}`}
            >
              {state === 'listening' ? (
                <>
                  <div className="fab-sound-bars">
                    <span className="fab-bar" />
                    <span className="fab-bar" />
                    <span className="fab-bar" />
                    <span className="fab-bar" />
                  </div>
                  <span>{toast}</span>
                </>
              ) : state === 'success' ? (
                <>
                  <CheckCircle2 size={16} color="#4ade80" />
                  <span>{toast}</span>
                </>
              ) : state === 'error' ? (
                <>
                  <AlertCircle size={16} color="#f87171" />
                  <span>{toast}</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} color="#d4af37" />
                  <span>Voice AI Assistant • Speak &quot;Rooms&quot;, &quot;Spa&quot;, &quot;Restaurant&quot;</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Mic Orb Button */}
        <motion.button
          className={`voice-fab-orb ${state}`}
          onClick={startListen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Voice AI Assistant"
          title="Voice AI Assistant"
        >
          {state === 'listening' && (
            <>
              <div className="sonar-wave-1" />
              <div className="sonar-wave-2" />
            </>
          )}

          {state === 'listening' ? (
            <MicOff size={24} color="#f5d879" />
          ) : state === 'success' ? (
            <Navigation size={24} color="#22c55e" />
          ) : (
            <Mic size={24} />
          )}
        </motion.button>
      </div>
    </>
  );
}
