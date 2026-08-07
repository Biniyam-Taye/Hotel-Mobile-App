import React from 'react';
import './Dashboard.css';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Wallet, RefreshCcw, ArrowRightLeft, CreditCard, ChevronDown, CheckSquare, Square, Package, Settings, Plane, ShoppingCart, Image as ImageIcon, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const chartData = [
  { name: 'Jan', profit: 28, loss: 20 },
  { name: 'Feb', profit: 35, loss: 25 },
  { name: 'Mar', profit: 25, loss: 45 },
  { name: 'Apr', profit: 42, loss: 30 },
  { name: 'May', profit: 30, loss: 55 },
  { name: 'Jun', profit: 65, loss: 35 },
  { name: 'Jul', profit: 40, loss: 40 },
  { name: 'Aug', profit: 35, loss: 30 },
];

const activities = [
  { id: 'INV_000076', activity: 'Mobile App Purchase', price: '$25,500', status: 'Completed', date: '17 Apr, 2026 03:45 PM', icon: <Package size={16} className="text-blue-500" /> },
  { id: 'INV_000075', activity: 'Hotel Booking', price: '$32,750', status: 'Pending', date: '15 Apr, 2026 11:30 AM', icon: <Settings size={16} className="text-gray-500" /> },
  { id: 'INV_000074', activity: 'Flight Ticket Booking', price: '$40,200', status: 'Completed', date: '15 Apr, 2026 12:00 PM', icon: <Plane size={16} className="text-blue-400" /> },
  { id: 'INV_000073', activity: 'Grocery Purchase', price: '$50,200', status: 'In Progress', date: '14 Apr, 2026 09:15 PM', icon: <ShoppingCart size={16} className="text-orange-400" /> },
  { id: 'INV_000072', activity: 'Software License', price: '$15,900', status: 'Completed', date: '10 Apr, 2026 06:00 AM', icon: <ImageIcon size={16} className="text-red-500" /> },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="greeting">Good morning, Sajibur</h1>
        <p className="subtitle">Stay on top of your tasks, monitor progress, and track status.</p>
      </div>

      <div className="dashboard-grid">
        {/* Total Balance Card */}
        <div className="card total-balance-card">
          <div className="flex justify-between items-center mb-4">
            <span className="text-light text-sm">Total Balance</span>
            <div className="currency-selector">
              <img src="https://flagcdn.com/w20/us.png" alt="USD" width="16" />
              <span className="text-sm font-medium">USD</span>
              <ChevronDown size={14} className="text-light" />
            </div>
          </div>
          <h2 className="balance-amount">$689,372.00</h2>
          <div className="flex items-center gap-2 mb-6">
            <span className="badge badge-green"><ArrowUpRight size={12} /> 5%</span>
            <span className="text-xs text-light">than last month</span>
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-dark">
              <ArrowRightLeft size={16} /> Transfer
            </button>
            <button className="btn btn-light">
              <RefreshCcw size={16} /> Request
            </button>
          </div>

          <div className="wallets-section">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Wallets</span>
              <span className="text-xs text-light">Total 6 wallets</span>
            </div>
            <div className="wallets-list-modern">
              <div className="wallet-row">
                <div className="flex items-center gap-3">
                  <div className="flag-icon-wrapper">
                    <img src="https://flagcdn.com/w20/us.png" alt="USD" width="16" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-dark">USD Wallet</div>
                    <div className="text-[11px] text-green">Active</div>
                  </div>
                </div>
                <div className="font-bold text-sm">$22,678.00</div>
              </div>

              <div className="wallet-row">
                <div className="flex items-center gap-3">
                  <div className="flag-icon-wrapper">
                    <img src="https://flagcdn.com/w20/eu.png" alt="EUR" width="16" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-dark">EUR Wallet</div>
                    <div className="text-[11px] text-green">Active</div>
                  </div>
                </div>
                <div className="font-bold text-sm">€18,345.00</div>
              </div>

              <div className="wallet-row">
                <div className="flex items-center gap-3">
                  <div className="flag-icon-wrapper opacity-50">
                    <img src="https://flagcdn.com/w20/gb.png" alt="GBP" width="16" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-dark opacity-50">GBP Wallet</div>
                    <div className="text-[11px] text-red">Inactive</div>
                  </div>
                </div>
                <div className="font-bold text-sm opacity-50">£15,000.00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="card stat-card stat-card-orange">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm">Total Earnings</span>
              <Wallet size={16} />
            </div>
            <h3 className="stat-amount">$950</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-white-trans"><ArrowUpRight size={10} /> 7%</span>
              <span className="text-xs opacity-80">This month</span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-light">Total Spending</span>
              <div className="icon-circle"><Wallet size={14} /></div>
            </div>
            <h3 className="stat-amount text-dark">$700</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-red"><ArrowDownRight size={10} /> 5%</span>
              <span className="text-xs text-light">This month</span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-light">Total Income</span>
              <div className="icon-circle"><CreditCard size={14} /></div>
            </div>
            <h3 className="stat-amount text-dark">$1,050</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-green"><ArrowUpRight size={10} /> 8%</span>
              <span className="text-xs text-light">This month</span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-light">Total Revenue</span>
              <div className="icon-circle"><Package size={14} /></div>
            </div>
            <h3 className="stat-amount text-dark">$850</h3>
            <div className="flex items-center gap-2 mt-auto">
              <span className="badge badge-green"><ArrowUpRight size={10} /> 4%</span>
              <span className="text-xs text-light">This month</span>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="card chart-card">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold mb-1">Total Income</h3>
              <p className="text-xs text-light">View your income in a certain period of time</p>
            </div>
            <MoreHorizontal size={20} className="text-light" />
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold">Profit and Loss</span>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <span className="legend-dot bg-blue"></span>
                <span className="text-xs text-light">Profit</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="legend-dot bg-dark"></span>
                <span className="text-xs text-light">Loss</span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8b8b8b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8b8b8b' }} tickFormatter={(value) => `${value}k`} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="profit" fill="#fb5a2f" radius={[4, 4, 0, 0]} stackId="a" barSize={20} />
                <Bar dataKey="loss" fill="#121212" radius={[0, 0, 4, 4]} stackId="a" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-grid">
          <div className="card spending-card">
            <h3 className="font-semibold text-sm mb-6">Monthly Spending Limit</h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: '25%' }}></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px]"><span className="font-semibold">$1,400.00</span> spent out of</span>
              <span className="text-[10px] text-light">$5,500.00</span>
            </div>

            <div className="flex justify-between items-center mt-6 mb-4">
              <div className="flex items-center gap-2">
                <CreditCard size={18} />
                <h3 className="font-semibold text-sm">My Cards</h3>
              </div>
              <button className="btn btn-outline text-xs py-1 px-3">+ Add new</button>
            </div>
            
            <div className="cards-list">
              <div className="cc-dark">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-[10px]">
                     <span className="dot bg-white"></span> Active
                  </div>
                  <div className="circles">
                    <span className="circle-red"></span>
                    <span className="circle-orange"></span>
                  </div>
                </div>
                <div className="cc-info">
                  <div className="text-[10px] opacity-70">Card Number</div>
                  <div className="font-medium text-sm mb-4">**** **** **** 6782</div>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[10px] opacity-70">EXP</div>
                      <div className="text-xs font-medium">09/29</div>
                    </div>
                    <div>
                      <div className="text-[10px] opacity-70">CVV</div>
                      <div className="text-xs font-medium">611</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="cc-orange">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-[10px]">
                     <span className="dot bg-white"></span> Active
                  </div>
                  <div className="circles">
                     <span className="circle-white opacity-50"></span>
                     <span className="circle-white"></span>
                  </div>
                </div>
                 <div className="cc-info mt-auto">
                    <div className="text-[10px] opacity-80">Card Number</div>
                    <div className="font-medium text-sm">**** **** **** 4356</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="card activities-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">Recent Activities</h3>
              <div className="flex gap-4">
                <div className="search-box">
                  <Search size={14} className="text-light" />
                  <input type="text" placeholder="Search" />
                </div>
                <button className="btn btn-outline text-xs py-1 px-3 flex items-center gap-1">
                  Filter <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="activities-table">
                <thead>
                  <tr>
                    <th><Square size={14} className="text-light" /></th>
                    <th>Order ID</th>
                    <th>Activity</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((item, index) => (
                    <tr key={item.id} className={index === 3 ? 'active-row' : ''}>
                      <td>
                        {index === 3 ? <CheckSquare size={14} className="text-dark" /> : <Square size={14} className="text-light opacity-50" />}
                      </td>
                      <td className="text-light">{item.id}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="icon-box">{item.icon}</div>
                          <span className="font-medium">{item.activity}</span>
                        </div>
                      </td>
                      <td className="font-medium">{item.price}</td>
                      <td>
                        <span className={`status-dot ${item.status === 'Completed' ? 'bg-green' : item.status === 'Pending' ? 'bg-red' : 'bg-yellow'}`}></span>
                        <span className="text-xs text-light ml-1">{item.status}</span>
                      </td>
                      <td className="text-light text-xs">{item.date}</td>
                      <td><MoreHorizontal size={16} className="text-light" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
