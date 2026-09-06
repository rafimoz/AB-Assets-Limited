import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Papa from 'papaparse'
import Footer from '../components/Footer'

// Published CSV URL
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRDXx_od5XMRh9DgF4wqZRSkmtWbQUe7PXpUgrUa_UzA3ia4Rxlc0XsT5c3Cjulcdqeb5VraEKceywQ/pub?output=csv`
const DEFAULT_HERO = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80'
const DEFAULT_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5002.032889185061!2d90.49757020038057!3d23.812062826336877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c90002d40453%3A0xedb1f0708ff3a67d!2sMosque%20Sec%2012!5e0!3m2!1sen!2sbd!4v1786785246708!5m2!1sen!2sbd'

// Extract Google Drive File ID from any share link format
const extractDriveId = (url) => {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!trimmed) return null

  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|uc\?.*id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/
  const match = trimmed.match(driveRegex)
  return match ? match[1] : null
}

// Generates an unblocked, CORS-compliant CDN image URL
const getDirectImageUrl = (url) => {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (!trimmed) return ''

  const driveId = extractDriveId(trimmed)

  if (driveId) {
    const driveDirectExport = `https://drive.google.com/uc?export=view&id=${driveId}`
    return `https://wsrv.nl/?url=${encodeURIComponent(driveDirectExport)}`
  }

  return trimmed
}

// Format map URL appropriately for Google Maps iframe
const getFormattedMapUrl = (rawMapUrl, defaultLocation) => {
  if (!rawMapUrl || typeof rawMapUrl !== 'string') {
    if (defaultLocation) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(defaultLocation)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    }
    return DEFAULT_MAP_URL
  }

  const trimmed = rawMapUrl.trim()

  // If it's already an embed link
  if (trimmed.includes('/maps/embed') || trimmed.includes('output=embed')) {
    return trimmed
  }

  // If user pasted an iframe tag string directly
  if (trimmed.includes('<iframe')) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/)
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1]
    }
  }

  // If it's a general URL or address text, construct search embed URL
  return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
}

