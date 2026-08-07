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
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
