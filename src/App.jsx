import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Property from './pages/Property';
import Details from './pages/Details';
import PropertyDetails from './pages/PropertyDetails';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import FavouriteSideBar from './pages/FavouriteSideBar';


function App() {
  // Manage favorites and sidebar state in the App component
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
      <Router>
        <NavBar
          favorites={favorites}
          setFavorites={setFavorites}
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <FavouriteSideBar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/property" element={<Property />} />
          <Route
            path="/details"
            element={
              <Details
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
