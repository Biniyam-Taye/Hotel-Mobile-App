import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {
  ArrowUpRight, MoreHorizontal, Wallet, RefreshCcw,
  CheckSquare, Square, Package,
  Search, UserCheck, Clock, CheckCircle2, Hourglass,
  TrendingUp, DollarSign, BarChart2, Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    paidCount: 0,
    pendingCount: 0,
    totalPendingAmount: 0,
    transactions: [],
    chartData: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRevenueStats = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/v1/payments/revenue-stats');
        const json = await res.json();
        if (json.data) {
          setStats({
            totalRevenue: json.data.totalRevenue || 0,
            paidCount: json.data.paidCount || 0,
            pendingCount: json.data.pendingCount || 0,
            totalPendingAmount: json.data.totalPendingAmount || 0,
            transactions: json.data.transactions || [],
            chartData: json.data.chartData || [],
          });
        }
      } catch (err) {
        console.error('Revenue stats fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenueStats();
  }, []);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
  };

  const filteredTransactions = stats.transactions.filter(t => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      t.customerName?.toLowerCase().includes(term) ||
      t.customerEmail?.toLowerCase().includes(term) ||
      t.activity?.toLowerCase().includes(term) ||
      t.id?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="greeting">Good day, Hotel Owner</h1>
        <p className="subtitle">Real-time overview of customer bookings, payments, and financial revenue.</p>
      </div>

      <div className="dashboard-grid">
        {/* Total Revenue Overview Card */}
        <div className="card total-balance-card">
          <div className="rev-card-header">
            <div className="rev-card-header-left">
              <div className="rev-icon-wrapper">
                <DollarSign size={18} />
              </div>
              <div>
                <span className="rev-card-label">Total Revenue</span>
                <span className="rev-card-sublabel">Paid Transactions Only</span>
              </div>
            </div>
            <div className="currency-selector">
              <img src="https://flagcdn.com/w20/us.png" alt="USD" width="16" />
              <span className="text-sm font-medium">USD</span>
            </div>
          </div>

          <h2 className="balance-amount">{formatCurrency(stats.totalRevenue)}</h2>

          <div className="rev-success-badge">
            <span className="badge badge-green"><ArrowUpRight size={12} /> {stats.paidCount} Successful</span>
            <span className="rev-live-dot"><span className="live-pulse"></span> Live</span>
          </div>

          <button className="btn-sync" onClick={() => window.location.reload()}>
            <RefreshCcw size={15} />
            <span>Sync Database</span>
          </button>

          <div className="revenue-summary-section">
            <div className="rev-summary-header">
              <span>Revenue Summary</span>
              <span className="rev-live-badge">Live DB</span>
            </div>
            <div className="wallet-list">
              <div className="wallet-item">
                <div className="wallet-icon-wrap wallet-icon-green">
                  <CheckCircle2 size={15} />
                </div>
                <div className="wallet-info">
                  <div className="wallet-name">Succeeded Payments</div>
                  <div className="wallet-status text-green">{stats.paidCount} Completed</div>
                </div>
                <div className="wallet-balance">{formatCurrency(stats.totalRevenue)}</div>
              </div>
              <div className="wallet-item">
                <div className="wallet-icon-wrap wallet-icon-amber">
                  <Hourglass size={15} />
                </div>
                <div className="wallet-info">
                  <div className="wallet-name">Pending Payments</div>
                  <div className="wallet-status wallet-status-amber">{stats.pendingCount} Awaiting</div>
                </div>
                <div className="wallet-balance">{formatCurrency(stats.totalPendingAmount)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Stats Cards Grid */}
        <div className="stats-cards-grid">
          {/* Total Paid Revenue - accent card */}
          <div className="card stat-card stat-card--accent">
            <div className="stat-card-top">
              <div className="stat-card-label">Total Paid Revenue</div>
              <div className="stat-icon-box stat-icon-box--white">
                <Wallet size={15} />
              </div>
            </div>
            <h2 className="stat-amount">{formatCurrency(stats.totalRevenue)}</h2>
            <div className="stat-card-footer">
              <span className="badge badge-white-trans"><ArrowUpRight size={10} /> Live</span>
              <span className="stat-footer-text">Stripe Succeeded</span>
            </div>
          </div>

          {/* Paid Customers */}
          <div className="card stat-card">
            <div className="stat-card-top">
              <div className="stat-card-label text-light">Paid Customers</div>
              <div className="stat-icon-box">
                <UserCheck size={15} />
              </div>
            </div>
            <h3 className="stat-amount text-dark">{stats.paidCount}</h3>
            <div className="stat-card-footer">
              <span className="badge badge-green"><ArrowUpRight size={10} /> Confirmed</span>
              <span className="stat-footer-text text-light">Payments received</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="card stat-card">
            <div className="stat-card-top">
              <div className="stat-card-label text-light">Pending Orders</div>
              <div className="stat-icon-box stat-icon-box--amber">
                <Clock size={15} />
              </div>
            </div>
            <h3 className="stat-amount text-dark">{stats.pendingCount}</h3>
            <div className="stat-card-footer">
              <span className="badge badge-orange"><Clock size={10} /> Awaiting</span>
              <span className="stat-footer-text text-light">{formatCurrency(stats.totalPendingAmount)}</span>
            </div>
          </div>

          {/* Verified Transactions */}
          <div className="card stat-card stat-card--green-border">
            <div className="stat-card-top">
              <div className="stat-card-label text-light">Verified Transactions</div>
              <div className="stat-icon-box stat-icon-box--green">
                <Package size={15} />
              </div>
            </div>
            <h3 className="stat-amount text-dark">{stats.paidCount + stats.pendingCount} <span className="stat-total-label">Total</span></h3>
            <div className="stat-card-footer">
              <span className="badge badge-green"><Activity size={10} /> Real DB</span>
              <span className="stat-footer-text text-light">Live Transactions</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart Card */}
        <div className="card chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title-group">
              <div className="chart-title-icon">
                <BarChart2 size={16} />
              </div>
              <div>
                <h3 className="chart-card-title">Monthly Revenue</h3>
                <p className="chart-card-subtitle">Aggregated live earnings per month</p>
              </div>
            </div>
            <button className="chart-more-btn">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="chart-legend-row">
            <div className="chart-legend-label">
              <TrendingUp size={12} />
              <span>Revenue Trend</span>
            </div>
            <div className="chart-legend-item">
              <span className="legend-dot bg-blue"></span>
              <span>Succeeded ($)</span>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8b8b8b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8b8b8b' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{ fill: 'rgba(251,90,47,0.06)' }} formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="profit" fill="#fb5a2f" radius={[5, 5, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row - Real Customer Payments List */}
        <div className="bottom-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="card activities-card">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-lg">Customer Payments & Transactions</h3>
                <p className="text-xs text-light mt-1">Live payments recorded in MongoDB from customers</p>
              </div>
              <div className="flex gap-4">
                <div className="search-box">
                  <Search size={14} className="text-light" />
                  <input
                    type="text"
                    placeholder="Search by customer or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                Loading customer transactions...
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                No customer transactions found in database.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="activities-table">
                  <thead>
                    <tr>
                      <th><Square size={14} className="text-light" /></th>
                      <th>Ref ID</th>
                      <th>Customer Name</th>
                      <th>Service / Activity</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((item, index) => (
                      <tr key={item.id || index} className={item.rawStatus === 'succeeded' ? 'active-row' : ''}>
                        <td>
                          {item.rawStatus === 'succeeded' ? (
                            <CheckSquare size={14} className="text-emerald-600" />
                          ) : (
                            <Square size={14} className="text-light opacity-50" />
                          )}
                        </td>
                        <td className="text-light font-mono text-xs">{item.id}</td>
                        <td>
                          <div className="font-medium text-dark">{item.customerName}</div>
                          {item.customerEmail && (
                            <div className="text-xs text-light">{item.customerEmail}</div>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{item.activity}</span>
                          </div>
                        </td>
                        <td className="font-bold text-dark">{formatCurrency(item.amount)}</td>
                        <td>
                          <span
                            className={`status-dot ${
                              item.rawStatus === 'succeeded'
                                ? 'bg-green'
                                : item.rawStatus === 'pending'
                                ? 'bg-yellow'
                                : 'bg-red'
                            }`}
                          ></span>
                          <span className="text-xs text-light ml-1 font-medium">{item.status}</span>
                        </td>
                        <td className="text-light text-xs">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
