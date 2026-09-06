import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/footer";
import { assets } from "../assets/assets";

// SVG Badges & Icons
const GooglePayIcon = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9 inline-block" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z" />
    <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.7 15.6 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
    <path fill="#FBBC05" d="M24 44c5.2 0 9.9-2 13.4-5.3l-6.2-5.1C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.4 16.2 44 24 44z" />
    <path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.1c-.4.4 6.2-4.5 6.2-14.7 0-1.2-.1-2.3-.4-3.5z" />
  </svg>
);

const PhonePeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 inline-block" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#5f259f" />
    <path d="M54.5 24h-12c-1.1 0-2 .9-2 2v48c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V56h2.5c10.2 0 17.5-6.8 17.5-16s-7.3-16-17.5-16zm.5 22h-3V34h3c4.1 0 7.5 2.5 7.5 6s-3.4 6-7.5 6z" fill="#ffffff" />
    <path d="M37 34h30v7H37z" fill="#ffffff" />
    <path d="M37 44h18v7H37z" fill="#ffffff" />
    <path d="M57 52l14 22h-10l-9-15 5-7z" fill="#ffffff" />
  </svg>
);

const PaytmIcon = () => (
  <svg viewBox="0 0 120 40" className="w-14 h-6 inline-block" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="6" fill="#002970" />
    <text x="10" y="27" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fill="#00b9f5">Pay</text>
    <text x="56" y="27" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fill="#ffffff">tm</text>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 60 38" className="w-11 h-7 inline-block rounded shadow-xs" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="38" rx="4" fill="#0B1A80" />
    <text x="7" y="26" fontFamily="Helvetica, Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="20" fill="#ffffff" letterSpacing="1">VISA</text>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 60 38" className="w-11 h-7 inline-block rounded shadow-xs" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="38" rx="4" fill="#222222" />
    <circle cx="23" cy="19" r="12" fill="#EB001B" />
    <circle cx="37" cy="19" r="12" fill="#F79E1B" fillOpacity="0.9" />
    <path d="M30 10.4a12 12 0 0 1 0 17.2 12 12 0 0 1 0-17.2z" fill="#FF5F00" />
  </svg>
);

const RuPayIcon = () => (
  <svg viewBox="0 0 75 38" className="w-13 h-7 inline-block rounded shadow-xs" xmlns="http://www.w3.org/2000/svg">
    <rect width="75" height="38" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="7" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="17" fill="#092B75">Ru</text>
    <text x="35" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="17" fill="#00A344">Pay</text>
    <polygon points="64,12 70,19 64,26" fill="#F37021" />
  </svg>
);

