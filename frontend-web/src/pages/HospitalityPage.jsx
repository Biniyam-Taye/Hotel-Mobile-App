// src/pages/HospitalityPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowRight, MapPin, Check, ArrowLeft, Filter, ChevronDown, X 
} from 'lucide-react';
import { services } from '../data/services';
import EventBookingForm from "../components/EventBookingForm";
const HospitalityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [activePrice, setActivePrice] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update URL when category changes – with REPLACE to avoid extra history entries
  useEffect(() => {
    if (activeCategory === 'All') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ category: activeCategory }, { replace: true });
    }
  }, [activeCategory, setSearchParams]);

  // Sync state with URL changes (back button)
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [categoryParam]);

  // Map URL category to service categories
  const getCategoryFilter = (param) => {
    const map = {
      'Dining': ['Dining'],
      'Services': ['Services'],
      'Wellness': ['Spa', 'Fitness', 'Wellness'],
      'Events': ['Events'],   // <-- CORRECTED: maps to 'Events' category
    };
    return map[param] || null;
  };

  // Include 'Events' in the categories list
  const categories = ['All', 'Bar', 'Breakfast', 'Dining', 'Fitness', 'Spa', 'Tour', 'Services', 'Wellness', 'Events'];
  const priceRanges = ['All', '100-300', '300-500', '500-1000'];
  const sortOptions = [
    { id: 'popular', label: 'Popularity' },
    { id: 'price-low', label: 'Price Low to High' },
    { id: 'price-high', label: 'Price High to Low' },
    { id: 'newest', label: 'Newest First' },
  ];

  // Apply category filter using mapping
  const categoryFilter = getCategoryFilter(activeCategory);
  const filteredByCategory = categoryFilter
    ? services.filter(s => categoryFilter.includes(s.category))
    : services;

  // Apply price filter
  const filteredByPrice = filteredByCategory.filter(s => {
    if (activePrice === 'All') return true;
    if (activePrice === '100-300') return s.price >= 100 && s.price <= 300;
    if (activePrice === '300-500') return s.price >= 300 && s.price <= 500;
    if (activePrice === '500-1000') return s.price >= 500 && s.price <= 1000;
    return true;
  });

  // Apply sort
  const sortedServices = [...filteredByPrice].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
    return 0;
  });

  return (
    <>
      <style>{`
        .hospitality-page {
          background: #f8f9fa;
          min-height: 100vh;
          padding: 120px 24px 80px;
        }
        .hospitality-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .hospitality-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .hospitality-header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .hospitality-header h1 {
          font-family: 'Georgia', serif;
          font-size: 40px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }
        .hospitality-header p {
          color: #6b7280;
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .hospitality-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
        }

        .sidebar {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          height: fit-content;
          position: sticky;
          top: 100px;
        }
        .sidebar .sidebar-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #1a1a1a;
          margin-bottom: 12px;
        }
        .sidebar .category-list, .sidebar .price-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
        }
        .sidebar .category-list li, .sidebar .price-list li {
          padding: 6px 0;
          cursor: pointer;
          color: #6b7280;
          font-size: 14px;
          transition: color 0.3s ease;
          border-bottom: 1px solid #f1f3f5;
        }
        .sidebar .category-list li:last-child, .sidebar .price-list li:last-child {
          border-bottom: none;
        }
        .sidebar .category-list li:hover, .sidebar .price-list li:hover {
          color: #d4af37;
        }
        .sidebar .category-list li.active, .sidebar .price-list li.active {
          color: #d4af37;
          font-weight: 600;
        }
        .sidebar .divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 16px 0;
        }
        .sort-options {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .sort-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          cursor: pointer;
          color: #6b7280;
          font-size: 14px;
          transition: color 0.3s ease;
          border-bottom: 1px solid #f1f3f5;
        }
        .sort-option:last-child { border-bottom: none; }
        .sort-option:hover { color: #d4af37; }
        .sort-option.active { color: #d4af37; font-weight: 600; }
        .sort-option .radio-circle {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 2px solid #d1d5db;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.3s ease;
        }
        .sort-option.active .radio-circle { border-color: #d4af37; }
        .sort-option .radio-circle .inner {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #d4af37;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .sort-option.active .radio-circle .inner { opacity: 1; }

        .mobile-filter-toggle {
          display: none;
          width: 100%;
          padding: 12px 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .mobile-filter-toggle:hover { border-color: #d4af37; }

        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 999;
        }
        .sidebar-overlay.active { display: block; }

        .sidebar {
          position: sticky;
          top: 100px;
        }

        .service-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          transition: all 0.4s ease;
          margin-bottom: 24px;
        }
        .service-card:last-child { margin-bottom: 0; }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
          border-color: rgba(212,175,55,0.15);
        }
        .service-card .card-inner {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 0;
        }
        .service-card .card-image {
          height: auto;
          min-height: 260px;
          overflow: hidden;
          position: relative;
        }
        .service-card .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .service-card:hover .card-image img { transform: scale(1.05); }
        .service-card .card-image .popular-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #d4af37;
          color: #1a1a1a;
          padding: 4px 14px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .service-card .card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
        }
        .service-card .card-body .provider {
          font-size: 12px;
          font-weight: 600;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .service-card .card-body .title {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px;
        }
        .service-card .card-body .description {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin: 0 0 12px;
          flex: 1;
        }
        .service-card .card-body .location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 12px;
        }
        .service-card .card-body .location svg { color: #d4af37; }
        .service-card .card-body .amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .service-card .card-body .amenities .amenity {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          background: #f3f4f6;
          border-radius: 9999px;
          font-size: 12px;
          color: #4b5563;
        }
        .service-card .card-body .amenities .amenity svg { color: #d4af37; }
        .service-card .card-body .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #f1f3f5;
        }
        .service-card .card-body .card-footer .price {
          font-size: 20px;
          font-weight: 700;
          color: #d4af37;
        }
        .service-card .card-body .card-footer .price span {
          font-size: 14px;
          font-weight: 400;
          color: #6b7280;
        }
        .service-card .card-body .card-footer .btn-order {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 24px;
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          text-decoration: none;
        }
        .service-card .card-body .card-footer .btn-order:hover {
          background: #c5a028;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212,175,55,0.3);
        }

        @media (max-width: 1024px) {
          .hospitality-layout { grid-template-columns: 240px 1fr; gap: 24px; }
          .service-card .card-inner { grid-template-columns: 240px 1fr; }
        }
        @media (max-width: 768px) {
          .hospitality-page { padding: 100px 16px 60px; }
          .hospitality-header h1 { font-size: 30px; }
          .hospitality-layout { grid-template-columns: 1fr; gap: 16px; }
          .mobile-filter-toggle { display: flex; }
          .sidebar {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            max-width: 340px;
            height: 100vh;
            border-radius: 0;
            border: none;
            box-shadow: -4px 0 30px rgba(0,0,0,0.1);
            padding: 24px 20px;
            overflow-y: auto;
            z-index: 1000;
            transition: right 0.3s ease;
            position: fixed;
            top: 0;
          }
          .sidebar.open { right: 0; }
          .sidebar-close {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 16px;
          }
          .sidebar-close button {
            background: none;
            border: none;
            cursor: pointer;
            color: #6b7280;
            padding: 4px;
          }
          .service-card .card-inner { grid-template-columns: 1fr; }
          .service-card .card-image { height: 200px; min-height: 0; }
          .service-card .card-body .card-footer {
            flex-direction: column;
            align-items: stretch;
          }
          .service-card .card-body .card-footer .btn-order { justify-content: center; }
        }
        @media (max-width: 480px) {
          .hospitality-page { padding: 90px 12px 40px; }
          .service-card .card-image { height: 180px; }
        }
      `}</style>

      <div className="hospitality-page">
        <div className="hospitality-container">
          <div className="hospitality-header">
            <div className="label">✦ Discover Hospitality</div>
            <h1>Discover Hospitality</h1>
            <p>
              Discover dining, spa, massage, tours, and hotel services from our partner properties.
            </p>
          </div>

          {/* Mobile filter toggle */}
          <button className="mobile-filter-toggle" onClick={() => setMobileMenuOpen(true)}>
            <span><Filter size={16} /> Filters & Sort</span>
            <ChevronDown size={16} />
          </button>

          {/* Overlay */}
          <div className={`sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>

          <div className="hospitality-layout">
            {/* Sidebar */}
            <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
              <div className="sidebar-close">
                <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
              </div>

              <div className="sidebar-title">CATEGORY</div>
              <ul className="category-list">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={activeCategory === cat ? 'active' : ''}
                    onClick={() => {
                      setActiveCategory(cat);
                      if (window.innerWidth <= 768) setMobileMenuOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>

              <hr className="divider" />

              <div className="sidebar-title">PRICE (ETB)</div>
              <ul className="price-list">
                {priceRanges.map((range) => (
                  <li
                    key={range}
                    className={activePrice === range ? 'active' : ''}
                    onClick={() => {
                      setActivePrice(range);
                      if (window.innerWidth <= 768) setMobileMenuOpen(false);
                    }}
                  >
                    {range === 'All' ? 'All' : `${range.replace('-', ' to ')} ETB`}
                  </li>
                ))}
              </ul>

              <hr className="divider" />

              <div className="sidebar-title">SORT RESULTS BY</div>
              <div className="sort-options">
                {sortOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`sort-option ${sortBy === option.id ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy(option.id);
                      if (window.innerWidth <= 768) setMobileMenuOpen(false);
                    }}
                  >
                    <div className="radio-circle"><div className="inner"></div></div>
                    {option.label}
                  </div>
                ))}
              </div>
            </aside>

            {/* Services */}
            <div className="services-list">
              {sortedServices.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  No services found.
                </div>
              ) : (
                sortedServices.map((service) => (
                  <div key={service.id} className="service-card">
                    <div className="card-inner">
                      <div className="card-image">
                        <img src={service.image} alt={service.title} loading="lazy" />
                        {service.popular && (
                          <div className="popular-badge">✦ Popular</div>
                        )}
                      </div>
                      <div className="card-body">
                        <div className="provider">{service.provider}</div>
                        <h3 className="title">{service.title}</h3>
                        <p className="description">{service.description}</p>
                        <div className="location">
                          <MapPin size={14} /> {service.location}
                        </div>
                        <div className="amenities">
                          {service.amenities.map((amenity, idx) => (
                            <span key={idx} className="amenity">
                              <Check size={12} /> {amenity}
                            </span>
                          ))}
                        </div>
                        <div className="card-footer">
                          <div className="price">
                            ETB {service.price.toLocaleString()} <span>/ person</span>
                          </div>
                          <button className="btn-order" onClick={() => alert(`Booked: ${service.title}`)}>
                            Book Now <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalityPage;