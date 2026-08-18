import React from "react";
import Footer from "../components/footer";
import contact from "../assets/contact_us.jpg";
import { NavLink } from "react-router-dom";
import FollowUs from "../components/FollowUs";
const Contact = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="relative my-10 h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={contact}
            alt="Contact us"
            className="w-full  h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Heading */}
          <h1 className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-white">
            CONTACT US
          </h1>

          <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
            <NavLink to="/" className="hover:underline text-lg lg:text-2xl ">
              Home
            </NavLink>
            <span className="mx-2 text-gray-400         text-lg lg:text-2xl">
              /
            </span>
            <NavLink
              to="/Contact"
              className="text-gray-400  text-lg lg:text-2xl"
            >
              Contact
            </NavLink>
          </nav>
        </div>
<div>
  
  <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
<div className="flex flex-col md:flex-row gap-6 mb-6">
  <p className="mb-4">
    <strong>Address:</strong> 123 Main Street, City, State, Country
  </p>
  <p className="mb-4">
    <strong>Phone:</strong> (123) 456-7890
    </p>
  <p className="mb-4">
    <strong>Email:</strong> <NavLink to="mailto:9z6fQ@example.com">9z6fQ@example.com</NavLink>
    </p>
</div>
</div>

{/* getInTouch */}
<section className="max-w-3xl mx-auto px-4 py-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-2">
    Get in Touch
  </h2>

  <p className="text-gray-600 mb-8">
    Have a question or need help? We'd love to hear from you.
  </p>

  <form className="space-y-6">

    {/* Name */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input
          type="text"
          placeholder="Enter your first name"
          className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Enter your last name"
          className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black"
        />
      </div>
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email
      </label>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black"
      />
    </div>

    {/* Subject */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Subject
      </label>
      <input
        type="text"
        placeholder="What is your message about?"
        className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black"
      />
    </div>

    {/* Message */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Message
      </label>
      <textarea
        rows="6"
        placeholder="Write your message..."
        className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black resize-none"
      ></textarea>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full sm:w-auto px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
    >
      Send Message
    </button>

  </form>
</section>
<FollowUs/>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
