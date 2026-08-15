import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage' // Your main page component containing the Footer
import PropertiesPage from './pages/PropertiesPage' // The real estate catalog component
import PropertyDetailsPage from './pages/PropertyDetailsPage'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Home Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Properties Catalog Page */}
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      </Routes>
    </Router>
  )
}