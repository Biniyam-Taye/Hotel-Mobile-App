// src/pages/RestaurantPage.jsx
import { useState, useEffect } from 'react';
import { Utensils, Coffee, Wine, Cake, Loader2 } from 'lucide-react';
import { fetchPublicMenu, formatPrice } from '../services/restaurantApi';

const categoryIcons = {
  Breakfast: Coffee,
  Lunch: Utensils,
  Dinner: Utensils,
  Drinks: Wine,
  Desserts: Cake,
  Appetizers: Utensils,
};

const getCategoryIcon = (name) => categoryIcons[name] || Utensils;

const RestaurantPage = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchPublicMenu();
        setMenu(data);
      } catch (err) {
        setError(err.message || 'Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  return (
    <>
      <style>{`
        .restaurant-page {
          background: #f8f9fa;
          min-height: 100vh;
        }

        .restaurant-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
          padding-left: 60px;
        }

        .restaurant-hero .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
        }

        .restaurant-hero .content {
          position: relative;
          z-index: 2;
          text-align: left;
          color: #ffffff;
          max-width: 700px;
          padding: 0 24px;
        }

        .restaurant-hero .content .badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.2);
          padding: 6px 20px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4af37;
          border: 1px solid rgba(212, 175, 55, 0.25);
          margin-bottom: 16px;
        }

        .restaurant-hero .content h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 52px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .restaurant-hero .content p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
        }

        .menu-section {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        .menu-section .header {
          text-align: left;
          margin-bottom: 48px;
        }

        .menu-section .header .label {
          display: inline-block;
          color: #d4af37;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .menu-section .header h2 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 36px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .menu-category {
          margin-bottom: 40px;
        }

        .menu-category .category-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e5e7eb;
        }

        .menu-category .category-title svg {
          color: #d4af37;
        }

        .menu-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #f1f3f5;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .menu-item .item-image {
          width: 72px;
          height: 72px;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .menu-item .info {
          flex: 1;
        }

        .menu-item .info .name {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .menu-item .info .description {
          font-size: 14px;
          color: #6b7280;
          margin: 2px 0 0;
        }

        .menu-item .price {
          font-size: 16px;
          font-weight: 700;
          color: #d4af37;
          white-space: nowrap;
          margin-left: 20px;
        }

        .menu-status {
          text-align: center;
          padding: 48px 24px;
          color: #6b7280;
        }

        .menu-status.error {
          color: #b91c1c;
        }

        @media (max-width: 768px) {
          .restaurant-hero {
            padding-left: 24px;
            justify-content: center;
          }
          .restaurant-hero .content {
            text-align: center;
          }
          .restaurant-hero .content p {
            margin: 0 auto;
          }
          .restaurant-hero { height: 300px; }
          .restaurant-hero .content h1 { font-size: 34px; }
          .restaurant-hero .content p { font-size: 16px; }
          .menu-section .header h2 { font-size: 28px; }
          .menu-section .header {
            text-align: center;
          }
          .menu-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .menu-item .price {
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .restaurant-hero { height: 240px; }
          .restaurant-hero .content h1 { font-size: 26px; }
          .menu-section {
            padding: 40px 16px 60px;
          }
        }
      `}</style>

      <div className="restaurant-page">
        <div className="restaurant-hero">
          <div className="overlay"></div>
          <div className="content">
            <div className="badge">✦ Gourmet Dining</div>
            <h1>Restaurant & Bar</h1>
            <p>Exquisite dining with local and international cuisine, paired with a sophisticated bar.</p>
          </div>
        </div>

        <div className="menu-section">
          <div className="header">
            <div className="label">✦ Our Menu</div>
            <h2>A Culinary Journey</h2>
          </div>

          {loading ? (
            <div className="menu-status">
              <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
              <p>Loading menu...</p>
            </div>
          ) : error ? (
            <div className="menu-status error">
              <p>{error}</p>
            </div>
          ) : menu.length === 0 ? (
            <div className="menu-status">
              <p>No menu items available yet. Check back soon.</p>
            </div>
          ) : (
            menu.map((category) => {
              const Icon = getCategoryIcon(category.name);
              return (
                <div key={category._id || category.name} className="menu-category">
                  <div className="category-title">
                    <Icon size={24} />
                    {category.name}
                  </div>
                  {category.items.map((item) => (
                    <div key={item._id || item.name} className="menu-item">
                      {item.image && item.image !== 'default-food.jpg' && (
                        <img src={item.image} alt={item.name} className="item-image" />
                      )}
                      <div className="info">
                        <div className="name">{item.name}</div>
                        <div className="description">{item.description}</div>
                      </div>
                      <div className="price">ETB {formatPrice(item.price)}</div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
