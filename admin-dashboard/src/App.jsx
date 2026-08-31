import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminLogin from './components/AdminLogin'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Messages from './components/Messages'
import Team from './components/Team'
import Calendar from './components/Calendar'
import Documents from './components/Documents'
import Help from './components/Help'
import Settings from './components/Settings'
import Overview from './pages/TopNav/Overview'
import Activity from './pages/TopNav/Activity'
import Manage from './pages/TopNav/Manage'
import Program from './pages/TopNav/Program'
import Account from './pages/TopNav/Account'
import Reports from './pages/TopNav/Reports'
import Search from './pages/TopNav/Search'
import Notifications from './pages/TopNav/Notifications'
import Alerts from './pages/TopNav/Alerts'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

function App() {
  const [adminUser, setAdminUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // On mount, verify stored token
  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('adminToken')
      if (!token) { setCheckingAuth(false); return }

      try {
        const res = await fetch(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Token invalid')
        const data = await res.json()
        const user = data?.data?.user
        if (user?.role === 'admin') {
          setAdminUser(user)
        } else {
          // Not an admin — clear storage
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUser')
        }
      } catch {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
      } finally {
        setCheckingAuth(false)
      }
    }
    verify()
  }, [])

  const handleLoginSuccess = (user) => {
    setAdminUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setAdminUser(null)
  }

  // --- Loading state ---
  if (checkingAuth) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f4f5f7'
      }}>
        <div style={{
          width: 36, height: 36,
          border: '3px solid #e5e7eb',
          borderTopColor: '#fa5a2a',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // --- Login wall ---
  if (!adminUser) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  // --- Protected Admin Dashboard ---
  return (
    <Router>
      <div className="app-container">
        <Sidebar onLogout={handleLogout} adminUser={adminUser} />
        
        <div className="main-wrapper">
          <Header adminUser={adminUser} onLogout={handleLogout} />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/team" element={<Team />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/help" element={<Help />} />
              <Route path="/settings" element={<Settings />} />

              {/* Top Nav Routes */}
              <Route path="/top/overview" element={<Overview />} />
              <Route path="/top/activity" element={<Activity />} />
              <Route path="/top/manage" element={<Manage />} />
              <Route path="/top/program" element={<Program />} />
              <Route path="/top/account" element={<Account />} />
              <Route path="/top/reports" element={<Reports />} />
              <Route path="/top/search" element={<Search />} />
              <Route path="/top/notifications" element={<Notifications />} />
              <Route path="/top/alerts" element={<Alerts />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
