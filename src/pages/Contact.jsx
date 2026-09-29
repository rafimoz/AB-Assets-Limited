import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, MessageSquare, Mail, Send, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Contact = () => {
    // Result message state
    const [result, setResult] = useState("");

    // Form state management
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        size: '',
        location: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending....");

        const dataToSend = new FormData(event.target);
        dataToSend.append("access_key", "4ec3e358-360d-47fa-9d48-f714505b2e47");

        // Ensure Web3Forms maps the email field correctly for reply-to
        dataToSend.append("email", formData.emailAddress);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: dataToSend
            });

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully");
                setIsSubmitted(true);

                // Clear state inputs
                setFormData({
                    fullName: '',
                    phoneNumber: '',
                    emailAddress: '',
                    message: ''
                });

                // Auto-reset success message back to form after 5 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    setResult("");
                }, 5000);
            } else {
                console.error("Submission error:", data);
                setResult(data.message || "Error submitting form");
                alert(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setResult("Network error");
            alert("Failed to submit form. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
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
                    src="https://abcl.com.bd/wp-content/uploads/2025/09/WhatsApp-Image-2025-08-28-at-2.23.17-PM-5.jpeg"
                    alt="Properties Hero"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end">
                    <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-7xl mx-auto px-6 sm:px-12 py-10 w-full text-white">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] text-white mb-4">
                            Contact Us
                        </h1>
                        <p className="text-sm md:text-base tracking-[0.35em] text-cyan-200 uppercase font-light">
                            Get in touch with us
                        </p>
                    </div>
                </div>
            </section>

            {/* ==========================================
                2. CONTACT INFO & GOOGLE MAP SECTION
            ========================================== */}
            <section className="w-full py-30 p-4 sm:p-6 md:p-8 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 min-h-95">
                    {/* Left: Contact Details */}
                    <div className="md:col-span-5 p-2 sm:p-4 md:p-8 flex flex-col justify-center space-y-6 bg-white">
                        {/* Address */}
                        <div className="flex items-start gap-4 group">
                            <div className="p-2.5 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
                                <MapPin className="w-5 h-5 shrink-0" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 leading-snug">
                                    AB Assets Limited
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-0.5">
                                    Level 5, House 26, Road 28, Block K, Banani, Dhaka-1213
                                </p>
                            </div>
                        </div>

                        {/* WhatsApp / Phone 2 */}
                        <div className="flex items-start gap-4 group">
                            <div className="p-2.5 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
                                <Phone className="w-5 h-5 shrink-0" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <a
                                    href="https://wa.me/8801335211163"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs sm:text-sm text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                >
                                    +8801335-211150
                                </a>
                                <a
                                    href="https://wa.me/8801335211163"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs sm:text-sm text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                >
                                    +8801335-211151
                                </a>
                                <a
                                    href="https://wa.me/8801335211163"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs sm:text-sm text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                >
                                    +8801335-211163
                                </a>
                                <a
                                    href="https://wa.me/8801335211163"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs sm:text-sm text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                >
                                    +8801810-035305
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 group">
                            <div className="p-2.5 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
                                <Mail className="w-5 h-5 shrink-0" />
                            </div>
                            <a
                                href="mailto:info@abassetsbd.com"
                                className="text-xs sm:text-sm text-gray-700 hover:text-amber-600 font-medium transition-colors"
                            >
                                info@abassets.bd
                            </a>
                        </div>
                    </div>
                    {/* Right: Embedded Google Map */}
                    <div className="md:col-span-7 w-full h-80 md:h-auto bg-gray-200 relative min-h-87.5">
                        <iframe
                            title="AB Assets Limited Office Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33121.2835227154!2d90.40684568663994!3d23.798454765559594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x800d3010b50e965%3A0x7015c488dd8ee94c!2sAB%20Assets%20Limited!5e1!3m2!1sen!2sbd!4v1786868208677!5m2!1sen!2sbd"
                            className="w-full h-full border-0 absolute inset-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. FLOATING CONTACT FORM SECTION
            ========================================== */}
            <section className="relative w-full mt-30 py-16 px-4 sm:px-6 md:px-12 overflow-hidden">
                {/* Subtle Geometric Background Pattern */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}
                />

                <div className="max-w-6xl mx-auto relative">
                    <div className="rounded-2xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">

                        {/* Form Left Image */}
                        <div className="md:col-span-6 relative min-h-65 md:min-h-120">
                            <img
                                src="https://abcl.com.bd/wp-content/uploads/2025/09/WhatsApp-Image-2025-08-28-at-2.23.17-PM-3.jpeg"
                                alt="Modern Office Meeting"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden" />
                        </div>

                        {/* Form Right Inputs */}
                        <div className="md:col-span-6 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6 uppercase">
                                CONTACT US
                            </h2>

                            {isSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center text-emerald-800 flex flex-col items-center gap-3 animate-fade-in">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                    <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
                                    <p className="text-xs sm:text-sm text-emerald-600">
                                        Thank you for contacting AB Assets Limited. Our representative will get back to you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} className=" space-y-8 rounded-none">
                                    {/* Full Name */}
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full bg-transparent px-0 py-2.5 text-base text-gray-700 border-b border-gray-400 focus:outline-none focus:border-gray-800 placeholder:text-gray-500 transition-colors"
                                        />
                                    </div>

                                    {/* Email Address */}
                                    <div>
                                        <input
                                            type="email"
                                            name="emailAddress"
                                            required
                                            value={formData.emailAddress}
                                            onChange={handleChange}
                                            placeholder="Your email"
                                            className="w-full bg-transparent px-0 py-2.5 text-base text-gray-700 border-b border-gray-400 focus:outline-none focus:border-gray-800 placeholder:text-gray-500 transition-colors"
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            required
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            className="w-full bg-transparent px-0 py-2.5 text-base text-gray-700 border-b border-gray-400 focus:outline-none focus:border-gray-800 placeholder:text-gray-500 transition-colors"
                                        />
                                    </div>

                                    {/* Preferred Size */}
                                    <div>
                                        <input
                                            type="text"
                                            name="size"
                                            required
                                            value={formData.size}
                                            onChange={handleChange}
                                            placeholder="Preferred size in sqft"
                                            className="w-full bg-transparent px-0 py-2.5 text-base text-gray-700 border-b border-gray-400 focus:outline-none focus:border-gray-800 placeholder:text-gray-500 transition-colors"
                                        />
                                    </div>

                                    {/* Preferred Location */}
                                    <div>
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Your preferred location"
                                            className="w-full bg-transparent px-0 py-2.5 text-base text-gray-700 border-b border-gray-400 focus:outline-none focus:border-gray-800 placeholder:text-gray-500 transition-colors"
                                        />
                                    </div>

                                    {/* Your Message */}
                                    <div>
                                        <textarea
                                            name="message"
                                            rows="2"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Your Message"
                                            className="w-full bg-transparent px-0 py-2.5 text-base text-gray-700 border-b border-gray-400 focus:outline-none focus:border-gray-800 placeholder:text-gray-500 transition-colors"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3.5 border border-gray-900 text-gray-900 font-medium text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <span>Sending...</span>
                                            ) : (
                                                <>
                                                    <span>Submit</span>
                                                    <Send className="w-3.5 h-3.5" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;