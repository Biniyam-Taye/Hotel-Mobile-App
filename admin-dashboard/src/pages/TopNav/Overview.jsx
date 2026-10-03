import React, { useState } from 'react';
import './TopNavPages.css';
import { BarChart, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

const Overview = () => {
  // Mock Database State
  const [metrics] = useState({
    revPar: '$142.50',
    revParTrend: '+5.2%',
    adr: '$185.00',
    adrTrend: '+2.1%',
    occupancy: '78%',
    occupancyTrend: '+4.5%'
  });

  const [recentBookings] = useState([
    { id: 'BK-1029', name: 'Alice Smith', room: 'Deluxe Suite', amount: '$740.00', status: 'Confirmed' },
    { id: 'BK-1030', name: 'John Doe', room: 'Standard', amount: '$250.00', status: 'Pending' },
    { id: 'BK-1031', name: 'Emma Wilson', room: 'Ocean View', amount: '$1,200.00', status: 'Confirmed' },
  ]);

  return (
    <div className="topnav-page">
      <div className="topnav-header" style={{ '--theme-color': '#6366f1' }}>
        <div className="topnav-icon-wrap">
          <BarChart size={32} />
        </div>
        <div className="topnav-title">
          <h1>Global Overview</h1>
          <p>High-level metrics and system-wide performance dashboard.</p>
        </div>
      </div>

      <div className="topnav-content">
        <div className="topnav-grid">
          <div className="topnav-card">
            <h3><DollarSign size={18} /> RevPAR</h3>
            <div className="topnav-stat">{metrics.revPar}</div>
            <div className="topnav-trend positive"><TrendingUp size={14}/> {metrics.revParTrend} vs last month</div>
          </div>
          <div className="topnav-card">
            <h3><DollarSign size={18} /> ADR</h3>
            <div className="topnav-stat">{metrics.adr}</div>
            <div className="topnav-trend positive"><TrendingUp size={14}/> {metrics.adrTrend} vs last month</div>
          </div>
          <div className="topnav-card">
            <h3><Users size={18} /> Occupancy Rate</h3>
            <div className="topnav-stat">{metrics.occupancy}</div>
            <div className="topnav-trend positive"><TrendingUp size={14}/> {metrics.occupancyTrend} vs last month</div>
          </div>
        </div>

        <div className="topnav-table-wrap">
          <table className="topnav-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td><strong>{booking.id}</strong></td>
                  <td>{booking.name}</td>
                  <td>{booking.room}</td>
                  <td>{booking.amount}</td>
                  <td>
                    <span className={`topnav-badge ${booking.status === 'Confirmed' ? 'badge-green' : 'badge-orange'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
