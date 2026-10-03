// src/pages/MyOrdersPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, CheckCircle, Clock, XCircle, RefreshCw,
  BedDouble, Utensils, Dumbbell, Calendar, Tag, CreditCard,
  ChevronRight, ArrowLeft, Package, Trash2, Zap, Loader
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchMyOrders } from '../services/ordersApi';
import { initiateStripeCheckout } from '../services/paymentApi';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';


const TYPE_ICONS = {
  Booking: <BedDouble size={18} />,
  FoodOrder: <Utensils size={18} />,
  Facility: <Dumbbell size={18} />,
  Event: <Calendar size={18} />,
  Offer: <Tag size={18} />,
  ServiceBooking: <Package size={18} />,
};

const TYPE_LABELS = {
  Booking: 'Room Booking',
  FoodOrder: 'Dining Order',
  Facility: 'Wellness & Spa',
  Event: 'Event Space',
  Offer: 'Special Package',
  ServiceBooking: 'Hotel Service',
};

const STATUS_CONFIG = {
  succeeded: {
    label: 'Paid',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    icon: <CheckCircle size={13} />,
  },
  pending: {
    label: 'Pending',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    icon: <Clock size={13} />,
  },
  failed: {
    label: 'Failed',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.25)',
    icon: <XCircle size={13} />,
  },
  refunded: {
    label: 'Refunded',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    border: 'rgba(139,92,246,0.25)',
    icon: <RefreshCw size={13} />,
  },
};

const TABS = ['All', 'Paid', 'Pending'];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const formatAmount = (amount, currency = 'usd') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amount);
};

const getUserInitials = (user) => {
  if (!user) return 'G';
  const first = (user.firstName || user.name || user.email || '')[0] || '';
  const last = (user.lastName || '')[0] || '';
  return (first + last).toUpperCase() || 'U';
};

const getDisplayName = (user) => {
  if (!user) return 'Guest';
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
  if (user.firstName) return user.firstName;
  if (user.name) return user.name;
  return user.email || 'Guest';
};

