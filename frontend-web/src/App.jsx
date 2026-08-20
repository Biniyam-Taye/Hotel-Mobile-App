// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // Added useLocation
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
import OfferDetail from './components/OfferDetail'; 
import ScrollToTop from './components/ScrollToTop';
import OffersPage from './pages/OffersPage'; 
import LoginPage from './pages/LoginPage';     // Added
import SignUpPage from './pages/SignUpPage';   // Added

// Create a Layout component to conditionally show Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  
  // List of routes where we DO NOT want the Navbar and Footer to show
  const hideNavAndFooter = ['/login', '/signup'];

  // Check if current path is in the list
  const shouldHide = hideNavAndFooter.includes(location.pathname);

  return (
    <div>
      {/* Only render Navbar if we shouldn't hide it */}
      {!shouldHide && <Navbar />}
      
      <ScrollToTop /> 
      
      <div>
        {children}
      </div>

      {/* Only render Footer if we shouldn't hide it */}
      {!shouldHide && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              
          
              <About />
               <Home />
              <Amenities />
               <Testimonials />
               <Offers />
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
          <Route path="/offers/:id" element={<OfferDetail />} />
          <Route path="/offers" element={<OffersPage />} />
          
          {/* New Auth Routes (No Navbar/Footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;