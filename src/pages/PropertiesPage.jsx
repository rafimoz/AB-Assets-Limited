import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Papa from 'papaparse'
import Footer from '../components/Footer'

// Published CSV URL
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRDXx_od5XMRh9DgF4wqZRSkmtWbQUe7PXpUgrUa_UzA3ia4Rxlc0XsT5c3Cjulcdqeb5VraEKceywQ/pub?output=csv`
const DEFAULT_HERO = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'

// Convert Google Drive share URLs to direct viewable image URLs
const getDirectImageUrl = (url) => {
  if (!url || typeof url !== 'string') return DEFAULT_HERO
  const trimmed = url.trim()
  if (!trimmed) return DEFAULT_HERO

  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|uc\?.*id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/
  const match = trimmed.match(driveRegex)

  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`
  }
  return trimmed
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('ALL')
  const [location, setLocation] = useState('All locations')
  const [unitSize, setUnitSize] = useState('All sizes')
  const [propertyStatus, setPropertyStatus] = useState('ALL')

  // Fetch & Parse CSV Google Sheet Data
  const fetchProperties = async () => {
    try {
      const response = await fetch(`${SHEET_URL}&t=${Date.now()}`)
      const csvText = await response.text()

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((item, index) => {
            // Flexible property extraction to handle standard sheet header variations
            const rawHero = item.image || item.Image || item.heroImage || item.hero_image
            const rawTitle = item.title || item.Title || ''
            const rawLocation = item.location || item.Location || ''
            const rawType = item.type || item.Type || ''
            const rawStatus = item.status || item.Status || ''
            const rawUnitSize = item.unitSize || item.UnitSize || item['Unit Size'] || item.unit_size || ''

            return {
              id: item.id || item.ID || index + 1,
              title: rawTitle.trim(),
              location: rawLocation.trim(),
              type: rawType.trim(),
              status: rawStatus.trim(),
              unitSize: rawUnitSize.trim(),
              image: getDirectImageUrl(rawHero),
            }
          })
          setProperties(parsedData)
          setLoading(false)
        },
      })
    } catch (error) {
      console.error('Error fetching sheet data:', error)
      setLoading(false)
    }
  }

  // Realtime Polling Setup (Fetches every 10 seconds)
  useEffect(() => {
    fetchProperties()
    const interval = setInterval(() => {
      fetchProperties()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Helper function to extract numeric values from unit size strings (e.g., "1500 sqft" -> 1500)
  const parseSquareFeet = (str) => {
    if (!str) return 0
    const numbersOnly = str.replace(/[^0-9]/g, '')
    return numbersOnly ? parseInt(numbersOnly, 10) : 0
  }

  // Dynamic Filtering Logic
  const filteredProperties = properties.filter((item) => {
    // 1. Search term match
    const matchesSearch = searchTerm
      ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    // 2. Property Type match
    const matchesType =
      propertyType === 'ALL' ||
      item.type.toUpperCase() === propertyType.toUpperCase()

    // 3. Substring location match (e.g. "Gulshan, Dhaka" matches "Gulshan")
    const matchesLocation =
      location === 'All locations' ||
      item.location.toLowerCase().includes(location.toLowerCase())

    // 4. Flexible Unit Size Range Matching
    let matchesSize = true
    if (unitSize !== 'All sizes') {
      const sqft = parseSquareFeet(item.unitSize)
      if (unitSize === '1000-2000 sqft') {
        matchesSize = sqft >= 1000 && sqft <= 2000
      } else if (unitSize === '2000-3500 sqft') {
        matchesSize = sqft > 2000 && sqft <= 3500
      } else if (unitSize === '3500+ sqft') {
        matchesSize = sqft > 3500
      } else {
        // Fallback exact match if raw values are selected
        matchesSize = item.unitSize.toLowerCase() === unitSize.toLowerCase()
      }
    }

    // 5. Property Status match
    const matchesStatus =
      propertyStatus === 'ALL' ||
      item.status.toUpperCase() === propertyStatus.toUpperCase()

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesSize &&
      matchesStatus
    )
  })

  const statusOptions = ['ALL', 'ONGOING', 'UPCOMING', 'COMPLETED']

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-10 bg-black text-white px-6 sm:px-12 py-3 flex items-center justify-between border-b border-gray-800">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xs font-medium tracking-widest uppercase hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>HOME</span>
        </Link>

        <div className="flex items-center space-x-6 text-xs tracking-widest uppercase">
          <Link
            to="/contact"
            className="border border-gray-600 px-3 py-1 hover:bg-white hover:text-black transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </header>

      {/* 2. Hero Header Section */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Properties Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end">
          <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full text-white">
            <h1 className="text-3xl sm:text-5xl mt-1 font-normal tracking-tight">
              Our Properties
            </h1>
          </div>
        </div>
      </section>

      {/* 3. Search & Main Filter Section */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        {/* Global Search Bar */}
        <div className="relative mb-12 border-b border-gray-200 pb-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project name or location"
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Layout Grid: Sidebar Controls + Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sidebar Filter Controls */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Property Type Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
                PROPERTY TYPE
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-white border border-gray-200 text-xs text-gray-700 py-2.5 px-3 rounded-none focus:outline-none focus:border-gray-400"
              >
                <option value="ALL">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Location Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
                LOCATION
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-gray-200 text-xs text-gray-700 py-2.5 px-3 rounded-none focus:outline-none focus:border-gray-400"
              >
                <option value="All locations">All locations</option>
                <option value="Banani">Banani</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Uttara">Uttara</option>
                <option value="Niketan">Niketan</option>
                <option value="Jolshiri">Jolshiri</option>
              </select>
            </div>

            {/* Unit Size Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
                UNIT SIZE
              </label>
              <select
                value={unitSize}
                onChange={(e) => setUnitSize(e.target.value)}
                className="w-full bg-white border border-gray-200 text-xs text-gray-700 py-2.5 px-3 rounded-none focus:outline-none focus:border-gray-400"
              >
                <option value="All sizes">All sizes</option>
                <option value="1000-2000 sqft">1000 - 2000 sqft</option>
                <option value="2000-3500 sqft">2000 - 3500 sqft</option>
                <option value="3500+ sqft">3500+ sqft</option>
              </select>
            </div>

            {/* Property Status Filter Buttons */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">
                PROPERTY STATUS
              </label>
              <div className="grid grid-cols-4 border border-gray-200 text-[10px] tracking-wider text-center">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => setPropertyStatus(status)}
                    className={`py-2 border-r last:border-r-0 transition-colors ${
                      propertyStatus === status
                        ? 'bg-black text-white font-medium'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="py-20 text-center text-xs tracking-widest uppercase text-gray-400">
                Loading properties...
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="py-20 text-center text-xs tracking-widest uppercase text-gray-400">
                No matching properties found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                {filteredProperties.map((item) => (
                  <Link
                    key={item.id}
                    to={`/properties/${item.id}`}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/5] rounded-lg bg-gray-100 overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = DEFAULT_HERO
                        }}
                      />
                      <span className="absolute right-3 top-10 text-[20px] tracking-[0.25em] text-white/80 uppercase [writing-mode:vertical-lr] font-light">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase group-hover:text-gray-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                      {item.location}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}