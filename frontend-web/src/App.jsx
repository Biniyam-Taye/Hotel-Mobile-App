// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Home from './components/Home';
import Amenities from './components/Amenities';
import RoomDetail from './components/RoomDetail';
import RoomsPage from './pages/RoomsPage';
import HospitalityPage from './pages/HospitalityPage';
import FacilitiesWellnessPage from './pages/FacilitiesWellnessPage';
import EventsConferencesPage from './pages/EventsConferencesPage';
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
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';

// Hospitality sections are independent pages:
// /restaurant — Restaurant & Bar
// /hospitality — Hotel Services
// /facilities-wellness — Facilities & Wellness
// /events-conferences — Events & Conference

// Routes where Navbar and Footer are hidden
const HIDE_NAV_FOOTER = ['/login', '/signup'];

const Layout = ({ children }) => {
  const location = useLocation();
  const shouldHide = HIDE_NAV_FOOTER.includes(location.pathname);

  return (
    <div>
      {!shouldHide && <Navbar />}
      <ScrollToTop />
      <div>{children}</div>
      {!shouldHide && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* ===== HOMEPAGE ===== */}
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

            {/* ===== MAIN PAGES ===== */}
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/hospitality" element={<HospitalityPage />} />
            <Route path="/facilities-wellness" element={<FacilitiesWellnessPage />} />
            <Route path="/events-conferences" element={<EventsConferencesPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/offers" element={<OffersPage />} />

            {/* ===== AMENITY DETAIL PAGES ===== */}
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/pool" element={<PoolPage />} />
            <Route path="/spa" element={<SpaPage />} />
            <Route path="/fitness" element={<FitnessPage />} />

            {/* ===== ROOM DETAIL ===== */}
            <Route path="/room/:id" element={<RoomDetail />} />

            {/* ===== OFFER DETAIL ===== */}
            <Route path="/offers/:id" element={<OfferDetail />} />

            {/* ===== LEGAL & SUPPORT PAGES ===== */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* ===== BOOKING SUCCESS (Stripe Redirect) ===== */}
            <Route path="/booking-success" element={<BookingSuccessPage />} />

            {/* ===== MY ORDERS (Protected) ===== */}
            <Route path="/my-orders" element={<MyOrdersPage />} />

            {/* ===== AUTH PAGES (No Navbar/Footer) ===== */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;