// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Rooms from './components/Rooms';
import RoomDetail from './components/RoomDetail';
import RoomsPage from './pages/RoomsPage';
import HospitalityPage from './pages/HospitalityPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div >
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Stats />
                <About />
                <Rooms />
              </>
            } />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/hospitality" element={<HospitalityPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/room/:id" element={<RoomDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;