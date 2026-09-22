import React, { useState } from 'react';
import Footer from '../components/Footer'
import { ChevronDown, ArrowRight, Quote, PhoneCall, Mail, MapPin, Building, ShieldCheck, Award, HeartHandshake, Sparkles, Menu, X } from 'lucide-react';

export function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen text-[#222222] font-sans antialiased selection:bg-[#0096B4] selection:text-white">

        <section className="relative h-screen min-h-[600px] flex flex-col justify-between items-center text-center overflow-hidden">
          {/* Background Dark Rooftop Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop')`
            }}
          >
            {/* Subtle dark gradient overlay to ensure readable white hero title */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#101010]/90" />
          </div>

          {/* Hero Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] text-white font-serif mb-4">
              About AB ASSETS
            </h1>
            <p className="text-sm md:text-base tracking-[0.35em] text-cyan-200 uppercase font-light">
              redesigning lives
            </p>
          </div>

          {/* Floating Animated Scroll Mouse Icon */}
          <div className="relative z-10 mb-8 flex flex-col items-center animate-bounce opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
            <a href="#intro" className="p-2 border-2 border-white/40 rounded-full">
              <ChevronDown className="w-5 h-5 text-white" />
            </a>
          </div>
        </section>

        { }
        <section id="intro" className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 font-light tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas vitae gravida turpis.
            Libero scelerisque vivamus imperdiet. Augue nisl vestibulum tristique augue lacus in sed dui.
            Mauris velit.
          </p>
        </section>

        { }
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Modern Living Room Showcase Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
                  alt="Luxury Modern Interior"
                  className="w-full h-[450px] md:h-[550px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Key Statement & Description */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
              {/* Blue Accent Vertical Line + Bold Highlight */}
              <div className="flex items-start space-x-4">
                <div className="w-1.5 min-w-[6px] h-16 bg-[#00A8CC] rounded-full mt-1" />
                <p className="text-base md:text-lg font-medium text-gray-800 leading-snug tracking-wide">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue non vulputate pretium,
                  dignissim donec.
                </p>
              </div>

              {/* Paragraph Text Block */}
              <div className="space-y-4 text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue non vulputate pretium,
                  dignissim donec non. Habitasse integer in nunc nec pulvinar, viverra pellentesque id
                  tortor. Elementum mi quam aliquam nunc non mi amet pulvinar vulputate vel.
                </p>
                <p>
                  Viverra velit, quis dignissim feugiat. Nisl ac visual, donec fuisse pulvinar vel.
                </p>
              </div>

              {/* Outline Pill Action Button */}
              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center space-x-3 px-8 py-3 rounded-full border border-gray-400 hover:border-[#00A8CC] text-xs font-medium tracking-[0.2em] text-gray-800 uppercase hover:bg-[#00A8CC] hover:text-white transition-all duration-300 shadow-sm"
                >
                  <span>Get In Touch With Us</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        { }
        <section id="values" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          {/* Section Heading */}
          <div className="text-center mb-16 space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">
              OUR VALUES
            </h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 font-light tracking-tight max-w-2xl mx-auto">
              Our philosophy drives everything we do, it's our DNA.
            </p>
          </div>

          {/* 3 Columns Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {/* Excellence */}
            <div className="p-8 rounded-lg bg-[#F5F0E8]/50 border border-amber-950/5 hover:border-[#00A8CC]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00A8CC]/10 text-[#00A8CC] flex items-center justify-center mb-6">
                <Award size={22} />
              </div>
              <h4 className="text-lg md:text-xl font-serif tracking-wide text-gray-800 mb-3">
                Excellence
              </h4>
              <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">
                We strive for perfection in every architectural detail, delivering spaces that transcend expectations.
              </p>
            </div>

            {/* Integrity */}
            <div className="p-8 rounded-lg bg-[#F5F0E8]/50 border border-amber-950/5 hover:border-[#00A8CC]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00A8CC]/10 text-[#00A8CC] flex items-center justify-center mb-6">
                <ShieldCheck size={22} />
              </div>
              <h4 className="text-lg md:text-xl font-serif tracking-wide text-gray-800 mb-3">
                Integrity
              </h4>
              <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">
                Building trust through absolute transparency, uncompromised quality, and dependable commitments.
              </p>
            </div>

            {/* Innovation */}
            <div className="p-8 rounded-lg bg-[#F5F0E8]/50 border border-amber-950/5 hover:border-[#00A8CC]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00A8CC]/10 text-[#00A8CC] flex items-center justify-center mb-6">
                <Sparkles size={22} />
              </div>
              <h4 className="text-lg md:text-xl font-serif tracking-wide text-gray-800 mb-3">
                Innovation
              </h4>
              <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">
                Pioneering modern design philosophies that elevate urban living and define future standards.
              </p>
            </div>
          </div>
        </section>

        { }
        <section id="leadership" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Executive Portrait Left Side */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="relative max-w-sm w-full">
                {/* Blue Decorative Accent Lines behind/around photo */}
                <div className="absolute -top-4 -left-4 right-8 h-[2px] bg-[#00A8CC]" />
                <div className="absolute top-10 -left-6 w-[2px] h-48 bg-[#00A8CC]" />
                <div className="absolute bottom-16 -right-6 left-12 h-[2px] bg-[#00A8CC]" />

                {/* Main Executive Image Frame */}
                <div className="relative z-10 bg-gradient-to-b from-[#FAF7F2] to-[#EFEAE2] p-2 shadow-xl border border-gray-200 rounded-sm overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/d/1AQfoO9E4TfIHP7Xz9uoW_uR5XF0T2vnS"
                    className="w-full h-[380px] sm:h-[420px] object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Executive Caption Block */}
              <div className="mt-6 text-center lg:text-left">
                <h5 className="text-xs font-bold tracking-[0.25em] text-gray-800 uppercase">
                  MURSALIN AHMAD
                </h5>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">
                  MANAGING DIRECTOR
                </p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  AB ASSETS LIMITED
                </p>
              </div>
            </div>

            {/* Right Side: Quote Section */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quotation Marks Symbol */}
              <div className="text-[#00A8CC] text-6xl font-serif leading-none select-none">
                &ldquo;&ldquo;
              </div>

              {/* Primary Quote Statement */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug font-serif tracking-normal">
                Lorem ipsum dolor sit amet, consectetur. Nisl vulputate mus velit est amet, id.
                Arcu, sed aenean tortor pellentesque id dolor integer. Dictum dictum sit.
              </blockquote>

              {/* Supporting Paragraph */}
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide max-w-xl">
                Lorem ipsum dolor sit amet, consectetur. Nisl vulputate mus velit est amet, id.
                Arcu, sed aenean tortor pellentesque id dolor integer. Dictum dictum sit.
                Donec elementum, feugiat placerat vulputate. Augue vivamus, tristique egestas.
              </p>
            </div>

          </div>
        </section>

        { }
        <section id="vision" className="max-w-5xl mx-auto px-6 py-16 space-y-20">
          {/* Vision Block */}
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <h2 className="text-3xl md:text-4xl font-light font-serif text-gray-900 tracking-wide whitespace-nowrap">
                Vision
              </h2>
              <div className="w-full h-[1px] bg-gray-400/60" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide max-w-4xl">
              Lorem ipsum dolor sit amet, consectetur. Nisl vulputate mus velit est amet, id.
              Arcu, sed aenean tortor quisque sit id dolor integer. Dictum dictum sit.
            </p>
          </div>

          {/* Mission Block with Line Divider */}
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <h2 className="text-3xl md:text-4xl font-light font-serif text-gray-900 tracking-wide whitespace-nowrap">
                Mission
              </h2>
              <div className="w-full h-[1px] bg-gray-400/60" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide max-w-4xl">
              Lorem ipsum dolor sit amet, consectetur. Nisl vulputate mus velit est amet, id.
              Arcu, sed aenean tortor quisque sit id dolor integer. Dictum dictum sit.
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}


export default About