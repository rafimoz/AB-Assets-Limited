import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    // Define nav links with path/target destinations
    const navLinks = [
        { name: 'Home', path: '/', isPage: true },
        { name: 'Properties', path: '/properties', isPage: true },
        { name: 'About Us', path: '/About', isPage: true },
        { name: 'Blogs', path: '/blogs', isPage: true },
        { name: 'Contact Us', path: '/contact', isPage: true },
    ]

    const handleNavClick = (e, item) => {
        setIsMenuOpen(false) // Close mobile menu if open

        if (item.isPage) {
            // Direct page navigation for routes like /properties or /
            return
        }

        // Handle smooth scrolling for anchor links
        e.preventDefault()

        if (location.pathname !== '/') {
            // If user is NOT on the home page, navigate home first, then scroll
            navigate('/')
            setTimeout(() => {
                const element = document.getElementById(item.targetId)
                if (element) element.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        } else {
            // If already on home page, scroll directly
            const element = document.getElementById(item.targetId)
            if (element) element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div>
            {/* Header / Navigation Bar Container */}
            <div className=" w-full mx-auto">
                <nav className=" fixed right-4 top-4 z-20 flex items-center justify-between">
                    {/* Desktop Navbar Pill Container */}
                    <div className="hidden md:flex items-center text-black rounded-full px-8 py-3.5 shadow-lg">
                        <div className="flex gap-10 text-xs tracking-wider font-semibold">
                            {navLinks.map((item) =>
                                item.isPage ? (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className="hover:opacity-70 transition-opacity uppercase cursor-pointer"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.name}
                                        href={`#${item.targetId}`}
                                        onClick={(e) => handleNavClick(e, item)}
                                        className="hover:opacity-70 transition-opacity uppercase cursor-pointer"
                                    >
                                        {item.name}
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none"
                        aria-label="Toggle Navigation"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Mobile Navigation Menu Dropdown */}
                    {isMenuOpen && (
                        <div className="absolute top-16 right-0 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 text-center md:hidden">
                            {navLinks.map((item) =>
                                item.isPage ? (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-base font-semibold tracking-wider py-2 hover:text-gray-300 cursor-pointer"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.name}
                                        href={`#${item.targetId}`}
                                        onClick={(e) => handleNavClick(e, item)}
                                        className="text-base font-semibold tracking-wider py-2 hover:text-gray-300 cursor-pointer"
                                    >
                                        {item.name}
                                    </a>
                                )
                            )}
                        </div>
                    )}
                </nav>
            </div>
        </div>
    )
}
