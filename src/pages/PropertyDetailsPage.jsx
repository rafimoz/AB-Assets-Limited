import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function PropertyDetailsPage() {
  const { id } = useParams()

  // Dynamic content mock matching the layout
  const property = {
    title: 'BELAMOUR BY NAVANA',
    type: 'Residential',
    location: 'Banani, Dhaka',
    heroImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80',
    atAGlance: [
      { label: 'PROJECT TYPE', value: 'Residential' },
      { label: 'LAND AREA', value: '15 Katha' },
      { label: 'ORIENTATION', value: 'South-East Facing' },
      { label: 'BUILDING HEIGHT', value: 'G + 14' },
      { label: 'NUMBER OF APTS', value: '26 Units' },
      { label: 'UNIT SIZE', value: '3,450 SFT' },
      { label: 'CAR PARKING', value: '2 Per Apt' },
    ],
    amenities: [
      'Infinity Edge Pool',
      'Fully Equipped Fitness Center',
      'Rooftop Landscape Garden',
      'Children’s Play Area',
      'Community Lounge',
      '24/7 CCTV Surveillance',
      'Full Power Backup Generator',
      'Driver’s Waiting Lounge',
      'Fire Fighting & Alarm System',
      'Smart Home Automation Ready',
      'Reception & Waiting Lobby',
      'Double Glazed Thermal Glass',
    ],
    featuredAmenitiesImages: [
      {
        title: 'Infinity Pool',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Rooftop Lounge',
        url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80',
    ],
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-50 bg-black text-white px-6 sm:px-12 py-3 flex items-center justify-between border-b border-gray-800">
        <Link
          to="/properties"
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
          <span>BACK TO PROPERTIES</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center space-x-6 text-xs tracking-widest uppercase">
          <a
            href="#contact"
            className="border border-gray-600 px-3 py-1 hover:bg-white hover:text-black transition-colors"
          >
            CONTACT US
          </a>
        </div>
      </header>

      {/* 2. Full-Width Hero Header */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden">
        <img
          src={property.heroImage}
          alt={property.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
          <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full text-white">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-300">
              {property.location}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif mt-1 font-normal tracking-tight">
              {property.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="my-12 flex justify-center">
        <div className="w-24 h-0.5 bg-gray-400"></div>
      </div>

      {/* 3. At A Glance Section */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-gray-800 mb-12">
          At A Glance
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {property.atAGlance.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 p-4 flex flex-col items-center text-center rounded-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#e24482] mb-3" />
              <span className="text-[10px] tracking-widest uppercase text-gray-400 font-semibold mb-1">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Amenities Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-gray-800 mb-12">
          Amenities
        </h2>

        {/* Featured Amenities Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {property.featuredAmenitiesImages.map((amenity, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden h-72">
              <img
                src={amenity.url}
                alt={amenity.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-4 text-white text-xs tracking-widest uppercase font-medium bg-black/50 backdrop-blur-sm px-3 py-1">
                {amenity.title}
              </div>
            </div>
          ))}
        </div>

        {/* Bulleted Amenities List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-xs text-gray-600">
          {property.amenities.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-[#e24482] font-bold">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Visual Theater (Gallery Masonry Grid) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-gray-800 mb-12">
          Visual Theater
        </h2>

        {/* 4-Column Responsive Photo Wall */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {property.gallery.map((imgUrl, index) => (
            <div
              key={index}
              className="break-inside-avoid rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
            >
              <img
                src={imgUrl}
                alt={`Gallery View ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Where To Find Us (Map Location Section) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-gray-800 mb-12">
          Where To Find Us
        </h2>

        <div className="w-full h-96 bg-gray-200 relative overflow-hidden rounded-sm border border-gray-300">
          {/* Mock Interactive Map Frame */}
          <iframe
            title="Property Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5002.032889185061!2d90.49757020038057!3d23.812062826336877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c90002d40453%3A0xedb1f0708ff3a67d!2sMosque%20Sec%2012!5e0!3m2!1sen!2sbd!4v1786785246708!5m2!1sen!2sbd"
            className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}