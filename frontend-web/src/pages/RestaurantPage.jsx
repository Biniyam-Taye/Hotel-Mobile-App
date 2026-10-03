// src/pages/RestaurantPage.jsx
import { useState, useEffect, useMemo } from 'react';
import {
  Utensils, Coffee, Wine, Cake, Loader2,
  ShoppingCart, SlidersHorizontal, X, ChevronDown, ChevronUp,
  MapPin, ArrowRight, Plus, Minus, CreditCard, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { fetchPublicMenu, formatPrice } from '../services/restaurantApi';
import { initiateStripeCheckout } from '../services/paymentApi';

/* ─── helpers ─────────────────────────────────── */
const categoryIcons = {
  Breakfast: Coffee,
  Lunch: Utensils,
  Dinner: Utensils,
  Drinks: Wine,
  Desserts: Cake,
  Appetizers: Utensils,
  Lounge: Wine,
  Bar: Wine,
};
const getCategoryIcon = (name) => categoryIcons[name] || Utensils;

const PRICE_RANGES = [
  { label: 'ETB 0 – 100',    min: 0,    max: 100      },
  { label: 'ETB 100 – 300',  min: 100,  max: 300      },
  { label: 'ETB 300 – 600',  min: 300,  max: 600      },
  { label: 'ETB 600 – 1000', min: 600,  max: 1000     },
  { label: 'ETB 1000+',      min: 1000, max: Infinity },
];

/* ─── Stock Badge ─────────────────────────────── */
const StockBadge = ({ stock }) => {
  if (stock == null) return null;
  const isLow = stock <= 15;
  return (
    <span className={`stock-badge ${isLow ? 'stock-low' : 'stock-ok'}`}>
      {isLow ? `Low Stock : ${stock}` : `In Stock : ${stock}`}
    </span>
  );
};

/* ─── Food Card  (matches reference image exactly) ── */
const FoodCard = ({ item, categoryName, onOrderClick }) => {
  const hasImage = item.image && item.image !== 'default-food.jpg';

  return (
    <div className="food-card">
      {/* LEFT — large full-height image */}
      {hasImage ? (
        <img src={item.image} alt={item.name} className="food-card-img" />
      ) : (
        <div className="food-card-img food-card-img--placeholder">
          <Utensils size={42} color="#d4af37" />
        </div>
      )}

      {/* RIGHT — content */}
      <div className="food-card-body">
        {/* top row: category tag + stock badge */}
        <div className="food-card-top">
          <span className="food-card-category">{categoryName}</span>
          <StockBadge stock={item.stock} />
        </div>

        {/* title */}
        <h3 className="food-card-name">{item.name}</h3>

        {/* description */}
        <p className="food-card-desc">{item.description}</p>

        {/* spacer */}
        <div style={{ flex: 1 }} />

        {/* bottom: price + order button */}
        <div className="food-card-footer">
          <div className="food-card-price-block">
            <span className="food-price-label">Price</span>
            <span className="food-price-value">ETB {formatPrice(item.price)}</span>
          </div>
          <button
            className="food-order-btn"
            aria-label={`Order ${item.name}`}
            onClick={() => onOrderClick(item, categoryName)}
          >
            Order Now <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Collapsible filter section ─────────────── */
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="fs-wrap">
      <button className="fs-title" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && <div className="fs-body">{children}</div>}
    </div>
  );
};

