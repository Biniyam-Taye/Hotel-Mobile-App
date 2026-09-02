// src/components/VoiceNavigator.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff } from 'lucide-react';

const COMMANDS = [
  // ── Home ──────────────────────────────────────────────
  {
    route: '/', label: 'Home',
    keywords: [
      'home', 'go home', 'homepage', 'main page', 'take me home',
      'go to home', 'open home', 'go back home', 'back to home',
      'go to main', 'main menu', 'start', 'front page', 'go to start',
      'welcome page', 'landing page',
    ],
  },
  // ── Rooms ─────────────────────────────────────────────
  {
    route: '/rooms', label: 'Rooms',
    keywords: [
      'room', 'rooms', 'show rooms', 'see rooms', 'view rooms',
      'go to rooms', 'open rooms', 'i want a room', 'i need a room',
      'book a room', 'book room', 'reserve a room', 'find a room',
      'available rooms', 'suite', 'suites', 'accommodation',
      'where can i sleep', 'i want to stay', 'check rooms',
    ],
  },
  // ── Hospitality ───────────────────────────────────────
  {
    route: '/hospitality', label: 'Hospitality',
    keywords: [
      'hospitality', 'go to hospitality', 'open hospitality',
      'hotel services', 'what services', 'what do you offer',
      'what does the hotel offer', 'hotel amenities', 'amenities',
      'show me what you have', 'hotel features', 'hotel facilities',
      'tell me about services', 'what services do you have',
    ],
  },
  // ── Hotel Services listing page ───────────────────────
  {
    route: '/hotel-services', label: 'Hotel Services',
    keywords: [
      'hotel services page', 'explore services', 'see all services',
      'open hotel services', 'available services', 'service list',
      'all services',
    ],
  },
  // ── Facilities & Wellness ─────────────────────────────
  {
    route: '/facilities-wellness', label: 'Facilities & Wellness',
    keywords: [
      'facilities', 'wellness', 'facilities and wellness', 'facility',
      'gym', 'fitness center', 'open facilities', 'go to facilities',
      'open wellness', 'go to wellness', 'show facilities',
      'what facilities', 'health facilities',
    ],
  },
  // ── Events & Conferences ──────────────────────────────
  {
    route: '/events-conferences', label: 'Events & Conferences',
    keywords: [
      'events', 'event', 'conferences', 'conference', 'events and conferences',
      'go to events', 'open events', 'show events', 'ballroom',
      'meeting room', 'meeting', 'corporate', 'wedding', 'hall',
      'book a hall', 'book a venue', 'event venue', 'host an event',
      'i want to host', 'plan an event', 'corporate event',
    ],
  },
  // ── Experience ────────────────────────────────────────
  {
    route: '/experience', label: 'Experience',
    keywords: [
      'experience', 'experiences', 'go to experience', 'open experience',
      'activities', 'what can i do', 'things to do', 'what activities',
      'fun activities', 'explore', 'show experiences', 'adventures',
      'entertainment', 'things to experience',
    ],
  },
  // ── Restaurant ────────────────────────────────────────
  {
    route: '/restaurant', label: 'Restaurant & Bar',
    keywords: [
      'restaurant', 'bar', 'restaurant and bar', 'fine dining',
      'food', 'eat', 'i want to eat', 'where to eat', 'dining',
      'go to restaurant', 'open restaurant', 'cafe', 'menu',
      'show restaurant', 'food menu', 'rooftop bar', 'dinner',
      'lunch', 'breakfast', 'where can i eat', 'buffet',
    ],
  },
  // ── Pool ──────────────────────────────────────────────
  {
    route: '/pool', label: 'Pool',
    keywords: [
      'pool', 'swimming pool', 'swim', 'i want to swim', 'open pool',
      'go to pool', 'show pool', 'infinity pool',
    ],
  },
  // ── Spa ───────────────────────────────────────────────
  {
    route: '/spa', label: 'Spa',
    keywords: [
      'spa', 'massage', 'open spa', 'go to spa', 'show spa',
      'relaxation', 'relax', 'i want a massage', 'i want to relax',
      'spa treatment', 'therapy', 'sauna', 'steam room',
    ],
  },
  // ── Fitness ───────────────────────────────────────────
  {
    route: '/fitness', label: 'Fitness Center',
    keywords: [
      'fitness', 'fitness center', 'gym', 'go to fitness', 'open fitness',
      'workout', 'exercise', 'work out', 'i want to workout',
      'training', 'personal trainer',
    ],
  },
  // ── Offers ────────────────────────────────────────────
  {
    route: '/offers', label: 'Offers & Deals',
    keywords: [
      'offers', 'deals', 'offer', 'deal', 'go to offers', 'open offers',
      'discounts', 'show offers', 'promotions', 'packages',
      'special offers', 'exclusive deals', 'best deals', 'best price',
      'i want a deal', 'any discount', 'coupon',
    ],
  },
  // ── About ─────────────────────────────────────────────
  {
    route: '/about', label: 'About',
    keywords: [
      'about', 'about us', 'about hotel', 'go to about', 'open about',
      'tell me about', 'who are you', 'what is this hotel', 'more info',
      'information', 'learn more', 'about villa alpha', 'hotel info',
      'hotel information', 'our story', 'history',
    ],
  },
  // ── Contact ───────────────────────────────────────────
  {
    route: '/contact', label: 'Contact',
    keywords: [
      'contact', 'contact us', 'reach us', 'get in touch', 'call us',
      'open contact', 'go to contact', 'how to contact', 'support',
      'help', 'customer support', 'need help', 'i need help',
      'speak to someone', 'talk to someone', 'customer service',
    ],
  },
  // ── FAQ ───────────────────────────────────────────────
  {
    route: '/faq', label: 'FAQ',
    keywords: [
      'faq', 'frequently asked questions', 'questions', 'common questions',
      'go to faq', 'open faq', 'i have a question', 'questions and answers',
    ],
  },
  // ── Privacy ───────────────────────────────────────────
  {
    route: '/privacy', label: 'Privacy Policy',
    keywords: [
      'privacy', 'privacy policy', 'open privacy', 'go to privacy', 'data policy',
    ],
  },
  // ── Terms ─────────────────────────────────────────────
  {
    route: '/terms', label: 'Terms & Conditions',
    keywords: [
      'terms', 'terms and conditions', 'conditions', 'open terms', 'go to terms',
    ],
  },
  // ── Auth ──────────────────────────────────────────────
  {
    route: '/login', label: 'Login',
    keywords: [
      'login', 'log in', 'sign in', 'go to login', 'open login',
      'i want to login', 'i want to sign in', 'my account',
      'access my account', 'enter my account', 'signin',
    ],
  },
  {
    route: '/signup', label: 'Sign Up',
    keywords: [
      'sign up', 'signup', 'register', 'create account', 'open signup',
      'go to signup', 'new account', 'create a new account',
      'i want to register', 'join', 'i want to join', 'make account',
    ],
  },
  // ── My Orders ─────────────────────────────────────────
  {
    route: '/my-orders', label: 'My Orders',
    keywords: [
      'my orders', 'orders', 'order', 'my bookings', 'bookings',
      'my reservations', 'reservations', 'go to orders', 'open orders',
      'show orders', 'view orders', 'check my bookings', 'what did i book',
      'show my bookings', 'my history', 'booking history', 'my purchases',
    ],
  },
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
  const recRef   = useRef(null);
  const timerRef = useRef(null);

  function stopRec() {
    clearTimeout(timerRef.current);
    if (recRef.current) {
      try { recRef.current.stop(); } catch (_) {}
      recRef.current = null;
    }
  }

  function toast_(msg, type, ms = 2500) {
    setToast(msg);
    setState(type);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast('');
      setState('idle');
    }, ms);
  }

  function startListen() {
    // Toggle off
    if (state === 'listening') {
      stopRec();
      setState('idle');
      setToast('');
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      toast_('Not supported in this browser', 'error');
      return;
    }

    stopRec(); // clean up any previous

    const rec = new SR();
    // continuous + interimResults avoids the "no-speech" timeout error
    rec.lang            = 'en-US';
    rec.continuous      = true;   // keeps mic open
    rec.interimResults  = true;   // get partial results fast
    rec.maxAlternatives = 1;
    recRef.current = rec;

    setState('listening');
    setToast('🎤 Listening…');

    rec.onresult = (e) => {
      // Check every result
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        const found = match(transcript);

        if (found) {
          stopRec();
          toast_(`Going to ${found.label}…`, 'success', 1800);
          setTimeout(() => navigate(found.route), 500);
          return;
        }

        // If final result and no match found
        if (e.results[i].isFinal && !found) {
          stopRec();
          toast_(`"${transcript}" — not recognised`, 'error', 2500);
          return;
        }
      }
    };

    rec.onerror = (e) => {
      stopRec();
      if (e.error === 'not-allowed') {
        toast_('Microphone access denied — allow it in browser settings', 'error', 4000);
      } else if (e.error === 'network') {
        toast_('Network error — check your internet connection', 'error', 3000);
      } else if (e.error === 'aborted') {
        setState('idle'); setToast('');
      } else {
        // Don't show "no-speech" — just keep listening since continuous = true handles it
        console.warn('SpeechRecognition error:', e.error);
      }
    };

    rec.onend = () => {
      // If still in "listening" state and no result came in, restart automatically
      if (recRef.current === null && state !== 'success' && state !== 'error') {
        // Already cleaned up — do nothing
      }
    };

    // Auto-stop after 15 seconds
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
        .vn-wrap { position: relative; display: inline-flex; align-items: center; }

        .vn-btn {
          width: 34px; height: 34px;
          border-radius: 50%; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          flex-shrink: 0;
          transition: background 0.25s, color 0.25s, transform 0.2s;
        }
        .vn-btn:hover { background: rgba(212,175,55,0.2); color: #d4af37; transform: scale(1.1); }
        .vn-btn.listening {
          background: rgba(212,175,55,0.18); color: #d4af37;
          animation: vnp 1.1s ease-out infinite;
        }
        .vn-btn.success { background: rgba(34,197,94,0.15); color: #22c55e; }
        .vn-btn.error   { background: rgba(239,68,68,0.12); color: #f87171; }

        @keyframes vnp {
          0%   { box-shadow: 0 0 0 0    rgba(212,175,55,0.6); }
          70%  { box-shadow: 0 0 0 10px rgba(212,175,55,0); }
          100% { box-shadow: 0 0 0 0    rgba(212,175,55,0); }
        }

        .vn-toast {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          white-space: nowrap;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px; font-weight: 600;
          pointer-events: none;
          z-index: 9999;
          animation: vnfade 0.2s ease both;
          backdrop-filter: blur(8px);
        }
        .vn-toast.listening { background: rgba(212,175,55,0.15); color: #d4af37; border: 1px solid rgba(212,175,55,0.3); }
        .vn-toast.success   { background: rgba(34,197,94,0.15);  color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
        .vn-toast.error     { background: rgba(239,68,68,0.14);  color: #f87171; border: 1px solid rgba(239,68,68,0.25); }
        @keyframes vnfade {
          from { opacity:0; transform: translateY(-5px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      <div className="vn-wrap">
        <button
          className={`vn-btn ${state}`}
          onClick={startListen}
          aria-label="Voice navigation"
          title={state === 'listening' ? 'Click to stop' : 'Voice Navigate'}
        >
          {state === 'listening' ? <MicOff size={15} /> : <Mic size={15} />}
        </button>

        {toast && <div className={`vn-toast ${state}`}>{toast}</div>}
      </div>
    </>
  );
}