const MyOrdersPage = () => {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [payingId, setPayingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: '/my-orders' }, replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && token) {
      loadOrders();
    }
  }, [user, token]);

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchMyOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Re-initiate Stripe Checkout for a pending order & redirect to Stripe payment page
  const handlePayNow = async (order) => {
    setPayingId(order._id);
    try {
      await initiateStripeCheckout({
        title: order.description || `${order.relatedType || 'Booking'} Payment`,
        amount: order.amount,
        currency: order.currency || 'usd',
        relatedType: order.relatedType || 'Booking',
        relatedId: order.relatedId || '',
        paymentId: order._id,
        customerEmail: order.customerEmail || user?.email || '',
        customerName: order.customerName || '',
        cancelUrl: window.location.href,
      });
    } catch (err) {
      console.error('Failed to redirect to Stripe checkout:', err);
      setPayingId(null);
    }
  };



  // Delete (cancel) a pending order
  const handleDelete = async (orderId) => {
    setDeletingId(orderId);
    setConfirmDeleteId(null);
    try {
      const res = await fetch(`${API_BASE}/payments/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o._id !== orderId));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete order');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };



  const filteredOrders = orders.filter(o => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Paid') return o.status === 'succeeded';
    if (activeTab === 'Pending') return o.status === 'pending';
    return true;
  });

  const paidTotal = orders.filter(o => o.status === 'succeeded').reduce((sum, o) => sum + o.amount, 0);
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  if (authLoading) return null;
  if (!user) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .orders-page {
          min-height: 100vh;
          background: #080810;
          font-family: 'Poppins', sans-serif;
          padding-top: 100px;
          padding-bottom: 80px;
        }

        /* ---- HEADER ---- */
        .orders-header {
          max-width: 900px;
          margin: 0 auto 40px;
          padding: 0 24px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          animation: fadeDown 0.5s ease both;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .orders-header-left h1 {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
        }

        .orders-header-left p {
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          margin: 0;
        }

        .orders-header-left p span {
          color: #d4af37;
          font-weight: 600;
        }

        .orders-user-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #f0cc5a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          color: #1a1a1a;
          flex-shrink: 0;
        }

        /* ---- STATS BAR ---- */
        .orders-stats {
          max-width: 900px;
          margin: 0 auto 32px;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          animation: fadeUp 0.5s 0.1s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px;
        }

        .stat-box-label {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .stat-box-value {
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
        }

        .stat-box-value.gold {
          color: #d4af37;
        }

        .stat-box-value.green {
          color: #10b981;
        }

        /* ---- TABS ---- */
        .orders-tabs {
          max-width: 900px;
          margin: 0 auto 24px;
          padding: 0 24px;
          display: flex;
          gap: 8px;
        }

        .orders-tab {
          padding: 9px 22px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(255,255,255,0.4);
          font-family: 'Poppins', sans-serif;
          transition: all 0.2s;
        }

        .orders-tab:hover {
          border-color: rgba(212,175,55,0.3);
          color: #d4af37;
        }

        .orders-tab.active {
          background: #d4af37;
          border-color: #d4af37;
          color: #1a1a1a;
        }

        /* ---- ORDER CARDS ---- */
        .orders-list {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .order-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: all 0.25s;
          cursor: default;
          animation: cardIn 0.4s ease both;
        }

        .order-card:hover {
          border-color: rgba(212,175,55,0.2);
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .order-type-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4af37;
          flex-shrink: 0;
        }

        .order-info {
          flex: 1;
          min-width: 0;
        }

        .order-info-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
          flex-wrap: wrap;
        }

        .order-type-label {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
        }

        .order-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid;
          letter-spacing: 0.3px;
        }

        .order-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 6px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          flex-wrap: wrap;
        }

        .order-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .order-amount {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          flex-shrink: 0;
          text-align: right;
        }

        .order-amount.paid {
          color: #10b981;
        }

        /* ---- ORDER ACTIONS (Pay + Delete for pending) ---- */
        .order-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          flex-shrink: 0;
        }

        .order-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-pay-now {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          background: linear-gradient(135deg, #d4af37, #f0cc5a);
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .btn-pay-now:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212,175,55,0.4);
        }

        .btn-pay-now:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-delete-order {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .btn-delete-order:hover:not(:disabled) {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.5);
          transform: scale(1.08);
        }

        .btn-delete-order:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ---- DELETE CONFIRM INLINE ---- */
        .delete-confirm-inline {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 12px;
          padding: 7px 12px;
          animation: fadeUp 0.18s ease both;
        }

        .delete-confirm-inline span {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          white-space: nowrap;
        }

        .btn-confirm-yes {
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          background: #ef4444;
          color: #fff;
          font-family: 'Poppins', sans-serif;
          transition: background 0.15s;
        }

        .btn-confirm-yes:hover { background: #dc2626; }

        .btn-confirm-no {
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-family: 'Poppins', sans-serif;
          transition: all 0.15s;
        }

        .btn-confirm-no:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
        }

        /* ---- EMPTY STATE ---- */
        .orders-empty {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 24px;
          text-align: center;
        }

        .orders-empty-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: #d4af37;
        }

        .orders-empty h3 {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 10px 0;
        }

        .orders-empty p {
          color: rgba(255,255,255,0.35);
          font-size: 14px;
          margin: 0 0 28px 0;
        }

        .orders-empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #d4af37, #f0cc5a);
          color: #1a1a1a;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .orders-empty-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.35);
        }

        /* ---- LOADING ---- */
        .orders-loading {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 24px;
          text-align: center;
          color: rgba(255,255,255,0.35);
        }

        .orders-spinner {
          width: 42px;
          height: 42px;
          border: 3px solid rgba(212,175,55,0.15);
          border-top-color: #d4af37;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ---- BACK LINK ---- */
        .orders-back {
          max-width: 900px;
          margin: 0 auto 28px;
          padding: 0 24px;
        }

        .orders-back a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.3);
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 500;
        }

        .orders-back a:hover {
          color: #d4af37;
        }

        @media (max-width: 600px) {
          .orders-stats {
            grid-template-columns: 1fr 1fr;
          }
          .order-card {
            flex-wrap: wrap;
          }
          .order-amount {
            width: 100%;
            text-align: left;
          }
          .orders-header-left h1 {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="orders-page">
        {/* Back */}
        <div className="orders-back">
          <Link to="/"><ArrowLeft size={16} /> Back to Home</Link>
        </div>

        {/* Header */}
        <div className="orders-header">
          <div className="orders-header-left">
            <h1>My Orders</h1>
            <p>Welcome, <span>{getDisplayName(user)}</span></p>
          </div>
          <div className="orders-user-avatar">{getUserInitials(user)}</div>
        </div>

        {/* Stats */}
        <div className="orders-stats">
          <div className="stat-box">
            <div className="stat-box-label">Total Orders</div>
            <div className="stat-box-value gold">{orders.length}</div>
          </div>
          <div className="stat-box">
            <div className="stat-box-label">Amount Paid</div>
            <div className="stat-box-value green">{formatAmount(paidTotal)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-box-label">Pending</div>
            <div className="stat-box-value">{pendingCount}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="orders-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`orders-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === 'Paid' && orders.filter(o => o.status === 'succeeded').length > 0 &&
                ` (${orders.filter(o => o.status === 'succeeded').length})`}
              {tab === 'Pending' && pendingCount > 0 && ` (${pendingCount})`}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="orders-loading">
            <div className="orders-spinner" />
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="orders-empty">
            <div className="orders-empty-icon"><XCircle size={32} /></div>
            <h3>Could not load orders</h3>
            <p>{error}</p>
            <button onClick={loadOrders} className="orders-empty-btn">
              <RefreshCw size={15} /> Try Again
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon"><ShoppingBag size={32} /></div>
            <h3>No {activeTab === 'All' ? '' : activeTab.toLowerCase() + ' '}orders yet</h3>
            <p>
              {activeTab === 'All'
                ? 'Your booking history will appear here after your first reservation.'
                : `You have no ${activeTab.toLowerCase()} orders at the moment.`}
            </p>
            <Link to="/rooms" className="orders-empty-btn">
              Browse Rooms <ChevronRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order, idx) => {
              const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const typeLabel = TYPE_LABELS[order.relatedType] || order.relatedType || 'Booking';
              const typeIcon = TYPE_ICONS[order.relatedType] || <CreditCard size={18} />;
              const isPaid = order.status === 'succeeded';

              return (
                <div
                  className="order-card"
                  key={order._id || idx}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="order-type-icon">{typeIcon}</div>

                  <div className="order-info">
                    <div className="order-info-top">
                      <span className="order-type-label">{typeLabel}</span>
                      <span
                        className="order-status-badge"
                        style={{
                          color: statusCfg.color,
                          background: statusCfg.bg,
                          borderColor: statusCfg.border,
                        }}
                      >
                        {statusCfg.icon}
                        {statusCfg.label}
                      </span>
                    </div>

                    {order.description && (
                      <p className="order-desc">{order.description}</p>
                    )}

                    <div className="order-meta">
                      <span className="order-meta-item">
                        <CreditCard size={12} />
                        {order.paymentMethod?.toUpperCase() || 'CARD'}
                      </span>
                      <span className="order-meta-item">
                        <Clock size={12} />
                        {formatDate(order.createdAt)}
                      </span>
                      {order.stripeCheckoutSessionId && (
                        <span className="order-meta-item" title={order.stripeCheckoutSessionId}>
                          Ref: {order.stripeCheckoutSessionId.slice(-8)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="order-right">
                    <div className={`order-amount ${isPaid ? 'paid' : ''}`}>
                      {formatAmount(order.amount, order.currency)}
                    </div>

                    {!isPaid && order.status === 'pending' && (
                      <div className="order-actions">
                        {confirmDeleteId === order._id ? (
                          <div className="delete-confirm-inline">
                            <span>Delete order?</span>
                            <button
                              className="btn-confirm-yes"
                              disabled={deletingId === order._id}
                              onClick={() => handleDelete(order._id)}
                            >
                              {deletingId === order._id ? <Loader size={12} className="orders-spinner" style={{ width: 12, height: 12, margin: 0 }} /> : 'Yes'}
                            </button>
                            <button
                              className="btn-confirm-no"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              className="btn-pay-now"
                              disabled={payingId === order._id}
                              onClick={() => handlePayNow(order)}
                            >
                              {payingId === order._id ? (
                                <>
                                  <Loader size={13} className="orders-spinner" style={{ width: 13, height: 13, margin: 0, borderWidth: 2 }} />
                                  Paying...
                                </>
                              ) : (
                                <>
                                  <Zap size={13} /> Pay Now
                                </>
                              )}
                            </button>

                            <button
                              className="btn-delete-order"
                              title="Delete Pending Order"
                              disabled={deletingId === order._id}
                              onClick={() => setConfirmDeleteId(order._id)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrdersPage;
