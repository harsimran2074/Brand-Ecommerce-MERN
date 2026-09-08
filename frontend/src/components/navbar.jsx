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
  FiCheckCircle,
} from "react-icons/fi";
import { IoClose, IoSparkles } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../redux/slices";
import logo from "../assets/logo.png";
import cartIcon from "../assets/cart_icon.png";

const navLinkClass = ({ isActive }) =>
  `relative px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-250 rounded-full group ${isActive
    ? "text-slate-950 font-bold bg-slate-100/90 shadow-2xs"
    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
  }`;

const mobileNavLinkClass = ({ isActive }) =>
  `flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${isActive
    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md shadow-slate-900/10"
    : "text-slate-700 hover:bg-slate-100/80 active:bg-slate-200"
  }`;

const Navbar = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((store) => store.bagItemSlice?.cartData || {});

  const bagItemsLength = Object.values(cartData).reduce((total, sizes) => {
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
  }, 0);

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
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Fancy Top Micro Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-neutral-900 to-slate-950 text-white border-b border-white/5 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-medium tracking-widest uppercase">
          <div className="hidden sm:flex items-center gap-1.5 text-amber-300/90 font-semibold">
            <IoSparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Luxury Apparel Experience</span>
          </div>

          <p className="mx-auto text-slate-300 sm:mx-0 flex items-center gap-2">
            <span>Complimentary Express Shipping On Orders Over ₹999</span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-amber-200/90 font-semibold">100% Authentic Guarantee</span>
          </p>

          <div className="hidden lg:flex items-center gap-4 text-slate-400">
            <NavLink to="/contact" className="hover:text-white transition-colors">
              Support 24/7
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Glassmorphism Navigation Bar */}
      <nav className="w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="mx-auto flex h-18 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo with subtle glow effect */}
          <NavLink
            to="/"
            className="group flex items-center transition-all duration-300 hover:scale-[1.02] active:scale-95"
            onClick={() => setProfileDropdownOpen(false)}
          >
            <div className="relative">
              <img
                src={logo}
                alt="Brand Logo"
                className="h-20 md:h-20 w-auto object-contain transition-all duration-300 group-hover:brightness-105"
              />
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-2 md:flex lg:gap-3.5">
            <NavLink to="/" className={navLinkClass}>
              <span className="relative z-10">Home</span>
            </NavLink>

            <NavLink to="/collection" className={navLinkClass}>
              <span className="relative z-10 flex items-center gap-1.5">
                Collection
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-2xs">
                  New
                </span>
              </span>
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              <span className="relative z-10">About</span>
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              <span className="relative z-10">Contact</span>
            </NavLink>
          </ul>

          {/* Action Icons (Profile, Cart, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Profile Dropdown Container */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                id="profile-menu-button"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className={`relative flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full border transition-all duration-250 md:h-9.5 md:w-9.5 ${profileDropdownOpen
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20 ring-2 ring-slate-900/10"
                  : "border-slate-200/90 bg-white/90 text-slate-700 shadow-2xs hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow-sm active:scale-95"
                  }`}
                title="Account & Profile"
              >
                <FaRegUser className="text-xs md:text-sm transition-transform duration-200" />
                {isLoggedIn && !profileDropdownOpen && (
                  <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-1.5 ring-white"></span>
                  </span>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-3 w-76 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-100 bg-white/98 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] backdrop-blur-2xl ring-1 ring-black/5 sm:w-84 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="profile-menu-button"
                >
                  {/* Header Section */}
                  <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 via-slate-100/60 to-white p-4.5">
                    {isLoggedIn ? (
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-700 text-lg font-semibold text-white shadow-md shadow-slate-900/20 ring-2 ring-slate-200">
                          <FiUser />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-sm font-bold text-slate-900">
                              My Account
                            </p>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/80">
                              <FiCheckCircle className="h-2.5 w-2.5" />
                              Active
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            Welcome to your dashboard
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            Welcome, Guest! 👋
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Sign in to manage orders & express checkout
                          </p>
                        </div>

                        {/* Quick Sign In / Sign Up Buttons */}
                        <div className="mt-3.5 grid grid-cols-2 gap-2">
                          <NavLink
                            to="/Login"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-slate-950 to-slate-800 py-2.5 px-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:from-black hover:to-slate-900 active:scale-95"
                          >
                            <FiLogIn className="text-xs" />
                            Sign In
                          </NavLink>
                          <NavLink
                            to="/SignUp"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200/90 bg-white py-2.5 px-3 text-xs font-semibold text-slate-800 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95"
                          >
                            <FiUserPlus className="text-xs" />
                            Register
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Navigation Links */}
                  <div className="flex flex-col gap-0.5 p-2 text-sm font-medium text-slate-700">
                    {isLoggedIn && (
                      <NavLink
                        to="/Login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 hover:bg-slate-100/80 hover:text-slate-950"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-700 transition-colors duration-150 group-hover:bg-slate-900 group-hover:text-white">
                            <FiUser className="text-base" />
                          </div>
                          <span>Personal Profile</span>
                        </div>
                        <FiChevronRight className="text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </NavLink>
                    )}

                    <NavLink
                      to="/order"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 hover:bg-slate-100/80 hover:text-slate-950"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-100 p-2 text-slate-700 transition-colors duration-150 group-hover:bg-slate-900 group-hover:text-white">
                          <FiPackage className="text-base" />
                        </div>
                        <div className="flex flex-col">
                          <span>My Orders</span>
                        </div>
                      </div>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                        Track
                      </span>
                    </NavLink>

                    <NavLink
                      to="/cart"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 hover:bg-slate-100/80 hover:text-slate-950"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-100 p-2 text-slate-700 transition-colors duration-150 group-hover:bg-slate-900 group-hover:text-white">
                          <FiShoppingBag className="text-base" />
                        </div>
                        <span>Shopping Cart</span>
                      </div>
                      {bagItemsLength > 0 && (
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-white shadow-2xs">
                          {bagItemsLength} {bagItemsLength === 1 ? "item" : "items"}
                        </span>
                      )}
                    </NavLink>

                    <NavLink
                      to="/contact"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150 hover:bg-slate-100/80 hover:text-slate-950"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-100 p-2 text-slate-700 transition-colors duration-150 group-hover:bg-slate-900 group-hover:text-white">
                          <FiHelpCircle className="text-base" />
                        </div>
                        <span>Help & Support</span>
                      </div>
                      <FiChevronRight className="text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </NavLink>
                  </div>

                  {/* Logout Action (Logged-in only) */}
                  {isLoggedIn && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="group flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-600 transition-all duration-150 hover:bg-rose-50 hover:text-rose-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-rose-100/80 p-2 text-rose-600 transition-colors duration-150 group-hover:bg-rose-600 group-hover:text-white">
                            <FiLogOut className="text-base" />
                          </div>
                          <span>Log Out</span>
                        </div>
                        <span className="text-xs font-normal text-rose-400">
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
              className="group relative flex h-8.5 w-8.5 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-700 shadow-2xs transition-all duration-250 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow-sm active:scale-95 md:h-9.5 md:w-9.5"
              onClick={() => setProfileDropdownOpen(false)}
              title="Shopping Cart"
            >
              <img
                src={cartIcon}
                alt="Cart"
                className="h-4 w-4 object-contain transition-transform duration-250 group-hover:scale-110 md:h-4.5 md:w-4.5"
              />
              {bagItemsLength > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gradient-to-tr from-slate-950 to-slate-800 px-1 text-[10px] font-bold text-white shadow-md ring-1.5 ring-white transition-transform duration-200 group-hover:scale-110">
                  {bagItemsLength}
                </span>
              )}
            </NavLink>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 md:hidden"
              aria-label="Toggle menu"
              onClick={() => {
                setMobileMenuOpen((open) => !open);
                setProfileDropdownOpen(false);
              }}
            >
              {mobileMenuOpen ? (
                <IoClose className="text-lg text-slate-900" />
              ) : (
                <HiOutlineMenuAlt3 className="text-lg text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white/98 px-4 py-5 shadow-2xl backdrop-blur-2xl md:hidden animate-in slide-in-from-top duration-200">
            <ul className="flex flex-col gap-2">
              <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                <span>Home</span>
                <FiChevronRight className="text-xs opacity-60" />
              </NavLink>
              <NavLink
                to="/collection"
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
              >
                <div className="flex items-center gap-2">
                  <span>Collection</span>
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-extrabold uppercase text-white">
                    New
                  </span>
                </div>
                <FiChevronRight className="text-xs opacity-60" />
              </NavLink>
              <NavLink
                to="/about"
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
              >
                <span>About Us</span>
                <FiChevronRight className="text-xs opacity-60" />
              </NavLink>
              <NavLink
                to="/contact"
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
              >
                <span>Contact Us</span>
                <FiChevronRight className="text-xs opacity-60" />
              </NavLink>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

