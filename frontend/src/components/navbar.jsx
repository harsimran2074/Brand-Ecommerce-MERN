import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import logo from "../assets/logo.png";
import menu from "../assets/menu_icon.png";
import cartIcon from "../assets/cart_icon.png";
import Search from "./search";
import { useSelector } from "react-redux";
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
  const bagItems = useSelector((store) => store.bagItemSlice);
  const bagItemsLength = bagItems.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="relative bg-white text-black border-b  border-gray-300 pb-3 md:mx-15 mb-7">
      <div className="flex justify-between items-center h-18 mx-4 sm:mx-3 md:mx-20 p-2">
        <img
          src={logo}
          alt="logo"
          className="w-27 sm:w-28 h-auto  -ml-8 pl-4 pt-4"
        />

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
          <NavLink to="/Login">
            <FaRegUser size={24} />
          </NavLink>
          <NavLink to="/cart">
 <div className="relative">
            <img src={cartIcon} className="w-6" />

            <span
              className="absolute -top-2 -right-2
                     bg-red-500 text-white
                     text-[10px] font-bold
                     w-4 h-4 rounded-full
                     flex items-center justify-center"
            >
              {bagItemsLength}
            </span>
          </div>
          </NavLink>
         

          <button
            type="button"
            className="md:hidden p-1"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <img src={menu} alt="menu" className="h-5 w-auto" />
          </button>
        </ul>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 shadow-sm">
          <ul className="flex flex-col gap-1">
            <NavLink
              to="/"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              HOME
            </NavLink>
            <NavLink
              to="/collection"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              COLLECTION
            </NavLink>
            <NavLink
              to="/about"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
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
