import React, { useState } from 'react'
import Footer from '../components/footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import loginImg from '../assets/login.png'
import { assets } from '../assets/assets'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

const Login = ({ setToken }) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error("Please fill all the fields")
    }
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password })

      if (response.data.success) {
        toast.success(response.data.msg)
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        setLoading(false)
        navigate('/')
      } else {
        toast.error(response.data.msg)
        setLoading(false)
      }
    } catch (err) {
      console.error("[Login Page - User Login Error]:", err.response?.data?.msg || err.message);
      setLoading(false)
      toast.error(err.response?.data?.msg || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f8] flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* Left Column: Form Container */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">

            {/* Brand Logo */}
            <div className="mb-6">
              <img src={assets.logo} alt="Logo" className="w-28 object-contain" />
            </div>

            {/* Title & Subtitle */}
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back !
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                Enter to get unlimited access to data & information.
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your mail address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-4 w-4" />
                    ) : (
                      <FiEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>

                <NavLink
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition"
                >
                  Forgot your password ?
                </NavLink>
              </div>

              {/* Log In Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 active:scale-[0.99] transition duration-150 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <span>Log In</span>
                  )}
                </button>
              </div>

              {/* Or Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider shrink-0">
                  Or, Login with
                </span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => toast.info("Google login coming soon")}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition active:scale-[0.99] cursor-pointer"
              >
                <FcGoogle className="h-4 w-4" />
                <span>Sign up with google</span>
              </button>

              {/* Register link */}
              <p className="text-center text-xs text-slate-600 pt-2">
                Don't have an account ?{" "}
                <NavLink
                  to="/SignUp"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Register here
                </NavLink>
              </p>

            </form>
          </div>

          {/* Right Column: Visual Artwork */}
          <div className="hidden md:block relative bg-[#1c1444] overflow-hidden min-h-[560px]">
            <img
              src={loginImg}
              alt="Login Visual"
              className="w-full h-full object-cover object-center"
            />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login