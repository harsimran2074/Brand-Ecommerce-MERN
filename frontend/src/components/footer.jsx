import React from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

const Footer = () => {
   return (
      <footer className="bg-gray-200 text-gray-700">
         <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div className="space-y-4">
                  <img src={logo} alt="Brand logo" className="h-10" />
                  <p className="text-sm text-gray-600 max-w-sm">We design modern T-shirts inspired by roots and culture. Quality materials, thoughtful design, and responsible production.</p>
               </div>

               <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                     <li><NavLink to="/" className="text-gray-600 hover:underline">Home</NavLink></li>
                     <li><NavLink to="/collection" className="text-gray-600 hover:underline">Collection</NavLink></li>
                     <li><NavLink to="/about" className="text-gray-600 hover:underline">About</NavLink></li>
                     <li><NavLink to="/contact" className="text-gray-600 hover:underline">Contact</NavLink></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Customer Support</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                     <li>Shipping & Delivery</li>
                     <li>Returns & Refunds</li>
                     <li>FAQs</li>
                     <li>Terms & Conditions</li>
                     <li>Privacy Policy</li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                     <li><a href="#" className="hover:underline">Instagram</a></li>
                     <li><a href="#" className="hover:underline">Twitter</a></li>
                     <li><a href="#" className="hover:underline">Facebook</a></li>
                  </ul>
               </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-5 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
               <div>© {new Date().getFullYear()} Brand Name. All rights reserved.</div>
               <div className="text-gray-500">Made with care • Privacy & Terms</div>
            </div>
         </div>
      </footer>
   )
}

export default Footer