const UpiIcon = () => (
  <svg viewBox="0 0 60 30" className="w-11 h-6 inline-block" xmlns="http://www.w3.org/2000/svg">
    <text x="3" y="21" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" fill="#0f766e" letterSpacing="0.5">UPI</text>
    <polygon points="44,8 54,15 44,22" fill="#00A344" />
    <polygon points="36,8 46,15 36,22" fill="#F37021" />
  </svg>
);

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: "",
  });

  // Payment Selection State
  // Main Category: 'upi' | 'card' | 'cod' | 'razorpay' | 'stripe'
  const [paymentCategory, setPaymentCategory] = useState("upi");
  // Sub Category for UPI: 'gpay' | 'phonepe' | 'paytm' | 'vpa'
  const [upiSubMethod, setUpiSubMethod] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  // Sub Category for Card: 'visa' | 'mastercard' | 'rupay'
  const [selectedCardNetwork, setSelectedCardNetwork] = useState("visa");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      // Allow only numbers, format as XXXX XXXX XXXX XXXX
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (name === "expiry") {
      // Format as MM/YY
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      if (cleaned.length >= 3) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      } else {
        formattedValue = cleaned;
      }
    } else if (name === "cvv") {
      // 3 or 4 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Validation
    if (cartItems.length === 0) {
      toast.error("Your cart is empty! Add items before placing an order.");
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.street.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zipcode.trim() ||
      !formData.phone.trim()
    ) {
      toast.error("Please fill in all required delivery fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone validation
    if (formData.phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    // Specific Payment Validations
    if (paymentCategory === "upi" && upiSubMethod === "vpa") {
      if (!upiId.trim() || !upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID (e.g. yourname@upi).");
        return;
      }
    }

    if (paymentCategory === "card") {
      const cleanCard = cardDetails.cardNumber.replace(/\s/g, "");
      if (cleanCard.length < 16) {
        toast.error("Please enter a valid 16-digit card number.");
        return;
      }
      if (!cardDetails.cardName.trim()) {
        toast.error("Please enter the name on your card.");
        return;
      }
      if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
        toast.error("Please enter a valid expiration date (MM/YY).");
        return;
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        toast.error("Please enter a valid CVV.");
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      setIsSubmitting(false);
      const paymentSummary =
        paymentCategory === "upi"
          ? `UPI (${upiSubMethod.toUpperCase()})`
          : paymentCategory === "card"
            ? `Card (${selectedCardNetwork.toUpperCase()})`
            : paymentCategory.toUpperCase();

      toast.success(
        `🎉 Order Placed Successfully via ${paymentSummary}! Order ID: #ORD-${Math.floor(
          100000 + Math.random() * 900000
        )}`
      );
      navigate("/order");
    }, 1200);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50/60 pb-16 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb / Back button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <NavLink to="/cart" className="hover:text-black transition flex items-center gap-1">
                ← Back to Cart
              </NavLink>
              <span>/</span>
              <span className="text-black font-medium">Checkout</span>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              SSL 256-bit Encrypted
            </span>
          </div>

          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">

              {/* ======================================================== */}
              {/* SECTION 1: DELIVERY INFORMATION (LEFT - 7 COLS) */}
              {/* ======================================================== */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200">

                {/* Section Title */}
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                      1
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-gray-900 flex items-center gap-2">
                      <span>Delivery</span>
                      <span className="text-gray-400 font-light">Information</span>
                      <span className="w-10 h-[2px] bg-black ml-2 inline-block"></span>
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 ml-10">
                    Enter the shipping address where you'd like your order delivered.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="johndoe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Street Address / Flat / Building <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="street"
                      placeholder="Flat 402, High Street, Near Landmark"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                    />
                  </div>

                  {/* City & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Zipcode & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Pin Code / Zipcode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipcode"
                        placeholder="400001"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 bg-gray-100"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-500 text-sm font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm text-gray-800 placeholder-gray-400 bg-gray-50/30 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Save address checkbox */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                      />
                      <span>Save this delivery address for future orders</span>
                    </label>
                  </div>

                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 2: CART TOTAL & PAYMENT METHODS (RIGHT - 5 COLS) */}
              {/* ======================================================== */}
              <div className="lg:col-span-5 space-y-6">

                {/* 1. CART TOTAL BOX */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-200">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                        2
                      </span>
                      <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 flex items-center gap-2">
                        <span>Cart</span>
                        <span className="text-gray-400 font-light">Total</span>
                        <span className="w-8 h-[2px] bg-black ml-1 inline-block"></span>
                      </h2>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                      {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  {/* Items Preview List (Collapsible / Compact) */}
                  {cartItems.length > 0 ? (
                    <div className="max-h-44 overflow-y-auto divide-y divide-gray-100 mb-4 pr-1 scrollbar-thin">
                      {cartItems.map((item, idx) => {
                        const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;
                        return (
                          <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                              <img
                                src={imgSrc}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-md border border-gray-100 bg-gray-50"
                              />
                              <div className="leading-tight">
                                <p className="font-medium text-gray-900 truncate max-w-[160px] sm:max-w-[200px]">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Size: <span className="font-semibold text-gray-700">{item.size || "M"}</span> × {item.quantity || 1}
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-800">
                              ₹{(item.price || 0) * (item.quantity || 1)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-sm text-gray-400 bg-gray-50 rounded-lg mb-4">
                      Your cart is empty.
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-2.5 text-sm text-gray-600 border-t border-gray-100 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5">
                        Delivery / Shipping Fee
                        {subtotal > 0 && deliveryFee === 0 && (
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                            FREE
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-gray-900">₹{deliveryFee}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3.5 flex justify-between items-center text-base font-bold text-gray-900">
                      <span>Grand Total</span>
                      <span className="text-xl text-black">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                {/* 2. PAYMENT METHODS SECTION */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-200">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                      3
                    </span>
                    <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 flex items-center gap-2">
                      <span>Payment</span>
                      <span className="text-gray-400 font-light">Method</span>
                      <span className="w-8 h-[2px] bg-black ml-1 inline-block"></span>
                    </h2>
                  </div>

                  <div className="space-y-3.5">

                    {/* OPTION A: UPI (Google Pay, PhonePe, Paytm, etc.) */}
                    <div
                      className={`border rounded-xl p-4 transition cursor-pointer ${paymentCategory === "upi"
                        ? "border-black bg-gray-50/80 shadow-xs ring-1 ring-black"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      onClick={() => setPaymentCategory("upi")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentCategory === "upi"}
                            onChange={() => setPaymentCategory("upi")}
                            className="w-4 h-4 text-black accent-black focus:ring-black"
                          />
                          <div>
                            <span className="font-bold text-gray-900 text-sm flex items-center gap-2">
                              UPI
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                Instant & Free
                              </span>
                            </span>
                            <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm & any UPI app</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UpiIcon />
                        </div>
                      </div>

                      {/* Sub-options when UPI is selected */}
                      {paymentCategory === "upi" && (
                        <div
                          className="mt-4 pt-3.5 border-t border-gray-200/80 space-y-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="text-xs font-semibold text-gray-700">Select your UPI App or enter UPI ID:</p>

                          {/* App Selection Grid */}
                          <div className="grid grid-cols-3 gap-2.5">
                            {/* Google Pay */}
                            <button
                              type="button"
                              onClick={() => setUpiSubMethod("gpay")}
                              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition ${upiSubMethod === "gpay"
                                ? "border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-500 shadow-xs"
                                : "border-gray-200 hover:bg-gray-50 text-gray-700 bg-white"
                                }`}
                            >
                              <GooglePayIcon />
                              <span className="mt-1">Google Pay</span>
                            </button>

                            {/* PhonePe */}
                            <button
                              type="button"
                              onClick={() => setUpiSubMethod("phonepe")}
                              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition ${upiSubMethod === "phonepe"
                                ? "border-purple-600 bg-purple-50/60 text-purple-900 ring-1 ring-purple-500 shadow-xs"
                                : "border-gray-200 hover:bg-gray-50 text-gray-700 bg-white"
                                }`}
                            >
                              <PhonePeIcon />
                              <span className="mt-1">PhonePe</span>
                            </button>

                            {/* Paytm */}
                            <button
                              type="button"
                              onClick={() => setUpiSubMethod("paytm")}
                              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition ${upiSubMethod === "paytm"
                                ? "border-sky-600 bg-sky-50/60 text-sky-900 ring-1 ring-sky-500 shadow-xs"
                                : "border-gray-200 hover:bg-gray-50 text-gray-700 bg-white"
                                }`}
                            >
                              <PaytmIcon />
                              <span className="mt-1">Paytm</span>
                            </button>
                          </div>

                          {/* Custom UPI ID / VPA Tab Button & Input */}
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => setUpiSubMethod("vpa")}
                              className={`text-xs font-medium underline block mb-1.5 transition ${upiSubMethod === "vpa" ? "text-black font-bold" : "text-gray-500 hover:text-black"
                                }`}
                            >
                              + Or pay using other UPI ID / VPA
                            </button>

                            {upiSubMethod === "vpa" && (
                              <div className="flex gap-2 mt-2">
                                <input
                                  type="text"
                                  placeholder="e.g. yourname@okhdfcbank"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-300 focus:border-black outline-none bg-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (upiId.includes("@")) {
                                      toast.success("UPI ID verified successfully!");
                                    } else {
                                      toast.warn("Please enter a valid format like name@bank");
                                    }
                                  }}
                                  className="px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition"
                                >
                                  Verify
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* OPTION B: DEBIT / CREDIT CARD (Visa, Mastercard, RuPay) */}
                    <div
                      className={`border rounded-xl p-4 transition cursor-pointer ${paymentCategory === "card"
                        ? "border-black bg-gray-50/80 shadow-xs ring-1 ring-black"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      onClick={() => setPaymentCategory("card")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentCategory === "card"}
                            onChange={() => setPaymentCategory("card")}
                            className="w-4 h-4 text-black accent-black focus:ring-black"
                          />
                          <div>
                            <span className="font-bold text-gray-900 text-sm">
                              Debit / Credit Card
                            </span>
                            <p className="text-xs text-gray-500">Visa, Mastercard, RuPay cards supported</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <VisaIcon />
                          <MastercardIcon />
                          <RuPayIcon />
                        </div>
                      </div>

                      {/* Card Details Form when Card is selected */}
                      {paymentCategory === "card" && (
                        <div
                          className="mt-4 pt-3.5 border-t border-gray-200/80 space-y-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span className="font-semibold text-gray-700">Supported Networks:</span>
                            <div className="flex gap-2">
                              {["visa", "mastercard", "rupay"].map((net) => (
                                <button
                                  key={net}
                                  type="button"
                                  onClick={() => setSelectedCardNetwork(net)}
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase transition ${selectedCardNetwork === net
                                    ? "bg-black text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                  {net}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Card Number */}
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                              Card Number
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cardNumber"
                                placeholder="4532 •••• •••• 8890"
                                maxLength={19}
                                value={cardDetails.cardNumber}
                                onChange={handleCardChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none text-xs bg-white tracking-widest font-mono"
                              />
                              <span className="absolute right-3 top-2.5 text-[10px] font-bold uppercase text-gray-400">
                                {selectedCardNetwork}
                              </span>
                            </div>
                          </div>

                          {/* Name on Card */}
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              name="cardName"
                              placeholder="Name as printed on card"
                              value={cardDetails.cardName}
                              onChange={handleCardChange}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none text-xs bg-white"
                            />
                          </div>

                          {/* Expiry & CVV */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                maxLength={5}
                                value={cardDetails.expiry}
                                onChange={handleCardChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none text-xs bg-white font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                CVV / CVC
                              </label>
                              <input
                                type="password"
                                name="cvv"
                                placeholder="•••"
                                maxLength={4}
                                value={cardDetails.cvv}
                                onChange={handleCardChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none text-xs bg-white font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* OPTION C: CASH ON DELIVERY */}
                    <div
                      className={`border rounded-xl p-4 transition cursor-pointer ${paymentCategory === "cod"
                        ? "border-black bg-gray-50/80 shadow-xs ring-1 ring-black"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      onClick={() => setPaymentCategory("cod")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentCategory === "cod"}
                            onChange={() => setPaymentCategory("cod")}
                            className="w-4 h-4 text-black accent-black focus:ring-black"
                          />
                          <div>
                            <span className="font-bold text-gray-900 text-sm">
                              Cash on Delivery (COD)
                            </span>
                            <p className="text-xs text-gray-500">Pay in cash or UPI at the time of delivery</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded">
                          💵 Cash
                        </span>
                      </div>
                    </div>

                    {/* OPTION D: RAZORPAY / STRIPE (Alternative Gateway) */}
                    <div
                      className={`border rounded-xl p-4 transition cursor-pointer ${paymentCategory === "razorpay"
                        ? "border-black bg-gray-50/80 shadow-xs ring-1 ring-black"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      onClick={() => setPaymentCategory("razorpay")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentCategory === "razorpay"}
                            onChange={() => setPaymentCategory("razorpay")}
                            className="w-4 h-4 text-black accent-black focus:ring-black"
                          />
                          <div>
                            <span className="font-bold text-gray-900 text-sm">
                              Razorpay / Net Banking
                            </span>
                            <p className="text-xs text-gray-500">Net banking, Wallets & International options</p>
                          </div>
                        </div>
                        <img
                          src={assets.razorpay_logo}
                          alt="Razorpay"
                          className="h-5 object-contain"
                        />
                      </div>
                    </div>

                  </div>

                  {/* PLACE ORDER BUTTON */}
                  <div className="mt-6 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || cartItems.length === 0}
                      className={`w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${cartItems.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : isSubmitting
                          ? "bg-gray-800 text-white cursor-wait opacity-90"
                          : "bg-black text-white hover:bg-gray-900 active:scale-[0.99] hover:shadow-lg"
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          <span>Processing Order...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Order • ₹{grandTotal}</span>
                          <span className="text-base">→</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1">
                      🔒 Guaranteed Safe & Secure Checkout
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </form>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrder;