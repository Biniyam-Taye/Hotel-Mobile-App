import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Wallet, RefreshCcw,
  ArrowRightLeft, CreditCard, ChevronDown, CheckSquare, Square, Package,
  Settings, Plane, ShoppingCart, Image as ImageIcon, Search, UserCheck, Clock
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
          <div className="flex justify-between items-center mb-4">
            <span className="text-light text-sm">Total Revenue (Paid Only)</span>
            <div className="currency-selector">
              <img src="https://flagcdn.com/w20/us.png" alt="USD" width="16" />
              <span className="text-sm font-medium">USD</span>
            </div>
          </div>
          <h2 className="balance-amount">{formatCurrency(stats.totalRevenue)}</h2>
          <div className="flex items-center gap-2 mb-6">
            <span className="badge badge-green"><ArrowUpRight size={12} /> {stats.paidCount}</span>
            <span className="text-sm text-light">successful transactions</span>
          </div>

          <div className="flex gap-3 mb-6">
            <button className="btn btn-primary flex-1" onClick={() => window.location.reload()}>
              <RefreshCcw size={16} /> Sync Database
            </button>
          </div>

          <div className="wallets-section">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-dark">Revenue Summary</span>
              <span className="text-xs text-light">Live DB</span>
            </div>
            <div className="wallet-list">
              <div className="wallet-item">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <div className="wallet-name">Succeeded Payments</div>
                  <div className="wallet-status text-green">{stats.paidCount} Completed</div>
                </div>
                <div className="wallet-balance">{formatCurrency(stats.totalRevenue)}</div>
              </div>
              <div className="wallet-item">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                  ⌛
                </div>
                <div>
                  <div className="wallet-name">Pending Payments</div>
                  <div className="wallet-status text-amber-500">{stats.pendingCount} Awaiting</div>
                </div>
                <div className="wallet-balance">{formatCurrency(stats.totalPendingAmount)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Stats Cards Grid */}
        <div className="stats-cards-grid">
          <div className="card stat-card total-earnings-card">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Total Paid Revenue</span>
              <Wallet size={18} />
            </div>
            <h2 className="stat-amount">{formatCurrency(stats.totalRevenue)}</h2>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-light-orange"><ArrowUpRight size={10} /> Live</span>
              <span className="text-xs opacity-80">Stripe Succeeded</span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-light">Paid Customers</span>
              <div className="icon-circle"><UserCheck size={14} /></div>
            </div>
            <h3 className="stat-amount text-dark">{stats.paidCount}</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-green"><ArrowUpRight size={10} /> Confirmed</span>
              <span className="text-xs text-light">Payments received</span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-light">Pending Orders</span>
              <div className="icon-circle"><Clock size={14} /></div>
            </div>
            <h3 className="stat-amount text-dark">{stats.pendingCount}</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-orange"><Clock size={10} /> Pending</span>
              <span className="text-xs text-light">{formatCurrency(stats.totalPendingAmount)}</span>
            </div>
          </div>

          <div className="card stat-card" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-light">Verified Transactions</span>
              <div className="icon-circle" style={{ background: '#dcfce7', color: '#16a34a' }}>
                <Package size={14} />
              </div>
            </div>
            <h3 className="stat-amount text-dark">{stats.paidCount + stats.pendingCount} Total</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-green">100% Real DB</span>
              <span className="text-xs text-light">Live Transactions</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart Card */}
        <div className="card chart-card">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold mb-1">Monthly Revenue (Real Database)</h3>
              <p className="text-xs text-light">Aggregated live earnings per month</p>
            </div>
            <MoreHorizontal size={20} className="text-light" />
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold">Revenue Trend</span>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <span className="legend-dot bg-blue"></span>
                <span className="text-xs text-light">Succeeded Revenue ($)</span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8b8b8b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8b8b8b' }} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="profit" fill="#fb5a2f" radius={[4, 4, 0, 0]} barSize={24} />
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
