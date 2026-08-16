import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('Residential')
  const [location, setLocation] = useState('All locations')
  const [unitSize, setUnitSize] = useState('All sizes')
  const [propertyStatus, setPropertyStatus] = useState('ALL')

  // Sample property listings matching the visual grid
  const properties = [
    {
      id: 1,
      title: 'THE STERLING BY AB ASSETS',
      location: 'Banani',
      type: 'RESIDENTIAL',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'LUNARIS BY AB ASSETS',
      location: 'Uttara',
      type: 'RESIDENTIAL',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'EMINENCE BY AB ASSETS',
      location: 'Niketan',
      type: 'RESIDENTIAL',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'THE STERLING BY AB ASSETS',
      location: 'Gulshan',
      type: 'RESIDENTIAL',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const statusOptions = ['ALL', 'ONGOING', 'UPCOMING', 'COMPLETED']

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-10 bg-black text-white px-6 sm:px-12 py-3 flex items-center justify-between border-b border-gray-800">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xs font-medium tracking-widest uppercase hover:text-gray-300 transition-colors"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>HOME</span>
        </Link>

        {/* Right Actions */}
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
            <svg
              className="w-4 h-4 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project name"
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
                    className={`py-2 border-r last:border-r-0 transition-colors ${propertyStatus === status
                      ? 'bg-black text-white font-medium'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Properties Trigger Button */}
            <button className="w-full border border-gray-800 py-3 text-xs tracking-widest uppercase font-semibold text-gray-800 hover:bg-black hover:text-white transition-colors mt-4">
              SEARCH PROPERTIES
            </button>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {properties.map((item) => (
              <Link
                key={item.id}
                to={`/properties/${item.id}`}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Card Container with Vertical Tag */}
                <div className="relative w-full aspect-[4/5] rounded-lg bg-gray-100 overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Vertical Side Tag */}
                  <span className="absolute right-3 top-10 text-[10px] tracking-[0.25em] text-white/80 uppercase [writing-mode:vertical-lr] font-light">
                    {item.type}
                  </span>
                </div>

                {/* Listing Meta Details */}
                <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-normal mt-0.5">
                  {item.location}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}