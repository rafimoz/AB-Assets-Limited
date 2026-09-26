import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, MessageSquare, Mail, Send, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer'

const Contact = () => {
    // Form state management
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
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
        setResult("Sending....");
        const formData = new FormData(event.target);
        formData.append("access_key", "4ec3e358-360d-47fa-9d48-f714505b2e47");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            setResult("Error");
        }
    };

    return (
        <>
            <section className="relative h-screen min-h-[400px] flex flex-col justify-between items-center text-center overflow-hidden">
                {/* Background Dark Rooftop Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                    style={{
                        backgroundImage: `url('https://abcl.com.bd/wp-content/uploads/2025/09/WhatsApp-Image-2025-08-28-at-2.23.17-PM-5.jpeg')`
                    }}
                >
                    {/* Subtle dark gradient overlay to ensure readable white hero title */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#101010]/90" />
                </div>

                {/* Hero Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-20">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] text-white mb-4">
                        Contact Us
                    </h1>
                    <p className="text-sm md:text-base tracking-[0.35em] text-cyan-200 uppercase font-light">
                        Get in touch with us
                    </p>
                </div>

                {/* Floating Animated Scroll Mouse Icon */}
                <div className="relative z-10 mb-8 flex flex-col items-center animate-bounce opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                    <a href="#intro" className="p-2 border-2 border-white/40 rounded-full">
                        <ChevronDown className="w-5 h-5 text-white" />
                    </a>
                </div>
            </section>

            {/* ==========================================
                2. CONTACT INFO & GOOGLE MAP SECTION
            ========================================== */}
            <section className="w-full py-30 px-4 sm:px-6 md:px-12 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
                    {/* Left: Contact Details */}
                    <div className="md:col-span-5 p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6 bg-white">
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
                    {/* Right: Embedded Google Map */}
                    <div className="md:col-span-7 w-full h-[320px] md:h-auto bg-gray-200 relative min-h-[350px]">
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

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="rounded-2xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12">

                        {/* Form Left Image */}
                        <div className="md:col-span-6 relative min-h-[260px] md:min-h-[480px]">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
                                alt="Modern Office Meeting"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                        </div>

                        {/* Form Right Inputs */}
                        <div className="md:col-span-6 p-8 sm:p-10 md:p-12 flex flex-col justify-center">
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
                                <form onSubmit={onSubmit} className="space-y-4">
                                    {/* Full Name */}

                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name*"
                                            className="w-full px-4 py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
                                            placeholder="Phone Number*"
                                            className="w-full px-4 py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
                                            placeholder="Email Address*"
                                            className="w-full px-4 py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Message*"
                                            className="w-full px-4 py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full a px-8 py-3 border border-gray-800 text-gray-900 font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
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
    )
}

export default Contact