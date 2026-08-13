// src/pages/HospitalityPage.jsx
import Amenities from '../components/Amenities';

const HospitalityPage = () => {
  return (
    // The 140px padding pushes the cards down so they aren't hidden behind your Navbar
    <div style={{ paddingTop: '140px' }}>
      <Amenities />
    </div>
  );
};

export default HospitalityPage;