// Handles fallback if CDN or external link fails
const handleImageError = (e, defaultFallback) => {
  const currentSrc = e.target.src || ''
  
  if (!e.target.dataset.triedThumbnail) {
    const driveId = extractDriveId(currentSrc)
    if (driveId) {
      e.target.dataset.triedThumbnail = 'true'
      e.target.src = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`
      return
    }
  }

  e.target.onerror = null
  e.target.src = defaultFallback || DEFAULT_HERO
}

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`${SHEET_URL}&t=${Date.now()}`)
        const csvText = await response.text()

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const matchedItem = results.data.find(
              (item, index) => String(item.id || item.ID || index + 1) === String(id)
            )

            if (matchedItem) {
              const rawHero = matchedItem.heroImage || matchedItem.hero_image || matchedItem.image || matchedItem.Image
              const rawAmenityImg1 = matchedItem.amenityImg1 || matchedItem.amenity_img_1 || matchedItem.amenity1
              const rawAmenityImg2 = matchedItem.amenityImg2 || matchedItem.amenity_img_2 || matchedItem.amenity2

              // Fetch custom amenity titles from spreadsheet columns
              const amenity1Title = 
                matchedItem.amenityImg1Title || 
                matchedItem.amenity_img1_title || 
                matchedItem.amenity1Title || 
                matchedItem['Amenity 1 Title'] || 
                'Featured Amenity 1'

              const amenity2Title = 
                matchedItem.amenityImg2Title || 
                matchedItem.amenity_img2_title || 
                matchedItem.amenity2Title || 
                matchedItem['Amenity 2 Title'] || 
                'Featured Amenity 2'

              // Fetch dynamic map URL from spreadsheet
              const rawMapUrl = 
                matchedItem.mapUrl || 
                matchedItem.map_url || 
                matchedItem.mapLocation || 
                matchedItem.map || 
                matchedItem.Map

              const propertyLocation = matchedItem.location || matchedItem.Location || 'Dhaka, Bangladesh'
              const formattedMapUrl = getFormattedMapUrl(rawMapUrl, propertyLocation)

              const parsedHero = getDirectImageUrl(rawHero) || DEFAULT_HERO

              const parsedAmenity1 = getDirectImageUrl(rawAmenityImg1) ||
                'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
              const parsedAmenity2 = getDirectImageUrl(rawAmenityImg2) ||
                'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'

              let galleryList = []
              if (matchedItem.gallery) {
                galleryList = matchedItem.gallery
                  .split(',')
                  .map((img) => getDirectImageUrl(img.trim()))
                  .filter(Boolean)
              }

              if (galleryList.length === 0) {
                galleryList = [
                  parsedHero,
                  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
                  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
                ]
              }

              const formattedProperty = {
                id: matchedItem.id || id,
                title: matchedItem.title || matchedItem.Title || 'PROPERTY DETAILS',
                type: matchedItem.type || matchedItem.Type || 'Residential',
                location: propertyLocation,
                heroImage: parsedHero,
                mapUrl: formattedMapUrl,
                atAGlance: [
                  { label: 'PROJECT TYPE', value: matchedItem.type || matchedItem.Type || 'Residential' },
                  { label: 'LOCATION', value: matchedItem.location || matchedItem.Location || 'N/A' },
                  { label: 'PROPERTY STATUS', value: matchedItem.status || matchedItem.Status || 'Ongoing' },
                  { label: 'UNIT SIZE', value: matchedItem.unitSize || matchedItem.UnitSize || matchedItem['Unit Size'] || 'N/A' },
                  { label: 'BUILDING HEIGHT', value: matchedItem.buildingHeight || matchedItem.height || 'G + 14' },
                  { label: 'NUMBER OF APTS', value: matchedItem.units || matchedItem.totalUnits || '26 Units' },
                  { label: 'CAR PARKING', value: matchedItem.parking || '2 Per Apt' },
                  { label: 'LAND AREA', value: matchedItem.landArea || matchedItem.land_area || '15 Katha' },
                ],
                amenities: matchedItem.amenities
                  ? matchedItem.amenities.split(',').map((a) => a.trim())
                  : [
                      'Infinity Edge Pool',
                      'Fully Equipped Fitness Center',
                      'Rooftop Landscape Garden',
                      'Children’s Play Area',
                      'Community Lounge',
                      '24/7 CCTV Surveillance',
                      'Full Power Backup Generator',
                      'Driver’s Waiting Lounge',
                    ],
                featuredAmenitiesImages: [
                  { title: amenity1Title, url: parsedAmenity1 },
                  { title: amenity2Title, url: parsedAmenity2 },
                ],
                gallery: galleryList,
              }

              setProperty(formattedProperty)
            }
            setLoading(false)
          },
        })
      } catch (error) {
        console.error('Error fetching property details:', error)
        setLoading(false)
      }
    }

    fetchPropertyDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs tracking-widest uppercase text-gray-400">
        Loading property details...
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-800 space-y-4">
        <h2 className="text-xl font-medium">Property Not Found</h2>
        <Link
          to="/properties"
          className="text-xs uppercase tracking-widest border border-gray-800 px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          Back to Properties
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header Bar */}
      <header className="sticky top-0 z-10 bg-black text-white px-6 sm:px-12 py-3 flex items-center justify-between border-b border-gray-800">
        <Link
          to="/properties"
          className="flex items-center space-x-2 text-xs font-medium tracking-widest uppercase hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>BACK TO PROPERTIES</span>
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

      {/* Hero Header */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden">
        <img
          src={property.heroImage}
          alt={property.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => handleImageError(e, DEFAULT_HERO)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 flex items-end">
          <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full text-white">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-100">
              {property.location}
            </span>
            <h1 className="text-3xl sm:text-5xl mt-1 font-normal tracking-tight">
              {property.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="my-12 flex justify-center">
        <div className="w-24 h-0.5 bg-gray-400"></div>
      </div>

      {/* At A Glance Section */}
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

      {/* Amenities Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-gray-800 mb-12">
          Amenities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {property.featuredAmenitiesImages.map((amenity, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden h-72">
              <img
                src={amenity.url}
                alt={amenity.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => handleImageError(e, DEFAULT_HERO)}
              />
              <div className="absolute bottom-3 left-4 text-white text-xs tracking-widest uppercase font-medium bg-black/50 backdrop-blur-sm px-3 py-1">
                {amenity.title}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-xs text-gray-600">
          {property.amenities.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-[#e24482] font-bold">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Theater */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-gray-800 mb-12">
          Visual Theater
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {property.gallery.map((imgUrl, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden bg-gray-100 group cursor-pointer aspect-[4/3] relative"
            >
              <img
                src={imgUrl}
                alt={`Gallery View ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => handleImageError(e, DEFAULT_HERO)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Where To Find Us */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-gray-800 mb-12">
          Where To Find Us
        </h2>

        <div className="w-full h-96 bg-gray-200 relative overflow-hidden rounded-sm border border-gray-300">
          <iframe
            title="Property Location Map"
            src={property.mapUrl}
            className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}