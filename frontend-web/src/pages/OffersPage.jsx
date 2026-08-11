// src/pages/OffersPage.jsx
import Offers from '../components/Offers';

const OffersPage = () => {
  return (
    // Added paddingTop: '140px' to push the content down below the floating Navbar
    <div style={{ paddingTop: '140px' }}>
      <Offers />
    </div>
  );
};

export default OffersPage;