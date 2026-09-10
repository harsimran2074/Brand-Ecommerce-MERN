import React from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { FiPhone, FiMail, FiArrowRight, FiShield } from 'react-icons/fi'
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'

const Footer = () => {
   const configuredAdminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5173";
   const ADMINUrl = /^https?:\/\//i.test(configuredAdminUrl)
      ? configuredAdminUrl
      : `https://${configuredAdminUrl}`;
   const adminUrl = `${ADMINUrl.replace(/\/$/, '')}/?login=true`;
   return (
      <footer className="bg-slate-100 border-t border-slate-300/80 text-slate-900 font-sans">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

            {/* Main 4-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-300/80">

               {/* Col 1: Brand Info (4 cols) */}
               <div className="lg:col-span-4 space-y-4">
                  <NavLink to="/">
                     <img
                        src={logo}
                        alt="Brand logo"
                        className="h-25 w-auto object-contain"
                     />
                  </NavLink>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
                     We craft modern apparel inspired by cultural roots and authentic identity. Uncompromising fabric quality, thoughtful design, and everyday comfort.
                  </p>
                  <div className="pt-1 space-y-1.5 text-xs text-slate-700">

                     <p className="flex items-center gap-2">
                        <FiMail className="text-slate-900" />
                        <a href="mailto:harsimran2074handa@gmail.com" className="hover:text-black font-semibold transition">harsimran2074handa@gmail.com</a>
                     </p>
                  </div>
               </div>

               {/* Col 2: Quick Links (2 cols) */}
               <div className="lg:col-span-2 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                     Quick Links
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                     <li><NavLink to="/" className="hover:text-black font-medium transition">Home</NavLink></li>
                     <li><NavLink to="/collection" className="hover:text-black font-medium transition">Collection</NavLink></li>
                     <li><NavLink to="/about" className="hover:text-black font-medium transition">About Us</NavLink></li>
                     <li><NavLink to="/contact" className="hover:text-black font-medium transition">Contact Us</NavLink></li>
                     <li>
                        <a
                           href={adminUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group inline-flex items-center gap-2 font-medium text-slate-800 hover:text-black transition pt-1"
                        >
                           <div className="flex items-center justify-center w-5 h-5 rounded-md bg-slate-900 text-white text-[10px] group-hover:scale-105 transition-transform shadow-2xs">
                              <FiShield className="w-3 h-3" />
                           </div>
                           <span>Admin Console</span>
                           <span className="text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              Login
                           </span>
                        </a>
                     </li>
                  </ul>
               </div>

               {/* Col 3: Customer Care (3 cols) */}
               <div className="lg:col-span-3 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                     Customer Care
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                     <li><span className="hover:text-black transition cursor-pointer">Shipping & Delivery</span></li>
                     <li><span className="hover:text-black transition cursor-pointer">7-Day Easy Returns</span></li>
                     <li><span className="hover:text-black transition cursor-pointer">Track Your Order</span></li>
                     <li><span className="hover:text-black transition cursor-pointer">Privacy Policy</span></li>
                     <li><span className="hover:text-black transition cursor-pointer">Terms & Conditions</span></li>
                  </ul>
               </div>

               {/* Col 4: Newsletter & Socials (3 cols) */}
               <div className="lg:col-span-3 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                     Stay Connected
                  </h4>
                  <p className="text-xs text-slate-600">
                     Subscribe to get special offers, free giveaways, and new drop alerts.
                  </p>

                  <form onSubmit={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5 pt-1">
                     <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-black transition shadow-2xs"
                     />
                     <button
                        type="submit"
                        className="p-2.5 rounded-xl bg-slate-900 hover:bg-black text-white transition shrink-0 cursor-pointer shadow-2xs"
                     >
                        <FiArrowRight className="w-4 h-4" />
                     </button>
                  </form>

                  <div className="flex items-center gap-3 pt-2">
                     <a
                        href="https://www.instagram.com/kamboj_biradari/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:text-black hover:border-slate-500 shadow-2xs transition"
                     >
                        <FaInstagram className="w-4 h-4" />
                     </a>
                     <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:text-black hover:border-slate-500 shadow-2xs transition"
                     >
                        <FaFacebookF className="w-3.5 h-3.5" />
                     </a>
                     <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:text-black hover:border-slate-500 shadow-2xs transition"
                     >
                        <FaTwitter className="w-3.5 h-3.5" />
                     </a>
                  </div>
               </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5">
                  <p>© {new Date().getFullYear()} FOREVER. All rights reserved.</p>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <a
                     href={adminUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-black shadow-sm transition-all duration-200 active:scale-95 border border-slate-800 hover:shadow-md hover:ring-2 hover:ring-slate-900/10 cursor-pointer"
                     title="Open Admin Login Portal"
                  >
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </span>
                     <FiShield className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" />
                     <span>Admin Login</span>
                     <FiArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
               </div>
               <div className="flex items-center gap-4 text-slate-600 font-medium">
                  <span>🔒 256-Bit SSL Encrypted</span>
                  <span>•</span>
                  <span>Razorpay & COD Verified</span>
               </div>
            </div>

         </div>
      </footer>
   )
}

export default Footer