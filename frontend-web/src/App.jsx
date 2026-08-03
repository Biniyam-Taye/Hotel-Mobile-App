// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Rooms from './components/Rooms';
import RoomDetail from './components/RoomDetail';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Stats />
              <About />
              <Rooms />
            </>
          } />
          <Route path="/room/:id" element={<RoomDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;