/* ─── Main Page ───────────────────────────────── */
const RestaurantPage = () => {
  const [menu, setMenu]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  const [activeCategories, setActiveCategories] = useState(new Set());
  const [activePrices, setActivePrices]         = useState(new Set());

  /* ─── Order Modal state ─── */
  const [selectedFood, setSelectedFood]     = useState(null);
  const [selectedCatName, setSelectedCatName] = useState('');
  const [quantity, setQuantity]             = useState(1);
  const [tableNumber, setTableNumber]       = useState('');
  const [specialNotes, setSpecialNotes]     = useState('');
  const [isRedirecting, setIsRedirecting]   = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchPublicMenu();
        setMenu(data);
      } catch (err) {
        setError(err.message || 'Failed to load menu');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleCat   = (k) => setActiveCategories(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const togglePrice = (l) => setActivePrices(p => { const n = new Set(p); n.has(l) ? n.delete(l) : n.add(l); return n; });
  const clearAll    = () => { setActiveCategories(new Set()); setActivePrices(new Set()); };

  const handleOpenOrder = (item, catName) => {
    setSelectedFood(item);
    setSelectedCatName(catName || '');
    setQuantity(1);
    setTableNumber('');
    setSpecialNotes('');
    setIsRedirecting(false);
  };

  const handleCloseOrder = () => {
    if (isRedirecting) return;
    setSelectedFood(null);
  };

  const handleProceedStripe = async () => {
    if (!selectedFood) return;
    try {
      setIsRedirecting(true);
      const unitPrice = Number(selectedFood.price) || 0;
      const totalAmount = unitPrice * quantity;
      const locationText = tableNumber.trim() ? ` [${tableNumber.trim()}]` : '';

      await initiateStripeCheckout({
        title: `Food Order: ${selectedFood.name} (x${quantity})${locationText}`,
        amount: totalAmount,
        currency: 'etb',
        relatedType: 'FoodOrder',
        relatedId: selectedFood._id || '',
        cancelUrl: window.location.href,
      });
    } catch (err) {
      console.error('Stripe redirect failed:', err);
      setIsRedirecting(false);
    }
  };

  const hasFilters = activeCategories.size > 0 || activePrices.size > 0;

  const filteredMenu = useMemo(() =>
    menu
      .filter(cat => activeCategories.size === 0 || activeCategories.has(cat._id || cat.name))
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item => {
          if (activePrices.size === 0) return true;
          const price = Number(item.price);
          for (const lbl of activePrices) {
            const r = PRICE_RANGES.find(x => x.label === lbl);
            if (r && price >= r.min && price < r.max) return true;
          }
          return false;
        }),
      }))
      .filter(cat => cat.items.length > 0),
  [menu, activeCategories, activePrices]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ══ Shell ══ */
        .rp {
          background: #f0f1f5;
          min-height: 100vh;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        /* ══ Hero ══ */
        .rp-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          background: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=85') center/cover no-repeat;
          overflow: hidden;
        }
        .rp-hero .hero-ov {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, rgba(8,8,24,0.82) 0%, rgba(20,20,50,0.48) 55%, transparent 100%);
        }
        .rp-hero .hero-cnt {
          position: relative; z-index: 2;
          padding: 0 80px;
          color: #fff; max-width: 680px;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(212,175,55,0.14);
          border: 1px solid rgba(212,175,55,0.42);
          padding: 6px 18px; border-radius: 999px;
          font-size: 11px; font-weight: 800;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: #f0c84a; margin-bottom: 20px;
        }
        .rp-hero h1 {
          font-family: 'Georgia', serif;
          font-size: 52px; font-weight: 700;
          margin: 0 0 12px; line-height: 1.08;
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }
        .rp-hero p {
          font-size: 17px; color: rgba(255,255,255,0.76);
          margin: 0; line-height: 1.7; max-width: 500px;
        }

        /* ══ Page body: left margin + two-col grid ══ */
        .rp-body {
          max-width: 1280px;
          margin: 0 auto;
          padding: 52px 48px 100px 80px;   /* <-- big left margin */
          display: grid;
          grid-template-columns: 1fr 290px;
          gap: 36px;
          align-items: start;
        }

        /* ══ Left column ══ */
        .rp-left {}

        /* section header */
        .menu-hdr { margin-bottom: 32px; }
        .menu-hdr .lbl {
          display: inline-block;
          color: #c9970c; font-size: 11px; font-weight: 800;
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;
        }
        .menu-hdr h2 {
          font-family: 'Georgia', serif;
          font-size: 34px; font-weight: 700; color: #111827; margin: 0;
        }

        /* active filter pills */
        .pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
        .pill {
          display: flex; align-items: center; gap: 6px;
          background: #fef9ec; border: 1px solid #f0c84a;
          border-radius: 999px; padding: 4px 12px;
          font-size: 12px; font-weight: 600; color: #92700a;
        }
        .pill-x { background: none; border: none; cursor: pointer; color: #c9970c; display: flex; padding: 0; }

        /* category group */
        .cat-group { margin-bottom: 40px; }
        .cat-title {
          display: flex; align-items: center; gap: 11px;
          font-size: 20px; font-weight: 700; color: #111827;
          margin-bottom: 20px; padding-bottom: 12px;
          border-bottom: 2px solid #e2e5ef;
        }
        .cat-title svg { color: #d4af37; }

        /* ══ FOOD CARD ══ */
        .food-card {
          display: flex;
          align-items: stretch;
          background: #fff;
          border-radius: 18px;
          margin-bottom: 20px;
          overflow: hidden;
          box-shadow: 0 2px 18px rgba(0,0,0,0.07);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          min-height: 210px;   /* taller card */
        }
        .food-card:last-child { margin-bottom: 0; }
        .food-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.13);
        }

        /* large flush-left image – fills full card height */
        .food-card-img {
          width: 220px;          /* wider image */
          min-height: 210px;     /* matches card min-height */
          object-fit: cover;
          flex-shrink: 0;
          display: block;
          border-radius: 0;
        }
        .food-card-img--placeholder {
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #fef9ec, #fdf3c8);
        }

        /* card content */
        .food-card-body {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column;
          padding: 22px 24px 22px 28px;
          gap: 8px;
        }

        /* top row */
        .food-card-top {
          display: flex; align-items: center;
          justify-content: space-between; gap: 10px;
        }
        .food-card-category {
          font-size: 12px; font-weight: 700;
          color: #c9970c; letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* title */
        .food-card-name {
          font-size: 22px; font-weight: 700;
          color: #111827; margin: 0; line-height: 1.25;
        }

        /* description */
        .food-card-desc {
          font-size: 14px; color: #6b7280;
          margin: 0; line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* footer */
        .food-card-footer {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 16px;
          margin-top: 4px;
        }
        .food-card-price-block {
          display: flex; flex-direction: column; gap: 1px;
        }
        .food-price-label {
          font-size: 11px; font-weight: 600;
          color: #9ca3af; text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .food-price-value {
          font-size: 24px; font-weight: 800;
          color: #111827; letter-spacing: -0.5px;
        }

        /* "Order Now →" dark button */
        .food-order-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #111827;
          color: #fff;
          border: none; cursor: pointer;
          padding: 12px 22px;
          border-radius: 12px;
          font-size: 14px; font-weight: 700;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
        }
        .food-order-btn:hover {
          background: #1f2937;
          transform: translateY(-1px);
        }
        .food-order-btn:active { transform: scale(0.97); }

        /* Stock Badge */
        .stock-badge {
          display: inline-block; padding: 3px 11px;
          border-radius: 999px; font-size: 11px; font-weight: 700;
          white-space: nowrap; flex-shrink: 0;
        }
        .stock-ok  { background: #f0fdf4; color: #15803d; border: 1px solid #86efac; }
        .stock-low { background: #fff7ed; color: #c2410c; border: 1px solid #fdba74; }

        /* ══ RIGHT – Filter Panel ══ */
        .fp {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.09);
          position: sticky;
          top: 96px;
        }

        /* header */
        .fp-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          background: linear-gradient(135deg, #c9970c 0%, #e2b84a 100%);
        }
        .fp-head-left { display: flex; align-items: center; gap: 10px; }
        .fp-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(255,255,255,0.22);
          display: flex; align-items: center; justify-content: center;
        }
        .fp-label { font-size: 15px; font-weight: 700; color: #fff; }
        .fp-clear {
          display: flex; align-items: center; gap: 4px;
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-weight: 600; color: #fff;
          opacity: 0.9; padding: 0;
          transition: opacity 0.15s;
        }
        .fp-clear:hover { opacity: 1; }
        .fp-clear.hidden { opacity: 0; pointer-events: none; }

        /* sections */
        .fs-wrap {
          padding: 0 20px;
          border-bottom: 1px solid #f1f3f8;
        }
        .fs-wrap:last-child { border-bottom: none; }
        .fs-title {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; background: none; border: none; cursor: pointer;
          padding: 15px 0 13px;
          font-size: 11px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: #374151;
        }
        .fs-title svg { color: #9ca3af; }
        .fs-body { padding-bottom: 14px; }

        /* checkbox rows */
        .fck {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 6px; border-radius: 9px; cursor: pointer;
          transition: background 0.15s;
        }
        .fck:hover { background: #f9fafb; }
        .fck-box {
          width: 18px; height: 18px; border-radius: 4px;
          border: 1.8px solid #d1d5db;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.15s;
        }
        .fck-box.on { border-color: #c9970c; background: #c9970c; }
        .fck-box .tick {
          width: 9px; height: 9px;
          background: #fff;
          clip-path: polygon(14% 44%,0 65%,50% 100%,100% 16%,80% 0%,43% 62%);
          display: none;
        }
        .fck-box.on .tick { display: block; }
        .fck-lbl { font-size: 14px; font-weight: 500; color: #374151; flex: 1; }
        .fck-cnt {
          font-size: 11px; font-weight: 700; color: #9ca3af;
          background: #f3f4f6; border-radius: 999px;
          padding: 1px 7px;
        }

        /* ══ Status ══ */
        .menu-status {
          text-align: center; padding: 64px 24px; color: #9ca3af;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .menu-status.err { color: #b91c1c; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .no-results { text-align: center; padding: 48px 24px; color: #9ca3af; font-size: 15px; }

        /* ══ ORDER MODAL STYLING (SMALL & SIMPLE) ══ */
        .om-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px; animation: omFade 0.18s ease-out;
        }
        @keyframes omFade { from { opacity: 0; } to { opacity: 1; } }
        .om-card {
          background: #fff; border-radius: 20px;
          width: 100%; max-width: 410px; overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
          animation: omPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        @keyframes omPop { from { transform: scale(0.96) translateY(8px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
        
        .om-head-compact {
          display: flex; align-items: center; gap: 14px;
          padding: 18px 20px 14px;
          border-bottom: 1px solid #f1f5f9;
          position: relative;
        }
        .om-thumb-wrap {
          width: 60px; height: 60px; border-radius: 12px;
          overflow: hidden; flex-shrink: 0; background: #f8fafc;
        }
        .om-thumb {
          width: 100%; height: 100%; object-fit: cover;
        }
        .om-thumb-placeholder {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #fef9ec, #fdf3c8);
        }
        .om-head-info { flex: 1; min-width: 0; padding-right: 28px; }
        .om-cat-badge {
          display: inline-block; font-size: 10px; font-weight: 800;
          letter-spacing: 1.2px; text-transform: uppercase; color: #c9970c;
        }
        .om-title {
          font-size: 18px; font-weight: 800; color: #111827;
          margin: 2px 0 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .om-unit-price {
          font-size: 12px; font-weight: 600; color: #6b7280;
        }
        .om-close-btn {
          position: absolute; top: 16px; right: 16px;
          width: 28px; height: 28px; border-radius: 50%;
          background: #f1f5f9; border: none; color: #64748b;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease;
        }
        .om-close-btn:hover { background: #e2e8f0; color: #0f172a; }

        .om-body { padding: 16px 20px 20px; }
        .om-desc {
          font-size: 13px; color: #64748b; line-height: 1.45;
          margin: 0 0 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        
        .om-field-group { margin-bottom: 12px; }
        .om-label {
          font-size: 10px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 1px; color: #64748b; margin-bottom: 5px; display: block;
        }
        .om-label-inline {
          font-size: 12px; font-weight: 700; color: #334155;
        }
        .om-qty-row {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
          padding: 8px 14px;
        }
        .om-qty-controls { display: flex; align-items: center; gap: 10px; }
        .om-qty-btn {
          width: 28px; height: 28px; border-radius: 8px;
          border: 1px solid #cbd5e1; background: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: #1e293b;
          transition: all 0.15s ease;
        }
        .om-qty-btn:hover:not(:disabled) { background: #f1f5f9; border-color: #94a3b8; }
        .om-qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .om-qty-val { font-size: 15px; font-weight: 800; color: #0f172a; min-width: 14px; text-align: center; }
        .om-price-total { font-size: 16px; font-weight: 800; color: #0f172a; }
        
        .om-input {
          width: 100%; padding: 9px 13px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; font-size: 13px; color: #1e293b;
          outline: none; transition: border-color 0.2s; box-sizing: border-box;
          background: #fff;
        }
        .om-input:focus { border-color: #c9970c; }
        
        .om-pay-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
          color: #fff; border: none; border-radius: 12px; padding: 13px 18px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 18px -4px rgba(17, 24, 39, 0.3);
          transition: all 0.2s ease; margin-top: 14px;
        }
        .om-pay-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
          transform: translateY(-1px);
        }
        .om-pay-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        /* ══ Responsive ══ */
        @media (max-width: 1100px) {
          .rp-body { padding: 44px 32px 80px 48px; grid-template-columns: 1fr 270px; gap: 28px; }
        }
        @media (max-width: 860px) {
          .rp-body { grid-template-columns: 1fr; padding: 36px 24px 70px; }
          .fp { position: static; order: -1; }
          .rp-hero .hero-cnt { padding: 0 32px; }
          .rp-hero h1 { font-size: 38px; }
        }
        @media (max-width: 600px) {
          .rp-hero { height: 280px; }
          .rp-hero h1 { font-size: 28px; }
          .rp-body { padding: 28px 16px 60px; }
          .food-card { flex-direction: column; min-height: unset; }
          .food-card-img { width: 100%; height: 180px; }
          .food-card-name { font-size: 18px; }
          .food-price-value { font-size: 20px; }
          .food-order-btn { padding: 10px 16px; font-size: 13px; }
        }
      `}</style>

      <div className="rp">

        {/* ── Hero ── */}
        <div className="rp-hero">
          <div className="hero-ov" />
          <div className="hero-cnt">
            <div className="hero-badge">✦ Gourmet Dining</div>
            <h1>Restaurant &amp; Bar</h1>
            <p>Exquisite dining with local and international cuisine, paired with a sophisticated bar experience.</p>
          </div>
        </div>

        {/* ── Two-col body ── */}
        <div className="rp-body">

          {/* ════ LEFT ════ */}
          <div className="rp-left">
            <div className="menu-hdr">
              <div className="lbl">✦ Our Menu</div>
              <h2>A Culinary Journey</h2>
            </div>

            {/* active filter pills */}
            {hasFilters && (
              <div className="pill-row">
                {[...activeCategories].map(k => (
                  <span key={k} className="pill">
                    {k}
                    <button className="pill-x" onClick={() => toggleCat(k)}><X size={11} /></button>
                  </span>
                ))}
                {[...activePrices].map(l => (
                  <span key={l} className="pill">
                    {l}
                    <button className="pill-x" onClick={() => togglePrice(l)}><X size={11} /></button>
                  </span>
                ))}
              </div>
            )}

            {loading ? (
              <div className="menu-status">
                <Loader2 size={38} className="spin" />
                <p>Loading menu…</p>
              </div>
            ) : error ? (
              <div className="menu-status err"><p>{error}</p></div>
            ) : filteredMenu.length === 0 ? (
              <div className="no-results"><p>No items match your filters. Try adjusting the search.</p></div>
            ) : (
              filteredMenu.map((category) => {
                const Icon = getCategoryIcon(category.name);
                const key = category._id || category.name;
                return (
                  <div key={key} className="cat-group">
                    <div className="cat-title">
                      <Icon size={20} />
                      {category.name}
                    </div>
                    {category.items.map((item) => (
                      <FoodCard
                        key={item._id || item.name}
                        item={item}
                        categoryName={category.name}
                        onOrderClick={handleOpenOrder}
                      />
                    ))}
                  </div>
                );
              })
            )}
          </div>

          {/* ════ RIGHT – Filter ════ */}
          <aside className="fp">
            {/* header */}
            <div className="fp-head">
              <div className="fp-head-left">
                <div className="fp-icon">
                  <SlidersHorizontal size={17} color="#fff" />
                </div>
                <span className="fp-label">Refine Dining</span>
              </div>
              <button
                className={`fp-clear${hasFilters ? '' : ' hidden'}`}
                onClick={clearAll}
              >
                × Clear
              </button>
            </div>

            {/* CATEGORY */}
            <FilterSection title="Category">
              {menu.length === 0 ? (
                <p style={{ fontSize: 13, color: '#9ca3af', padding: '4px 0' }}>Loading…</p>
              ) : (
                menu.map((cat) => {
                  const key = cat._id || cat.name;
                  const checked = activeCategories.has(key);
                  return (
                    <div
                      key={key}
                      className="fck"
                      role="checkbox"
                      aria-checked={checked}
                      tabIndex={0}
                      onClick={() => toggleCat(key)}
                      onKeyDown={e => e.key === 'Enter' && toggleCat(key)}
                    >
                      <div className={`fck-box${checked ? ' on' : ''}`}>
                        <div className="tick" />
                      </div>
                      <span className="fck-lbl">{cat.name}</span>
                      <span className="fck-cnt">{cat.items.length}</span>
                    </div>
                  );
                })
              )}
            </FilterSection>

            {/* PRICE */}
            <FilterSection title="Price (ETB)">
              {PRICE_RANGES.map((range) => {
                const checked = activePrices.has(range.label);
                return (
                  <div
                    key={range.label}
                    className="fck"
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={0}
                    onClick={() => togglePrice(range.label)}
                    onKeyDown={e => e.key === 'Enter' && togglePrice(range.label)}
                  >
                    <div className={`fck-box${checked ? ' on' : ''}`}>
                      <div className="tick" />
                    </div>
                    <span className="fck-lbl">{range.label}</span>
                  </div>
                );
              })}
            </FilterSection>
          </aside>

        </div>
      </div>

      {/* ════ ORDER & STRIPE PAYMENT MODAL (SMALL & SIMPLE) ════ */}
      {selectedFood && (
        <div className="om-backdrop" onClick={handleCloseOrder}>
          <div className="om-card" onClick={e => e.stopPropagation()}>
            {/* Header: Item Thumbnail + Title + Price */}
            <div className="om-head-compact">
              <div className="om-thumb-wrap">
                {selectedFood.image && selectedFood.image !== 'default-food.jpg' ? (
                  <img src={selectedFood.image} alt={selectedFood.name} className="om-thumb" />
                ) : (
                  <div className="om-thumb-placeholder">
                    <Utensils size={24} color="#d4af37" />
                  </div>
                )}
              </div>
              <div className="om-head-info">
                <span className="om-cat-badge">{selectedCatName || 'Dining Item'}</span>
                <h3 className="om-title">{selectedFood.name}</h3>
                <span className="om-unit-price">
                  ETB {formatPrice(selectedFood.price)} / item
                </span>
              </div>
              <button className="om-close-btn" onClick={handleCloseOrder} aria-label="Close modal">
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div className="om-body">
              {selectedFood.description && (
                <p className="om-desc">{selectedFood.description}</p>
              )}

              {/* Quantity Stepper & Price */}
              <div className="om-field-group">
                <div className="om-qty-row">
                  <span className="om-label-inline">Quantity</span>
                  <div className="om-qty-controls">
                    <button
                      className="om-qty-btn"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || isRedirecting}
                    >
                      <Minus size={13} />
                    </button>
                    <span className="om-qty-val">{quantity}</span>
                    <button
                      className="om-qty-btn"
                      onClick={() => setQuantity(q => q + 1)}
                      disabled={isRedirecting}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="om-price-total">
                    ETB {formatPrice((Number(selectedFood.price) || 0) * quantity)}
                  </span>
                </div>
              </div>

              {/* Location Input */}
              <div className="om-field-group">
                <label className="om-label">Table or Room Number (Optional)</label>
                <input
                  type="text"
                  className="om-input"
                  placeholder="e.g. Table 4 or Room 204"
                  value={tableNumber}
                  onChange={e => setTableNumber(e.target.value)}
                  disabled={isRedirecting}
                />
              </div>

              {/* Special Request Input */}
              <div className="om-field-group">
                <label className="om-label">Special Request (Optional)</label>
                <input
                  type="text"
                  className="om-input"
                  placeholder="e.g. Extra spicy, ice on side"
                  value={specialNotes}
                  onChange={e => setSpecialNotes(e.target.value)}
                  disabled={isRedirecting}
                />
              </div>

              {/* Stripe Payment Submit Button */}
              <button
                className="om-pay-btn"
                onClick={handleProceedStripe}
                disabled={isRedirecting}
              >
                {isRedirecting ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    <span>Connecting to Stripe…</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    <span>Pay with Stripe • ETB {formatPrice((Number(selectedFood.price) || 0) * quantity)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantPage;
