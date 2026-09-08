import React from "react";
import { NavLink } from "react-router-dom";
import about_img from "../assets/about_img.png";
import Footer from "../components/footer";
import { FiAward, FiTruck, FiHeadphones, FiArrowRight } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-800 antialiased font-sans">
      
      {/* Dark Contrast Hero Header */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold tracking-wider uppercase shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Our Heritage & Craftsmanship
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            ABOUT US <span className="text-indigo-400 font-light">___</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Proud of where we come from. Dedicated to creating modern apparel infused with cultural identity, authenticity, and premium craftsmanship.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
        
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Image with Dark Contrast Frame */}
          <div className="lg:col-span-5 relative group">
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              <img
                src={about_img}
                alt="About our brand"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
              />
            </div>
            {/* Dark Floating Badge */}
            <div className="absolute -bottom-4 -right-4 hidden sm:flex bg-slate-950 text-white border border-slate-800 px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold items-center gap-2">
              <span className="text-indigo-400">✦</span> Authentic Lifestyle Brand
            </div>
          </div>

          {/* Right Story Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                Our Journey
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Clothing Beyond Fashion — It's Identity & Pride
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We started with a simple vision: clothing can be more than just everyday fashion—it can be a powerful way to express who you are and where you come from. Our apparel is deeply inspired by Kamboj culture, identity, and the timeless pride that connects our community.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We wanted to create pieces that today’s youth can wear effortlessly every day while carrying an authentic connection to their roots. From meaningful cultural graphic prints to relaxed modern streetwear silhouettes, every garment is tailored for supreme comfort, durability, and bold self-expression.
            </p>

            {/* Dark Contrast Metrics Card */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-xl">
              <div className="border-r border-slate-800 pr-2">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white">100%</span>
                <span className="text-xs text-slate-400 font-medium">Pure Cotton</span>
              </div>
              <div className="border-r border-slate-800 pr-2">
                <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-400">10k+</span>
                <span className="text-xs text-slate-400 font-medium">Community</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">4.9 ★</span>
                <span className="text-xs text-slate-400 font-medium">Satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Dark Luxury Cards */}
        <section className="space-y-8">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
              The Brand Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Why Choose Us <span className="text-slate-300 font-light">___</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl mt-1.5">
              Uncompromising fabric quality, thoughtful designs, and world-class customer fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                <FiAward className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">
                Quality Assurance
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We handpick and rigorously test all fabrics for exceptional breathability, softness, durable stitching, and lasting color fastness.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                <FiTruck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">
                Fast & Secure Delivery
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Seamless doorstep shipping with real-time parcel tracking, safe encrypted transactions, and an easy 7-day return policy.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                <FiHeadphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">
                Dedicated Support
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our support team is always available to assist with order tracking, sizing guidance, and prompt inquiries whenever you need help.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner with Rich Dark Background */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              Exclusive Collection
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Ready to Upgrade Your Everyday Style?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Discover our latest catalog of premium tops, t-shirts, jackets, and cultural streetwear essentials.
            </p>
            <div className="pt-2">
              <NavLink
                to="/collection"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-indigo-500 transition-all active:scale-[0.99] text-sm shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <span>Explore Collection</span>
                <FiArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
