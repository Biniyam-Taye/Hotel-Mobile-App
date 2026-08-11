// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Home from './components/Home';
import Amenities from './components/Amenities';
import RoomDetail from './components/RoomDetail';
import RoomsPage from './pages/RoomsPage';
import HospitalityPage from './pages/HospitalityPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import RestaurantPage from './pages/RestaurantPage';
import PoolPage from './pages/PoolPage';          
import SpaPage from './pages/SpaPage';            
import FitnessPage from './pages/FitnessPage';    
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Offers from './components/Offers';
// ADD THIS IMPORT:
import OfferDetail from './components/OfferDetail'; 
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
         <ScrollToTop /> 
        <div >
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Stats />
                <Offers />
                <About />
                 <Home />
                <Amenities />
                 <Testimonials />
                 
            
              </>
            } />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/hospitality" element={<HospitalityPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/pool" element={<PoolPage />} />
            <Route path="/spa" element={<SpaPage />} />
            <Route path="/fitness" element={<FitnessPage />} />
            <Route path="/room/:id" element={<RoomDetail />} />
            
            {/* ADD THIS NEW ROUTE: */}
            <Route path="/offers/:id" element={<OfferDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;