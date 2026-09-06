import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import {
  FiUser,
  FiPackage,
  FiShoppingBag,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiHelpCircle,
  FiChevronRight,
  FiCheckCircle
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../redux/slices";
import logo from "../assets/logo.png";
import menu from "../assets/menu_icon.png";
import cartIcon from "../assets/cart_icon.png";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-md transition-all duration-150
   hover:bg-gray-100
   active:scale-95
   active:bg-gray-200
   ${isActive ? "text-black border-b-2 border-black font-semibold" : "text-gray-600 font-medium"}`;

const mobileNavLinkClass = ({ isActive }) =>
  `block px-4 py-3 rounded-lg transition-all duration-150
   hover:bg-gray-100
   active:scale-95
   active:bg-gray-200
   ${isActive ? "text-black font-semibold bg-gray-100" : "text-gray-600 font-medium"}`;

const Navbar = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(
    (store) => store.bagItemSlice?.cartData || {}
  );

  const bagItemsLength = Object.values(cartData).reduce(
    (total, sizes) => {
      if (typeof sizes === "object" && sizes !== null) {
        return (
          total +
          Object.values(sizes).reduce(
            (sum, quantity) => sum + (Number(quantity) || 0),
            0
          )
        );
      }
      return total;
    },
    0
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync authentication state from localStorage
  const syncAuthState = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(Boolean(token));
  };

  useEffect(() => {
    syncAuthState();
  }, [location.pathname]);

  // Handle outside click and escape key to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearCart());
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
    toast.success("Logged out successfully");
    navigate("/Login");
  };


  return (
    <nav className="relative  bg-white text-black border-b border-gray-200 pb-3 md:mx-15 mb-7 sticky top-0 z-40 backdrop-blur-md bg-white/95 transition-all">
      <div className="flex justify-between items-center h-18 mx-4 sm:mx-3 md:mx-20 p-2">
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="w-28 sm:w-32 h-auto -ml-4 pl-2 pt-2 transition-transform hover:scale-105 duration-200"
          onClick={() => setProfileDropdownOpen(false)}
        >
          <img src={logo} alt="brand logo" className="object-contain" />
        </NavLink>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-4">
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

        {/* Action Icons (Profile, Cart, Mobile Menu) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Profile Dropdown Container */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              id="profile-menu-button"
              aria-expanded={profileDropdownOpen}
              aria-haspopup="true"
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer relative outline-none focus:ring-2 focus:ring-gray-300 ${profileDropdownOpen
                ? "bg-gray-100 text-black shadow-inner"
                : "text-gray-700 hover:text-black hover:bg-gray-100/80 active:scale-95"
                }`}
              title="Account & Profile"
            >
              <FaRegUser className="text-lg sm:text-xl" />
              {isLoggedIn && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div
                className="absolute -right-14 sm:-right-4 md:right-0 top-full mt-3 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-black/5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="profile-menu-button"
              >
                {/* Header Section */}
                <div className="p-4 bg-gradient-to-br from-gray-50 via-gray-100/60 to-white border-b border-gray-100">
                  {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white flex items-center justify-center font-semibold text-lg shadow-md">
                        <FiUser />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            My Account
                          </p>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            <FiCheckCircle className="w-2.5 h-2.5" />
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          Welcome back to your dashboard
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            Welcome, Guest! 👋
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Sign in to manage orders & checkout
                          </p>
                        </div>
                      </div>

                      {/* Quick Sign In / Sign Up Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-3.5">
                        <NavLink
                          to="/Login"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-sm transition-all duration-150 active:scale-95"
                        >
                          <FiLogIn className="text-xs" />
                          Sign In
                        </NavLink>
                        <NavLink
                          to="/SignUp"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-xs font-semibold py-2 px-3 rounded-lg shadow-2xs transition-all duration-150 active:scale-95"
                        >
                          <FiUserPlus className="text-xs" />
                          Register
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dropdown Navigation Links */}
                <div className="p-2 flex flex-col gap-0.5 text-sm text-gray-700 font-medium">
                  {isLoggedIn && (
                    <NavLink
                      to="/Login"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-100/80 hover:text-black transition-all duration-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-black group-hover:text-white transition-colors duration-150">
                          <FiUser className="text-base" />
                        </div>
                        <span>Personal Profile</span>
                      </div>
                      <FiChevronRight className="text-gray-400 group-hover:translate-x-0.5 transition-transform duration-150" />
                    </NavLink>
                  )}

                  <NavLink
                    to="/order"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-100/80 hover:text-black transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-black group-hover:text-white transition-colors duration-150">
                        <FiPackage className="text-base" />
                      </div>
                      <div className="flex flex-col">
                        <span>My Orders</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md group-hover:bg-black group-hover:text-white transition-colors">
                      Track
                    </span>
                  </NavLink>

                  <NavLink
                    to="/cart"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-100/80 hover:text-black transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-black group-hover:text-white transition-colors duration-150">
                        <FiShoppingBag className="text-base" />
                      </div>
                      <span>Shopping Cart</span>
                    </div>
                    {bagItemsLength > 0 && (
                      <span className="text-[11px] font-bold text-white bg-black px-2 py-0.5 rounded-full">
                        {bagItemsLength} {bagItemsLength === 1 ? "item" : "items"}
                      </span>
                    )}
                  </NavLink>

                  <NavLink
                    to="/contact"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-gray-100/80 hover:text-black transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-black group-hover:text-white transition-colors duration-150">
                        <FiHelpCircle className="text-base" />
                      </div>
                      <span>Help & Support</span>
                    </div>
                    <FiChevronRight className="text-gray-400 group-hover:translate-x-0.5 transition-transform duration-150" />
                  </NavLink>
                </div>

                {/* Logout Action (Logged-in only) */}
                {isLoggedIn && (
                  <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-150 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-100/70 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-150">
                          <FiLogOut className="text-base" />
                        </div>
                        <span>Log Out</span>
                      </div>
                      <span className="text-xs text-red-400 font-normal">
                        End session
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon & Badge */}
          <NavLink
            to="/cart"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative group flex items-center justify-center"
            onClick={() => setProfileDropdownOpen(false)}
          >
            <div className="relative">
              <img
                src={cartIcon}
                alt="Cart"
                className="w-5 sm:w-6 transition-transform group-hover:scale-110 duration-200"
              />
              <span
                className="absolute -top-2 -right-2.5
                     bg-black text-white
                     text-[10px] font-bold
                     w-4.5 h-4.5 rounded-full
                     flex items-center justify-center border-2 border-white shadow-xs"
              >
                {bagItemsLength}
              </span>
            </div>
          </NavLink>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Toggle menu"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setProfileDropdownOpen(false);
            }}
          >
            {mobileMenuOpen ? (
              <IoClose className="text-2xl text-gray-800" />
            ) : (
              <img src={menu} alt="menu" className="h-5 w-auto" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/98 backdrop-blur-md px-4 py-4 shadow-lg rounded-b-2xl animate-in slide-in-from-top duration-200">
          <ul className="flex flex-col gap-1.5">
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

