import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import { FullPageLoader } from './components/FullPageLoader'
import About from './pages/About'

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating initial data fetching or asset preloading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <FullPageLoader isLoading={loading} />
      <Routes>
        {/* Main Home Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Properties Catalog Page */}
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}