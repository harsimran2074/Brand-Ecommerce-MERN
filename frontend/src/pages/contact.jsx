import React, { useState } from "react";
import { toast } from "react-toastify";
import contactImg from "../assets/contact_img.png";
import Footer from "../components/footer";
import FollowUs from "../components/FollowUs";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiMessageSquare,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-800 antialiased font-sans">
      
      {/* Dark Contrast Hero Header */}
      <section className="relative bg-slate-950 text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Customer Care & Inquiries
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            CONTACT US <span className="text-indigo-400 font-light">___</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Have questions about an order, sizing, or styling advice? We are here to assist you at every step.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* 3 Contact Metric Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phone */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all duration-200">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
              <FiPhone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Direct Phone
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Available Mon - Sat (9am - 8pm IST)
            </p>
            <a
              href="tel:+919416581398"
              className="inline-block text-base font-bold text-slate-900 hover:text-indigo-600 mt-2 transition"
            >
              +91 94165 81398
            </a>
          </div>

          {/* Email */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all duration-200">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
              <FiMail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Email Support
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Average response time: within 2 hours
            </p>
            <a
              href="mailto:harsimran2074handa@gmail.com"
              className="inline-block text-sm sm:text-base font-bold text-slate-900 hover:text-indigo-600 mt-2 break-all transition"
            >
              harsimran2074handa@gmail.com
            </a>
          </div>

          {/* Support Guarantee */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-sm transition-all duration-200">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
              <FiClock className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Live Assistance
              </h3>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Fast resolution for all customer queries
            </p>
            <p className="text-sm sm:text-base font-bold text-slate-900 mt-2">
              24/7 Order Support
            </p>
          </div>

        </section>

        {/* 2-Column Split: Form (Left) & Brand Overview (Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Direct Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill in the form below and we will get back to you promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. John"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inquiry Type
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Tracking">Order Tracking & Delivery</option>
                  <option value="Size & Fit">Size & Fit Guidance</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Bulk Order">Bulk / Wholesale Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message or order question here..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-black text-white text-sm font-semibold shadow-md active:scale-[0.99] transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Featured Brand Image & Support Commitment (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Photo Card */}
            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
              <img
                src={contactImg}
                alt="Brand Support"
                className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Always Here For You
                  </span>
                  <p className="text-white text-base font-bold">
                    Dedicated Support & Seamless Assistance
                  </p>
                </div>
              </div>
            </div>

            {/* Support Commitments Box */}
            <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FiShield className="text-indigo-400" />
                Our Service Promise
              </h3>
              
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-emerald-400 w-4 h-4 shrink-0 mt-0.5" />
                  <span>Prompt resolution for sizing, returns, or order status.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-emerald-400 w-4 h-4 shrink-0 mt-0.5" />
                  <span>Direct phone & email support from real customer specialists.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-emerald-400 w-4 h-4 shrink-0 mt-0.5" />
                  <span>100% confidential and encrypted communication.</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* Social Community Section */}
        <FollowUs />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
