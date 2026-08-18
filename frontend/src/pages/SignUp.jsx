import React from 'react'
import Footer from '../components/footer'
import { NavLink } from 'react-router-dom'
const SignUp = () => {
  return (
   <>
   
    <div className="h-120 flex items-start justify-center pt-14 px-4">
      <div className="w-full max-w-md">

        <h1 className="text-center text-4xl font-serif text-gray-900 mb-8">
          Sign Up
        </h1>

        <form className="space-y-4">

          <input
            type="name"
            placeholder="name"
            className="w-full h-12 border border-gray-800 px-4 text-base outline-none placeholder:text-gray-400 focus:border-black"
          />

          <input
            type="email"
            placeholder="email"
            className="w-full h-12 border border-gray-800 px-4 text-base outline-none placeholder:text-gray-400 focus:border-black"
          />

          <input
            type="password"
            placeholder="password"
            className="w-full h-12 border border-gray-800 px-4 text-base outline-none placeholder:text-gray-400 focus:border-black"
          />

          <div className="flex items-center justify-between text-sm pt-1">
            <NavLink
              to="/forgot-password"
              className="text-gray-900 hover:underline"
            >
              Forgot your password?
            </NavLink>

            <NavLink
              to="/Login"
              className="text-gray-900 hover:underline"
            >
              Login
            </NavLink>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-black text-white px-9 py-3 min-w-32 hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>
    <Footer/>
   </>
  )
}

export default SignUp