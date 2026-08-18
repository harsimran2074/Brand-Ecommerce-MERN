import React from 'react'

import { FaInstagramSquare } from "react-icons/fa";

import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const FollowUs = () => {
  return (
   <section className="max-w-3xl mx-auto px-4 py-12 text-center">
  <h2 className="text-3xl font-bold text-gray-900 mb-2">
    Follow Us
  </h2>

  <p className="text-gray-600 mb-6">
    Follow us on social media for new drops, updates, and the latest from our community.
  </p>

  <div className="flex justify-center items-center gap-6">
    <a
      href="https://instagram.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-700 hover:text-black transition"
    >
     <FaInstagramSquare size={60}/> 
    </a>

    <a
      href="https://facebook.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-700 hover:text-black transition"
    ><FaFacebook size={60}/>
    </a>

    <a
      href="https://twitter.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-700 hover:text-black transition"
    >
     <FaTwitterSquare size={60}/>
    </a>
  </div>
</section>
  )
}

export default FollowUs