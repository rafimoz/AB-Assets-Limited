import React, { useState } from 'react'

// Placeholder for your Logo SVG component. 
// If you already have a separate Logo component, import it instead.
const LogoSVG = ({ className = "w-12 h-15" }) => (
  <svg className="w-40 md:w-58" viewBox="0 0 658 160" xmlns="http://www.w3.org/2000/svg">
        <path d="M137.93 104.865H154.356C154.356 112.722 154.467 120.002 154.307 127.282C154.209 131.633 155.903 133.263 160.372 133.239C189.247 133.092 218.121 133.288 246.983 133.104C259.309 133.018 267.584 124.843 267.387 113.763C267.191 103.002 259.947 96.3717 247.168 96.3104C190.167 96.0408 133.167 95.9795 76.1667 95.8447C72.7784 95.8447 69.39 95.8447 65.4492 95.8447V78.931C68.101 78.931 70.9123 78.931 73.7359 78.931C130.012 78.931 186.288 78.9433 242.564 78.9678C262.513 78.9678 273.685 64.9589 269.13 45.5817C266.761 35.5315 257.787 28.092 245.878 27.8223C223.621 27.3198 201.351 27.4669 179.094 27.4056C166.318 27.3729 155.727 21.8494 147.322 10.8351C150.71 10.688 153.534 10.4307 156.357 10.4674C186.19 10.7738 216.034 11.2886 245.866 11.4112C264.158 11.4969 276.472 20.2357 283.506 36.561C290.222 52.151 286.146 71.5282 274.311 83.3555C273.292 84.3728 272.335 85.4514 271.181 86.6893C272.015 87.8536 272.58 88.9321 273.415 89.7411C284.28 100.22 287.103 112.807 281.579 126.534C275.821 140.85 264.207 148.277 248.935 148.436C213.947 148.816 178.959 148.633 143.97 148.375C141.957 148.363 138.286 145.716 138.225 144.196C137.758 131.302 137.955 118.396 137.955 104.89L137.93 104.865Z" fill="red" />
        <path d="M155.656 71.0991H137.253C137.253 65.1058 137.302 59.3576 137.253 53.6094C137.106 38.044 127.346 27.957 111.681 27.81C88.4658 27.5893 65.2385 27.5893 42.0234 27.81C28.1263 27.9448 17.8508 36.8061 17.4457 50.6557C16.66 77.4724 17.0651 104.326 16.9792 131.155C16.9669 136.732 16.9792 142.296 16.9792 148.449H0.368907C0.270694 146.451 0.0497149 144.147 0.0497149 141.83C0.0251617 112.783 0.147928 83.7476 0.000608452 54.7002C-0.109881 33.5949 14.8308 10.4428 42.2076 11.1659C66.1101 11.8033 90.0495 11.0801 113.964 11.3988C134.871 11.6807 148.535 22.4907 153.029 42.8729C154.993 51.7587 154.796 61.1103 155.656 71.0991Z" fill="white" />
    </svg>
)



export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your email submission logic here (e.g., API call)
    console.log('Submitted email:', email)
    setEmail('')
  }

  return (
    <footer className="w-full bg-black text-white font-sans overflow-hidden mt-30">
      {/* Hero Image Section */}
      <div className="relative w-full h-screen sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] 2xl:h-[1000px]">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architecture Building"
          className="w-full h-full object-cover object-center"
        />

        {/* --- GRADIENT OVERLAYS --- */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top White Gradient: Smoothly transitions white background into the image */}
          <div className="absolute top-0 left-0 right-0 h-48 sm:h-64 bg-linear-to-b from-white via-white/50 to-transparent z-10" />

          {/* Bottom Dark Gradient: Transitions image into the black footer area */}
          <div className="absolute bottom-0 left-0 right-0 h-72 sm:h-96 bg-linear-to-t from-black via-black/50 to-transparent z-10" />
        </div>

        {/* Center Text & Button CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.15] max-w-4xl drop-shadow-md">
            Smart Solutions for a <br />
            Seamless <span className="font-serif italic font-light">Life</span>
          </h2>

          <a
            href="#explore"
            className="mt-8 inline-flex items-center gap-1.5 bg-[#f1fc7b] hover:bg-[#e2f063] text-black text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Explore Homes
            <svg
              className="w-3.5 h-3.5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 -mt-12 relative z-20 pb-12 ">
        {/* Navigation & Brand Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between pt-8 ">
          {/* Custom Stylized Logo & Contact Info */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <LogoSVG className="w-12 h-12" />
            <div className="pt-2">
              <p className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold mb-0.5">
                FOR INFORMATION CONTACT US
              </p>
              <a
                href="mailto:info@abassets.bd"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                info@abassets.bd
              </a>
            </div>
          </div>

          {/* Navigations Section */}
          <div className="md:col-span-3 sm:flex flex-row items-start gap-4 sm:gap-6">
            <div className="flex items-center space-x-1.5 mb-3">
              <span className="text-[#f1fc7b] text-[8px]">✦</span>
              <h4 className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
                NAVIGATIONS
              </h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-normal">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-white transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#blogs" className="hover:text-white transition-colors">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="md:col-span-4 sm:flex flex-row items-start gap-4 justify-end sm:gap-6">
            <div className="flex items-center space-x-1.5 mb-3">
              <span className="text-[#f1fc7b] text-[8px]">✦</span>
              <h4 className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
                SOCIAL LINKS
              </h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-normal">
              <li>
                <a href="#facebook" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#linkedin" className="hover:text-white transition-colors">
                  Linkedin
                </a>
              </li>
              <li>
                <a href="#twitter" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="my-30 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center space-x-1.5">
            <span className="text-[#f1fc7b] text-[8px]">✦</span>
            <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
              FOR LATEST NEWS
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center space-x-3 w-full sm:w-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="bg-transparent border-b border-gray-700 focus:border-white text-xs text-white placeholder-gray-500 py-1 px-2 focus:outline-none w-full sm:w-64 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#f1fc7b] hover:bg-[#e2f063] text-black font-semibold text-[10px] tracking-wider uppercase px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-gray-900/60 py-6 px-6 sm:px-12 lg:px-20 text-[10px] text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>©2026 All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-gray-300 transition-colors">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}