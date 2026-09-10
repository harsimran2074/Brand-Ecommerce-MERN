import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Footer from "../components/footer";
import { clearCart, selectBagSummary } from "../redux/slices";

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.bagItemSlice.cartData);
  const { subtotal = 0, deliveryFee = 0, total = 0 } = useSelector(selectBagSummary) || {};
  const products = useSelector((state) => state.allItemSlice.products);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Controlled address state stored in a single useState object
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Payment method selection state ('razorpay' | 'cod')
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  // Derive order items from cart and products
  const orderItems = useMemo(() => {
    const itemsList = [];
    if (!products || products.length === 0 || !cartItems) return itemsList;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            const itemInfo = structuredClone(product);
            itemInfo.size = size;
            itemInfo.quantity = cartItems[itemId][size];

            //extracting image from product
            const productImages = product?.images || product?.image || data?.images || data?.image;
            const imageSrc = Array.isArray(productImages) ? productImages[0] : productImages;

            itemInfo.image = imageSrc;
            itemsList.push(itemInfo);
          }
        }
      }
    }
    return itemsList;
  }, [cartItems, products]);

  // Handle address input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Razorpay Payment Initialization Handler
  const initPay = (order, razorpayKey) => {
    const key = razorpayKey || import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key) {
      toast.error("Razorpay Key is missing. Please restart your frontend server or verify environment variables.");
      return;
    }
    const options = {
      key: key,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            dispatch(clearCart());
            toast.success("Payment successful! Order placed.");
            navigate("/order");
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("[PlaceOrder - Razorpay Verification Error]:", error.message);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle form submission / action
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const orderData = {
        address: address,
        items: orderItems,
        amount: total,
      };
      switch (paymentMethod) {
        // API Calls for COD
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            dispatch(clearCart());
            toast.success("Order placed successfully");
            navigate("/order");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "razorpay": {
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order, responseRazorpay.data.key);
          } else {
            const errorMsg =
              typeof responseRazorpay.data.message === "string"
                ? responseRazorpay.data.message
                : responseRazorpay.data.message?.error?.description ||
                responseRazorpay.data.message?.description ||
                "Payment initialization failed";
            toast.error(errorMsg);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error("[PlaceOrder - Order Placement Error]:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased">
      {/* Top Banner / Header */}
      <div className="border-b border-slate-200/80 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400 uppercase">
                <span>Home</span>
                <span>/</span>
                <span>Cart</span>
                <span>/</span>
                <span className="text-slate-900">Checkout</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Secure Checkout
              </h1>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-700 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              256-Bit SSL Encrypted
            </div>
          </div>
        </div>
      </div>

      {/* Main Checkout Section */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* LEFT COLUMN: Delivery & Payment Details (7 cols) */}
          <div className="space-y-8 lg:col-span-7">

            {/* Step 1: Delivery Address */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    1
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Delivery Address
                    </h2>
                    <p className="text-xs text-slate-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* First Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={address.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. John"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={address.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Doe"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={address.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      Street Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleInputChange}
                      placeholder="Flat / House No., Apartment, Street, Landmark"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Maharashtra"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-700 uppercase">
                      Pincode / ZIP Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit postal code"
                      maxLength={6}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-black focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all">
              <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    2
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Payment Method
                    </h2>
                    <p className="text-xs text-slate-500">
                      Select how you would like to pay
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 p-6">

                {/* Razorpay Option */}
                <label
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`group relative flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-200 ${paymentMethod === "razorpay"
                    ? "border-slate-900 bg-slate-50/60 shadow-sm ring-1 ring-slate-900"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Custom Radio Button */}
                    <div
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-all ${paymentMethod === "razorpay"
                        ? "border-slate-900 bg-slate-900"
                        : "border-slate-300 group-hover:border-slate-400"
                        }`}
                    >
                      {paymentMethod === "razorpay" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          Razorpay Secure
                        </span>
                        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                          Instant
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay with UPI, Credit/Debit Cards, NetBanking or Wallets
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <img
                      src={assets.razorpay_logo}
                      alt="Razorpay"
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                {/* <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`group relative flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-200 ${paymentMethod === "cod"
                    ? "border-slate-900 bg-slate-50/60 shadow-sm ring-1 ring-slate-900"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Custom Radio Button */}
                {/* <div
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-all ${paymentMethod === "cod"
                        ? "border-slate-900 bg-slate-900"
                        : "border-slate-300 group-hover:border-slate-400"
                        }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          Cash on Delivery (COD)
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                          Pay at Doorstep
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay with cash or UPI when your package arrives
                      </p>
                    </div>
                  </div>

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </label>  */}

              </div>
            </div>

            {/* Trust & Guarantee Badges */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Secure Payment</h4>
                  <p className="text-[11px] text-slate-500">100% encrypted & safe</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Easy Returns</h4>
                  <p className="text-[11px] text-slate-500">7-day hassle-free policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">100% Authentic</h4>
                  <p className="text-[11px] text-slate-500">Directly from brand</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary & Action (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">

              <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">

                {/* Summary Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4.5">
                  <h2 className="text-base font-semibold text-slate-900">
                    Order Summary
                  </h2>
                  <span className="rounded-full bg-slate-200/70 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {orderItems.length} items
                  </span>
                </div>

                {/* Items Preview List */}
                {orderItems.length === 0 ? (
                  <div className="px-6 py-8 text-center text-sm text-slate-500">
                    Your cart is empty.
                  </div>
                ) : (
                  <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto px-6 py-2">
                    {orderItems.map((item, index) => (
                      <div key={`${item._id}-${item.size}-${index}`} className="flex items-center gap-4 py-4">
                        {/* Product Thumbnail */}
                        <div className="relative h-18 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                          <span className="absolute right-1 bottom-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-black/80 text-[10px] font-bold text-white shadow">
                            {item.quantity}
                          </span>
                        </div>

                        {/* Product Info */}
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-medium text-slate-800">
                            {item.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-700">
                              Size: {item.size}
                            </span>
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-semibold text-slate-900">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="border-t border-slate-100 bg-slate-50/40 px-6 py-5">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-slate-900">₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Charges</span>
                      <span className="font-medium text-slate-900">₹{deliveryFee}</span>
                    </div>

                    <div className="border-t border-slate-200/80 pt-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-base font-bold text-slate-900">Total Amount</span>
                          <p className="text-[11px] text-slate-400">Includes all taxes</p>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                          ₹{total}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic CTA Button */}
                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-medium tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow active:scale-[0.99]"
                  >
                    <span>
                      {paymentMethod === "razorpay"
                        ? "Continue to Payment"
                        : "Place Order"}
                    </span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>

                  <p className="mt-3.5 text-center text-[11px] text-slate-400">
                    By placing your order, you agree to our Terms and Privacy Policy.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PlaceOrder;