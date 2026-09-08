import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {

    return (
        <header className="sticky top-0 z-50  h-24 flex items-center justify-between py-3 px-[4%] sm:px-[5%] bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
            {/* Brand Logo & Admin Badge */}
            <div className="flex items-center gap-3">
                <img
                    src={assets.logo}
                    alt="Brand Logo"
                    className="w-24 sm:w-28 object-contain cursor-pointer"
                />
                <span className=" sm:inline-flex items-center text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200/80">
                    Admin Panel
                </span>
            </div>

            {/* Logout Action */}
            <button
                onClick={() => setToken && setToken('')}
                className="bg-gray-800 hover:bg-black text-white text-xs sm:text-sm font-medium px-5 sm:px-7 py-2 sm:py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
                Logout
            </button>
        </header>
    )
}

export default Navbar
