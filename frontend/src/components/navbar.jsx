import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import logo from "../assets/logo.png";
import menu from "../assets/menu_icon.png";
const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-md transition-all duration-150
   hover:bg-gray-100
   active:scale-95
   active:bg-gray-200
   ${isActive ? "text-black border-b-2 border-black" : "text-gray-600"}`;

const mobileNavLinkClass = ({ isActive }) =>
  `block px-4 py-3 rounded-md transition-all duration-150
   hover:bg-gray-100
   active:scale-95
   active:bg-gray-200
   ${isActive ? "text-black font-medium bg-gray-50" : "text-gray-600"}`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="relative bg-white text-black">
      <div className="flex justify-between items-center h-18 mx-4 sm:mx-8 md:mx-20 p-2">
        <img src={logo} alt="logo" className="w-24 sm:w-30 h-auto" />

        <ul className="hidden md:flex items-center justify-space-between gap-4">
          <NavLink to="/" className={navLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/collection" className={navLinkClass}>
            COLLECTION
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            ABOUT
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            CONTACT
          </NavLink>
        </ul>

        <ul className="flex items-center gap-4 sm:gap-6">
          <NavLink to="/search">
            <IoSearch size={26} />
          </NavLink>
          <NavLink to="/profile">
            <FaRegUser size={24} />
          </NavLink>
          <NavLink to="/cart">
            <GrCart size={24} />
          </NavLink>

          <button
            type="button"
            className="md:hidden p-1"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <img
              src={menu}
              alt="menu"
              className="h-5 w-auto"
            />
          </button>
        </ul>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 shadow-sm">
          <ul className="flex flex-col gap-1">
            <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu}>
              HOME
            </NavLink>
            <NavLink
              to="/collection"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              COLLECTION
            </NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMobileMenu}>
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
