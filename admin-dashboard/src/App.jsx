import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
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
function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        
        <div className="main-wrapper">
          <Header />
          
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
