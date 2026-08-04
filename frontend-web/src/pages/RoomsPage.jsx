// src/pages/RoomsPage.jsx
import Home from '../components/Home';  // ← Changed from Rooms to Home

const RoomsPage = () => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <Home />  {/* ← Changed from Rooms to Home */}
    </div>
  );
};

export default RoomsPage;