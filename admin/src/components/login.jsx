import React, { useState } from 'react'
import { backendUrl } from '../App.jsx'
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js'
const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/auth/admin/login', { email, password });
      if (response.data.success) {
        setToken(response.data.token)
        toast.success("Login Successful!")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Please enter your credentials to login</p>
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-800 text-sm placeholder-gray-400 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-800 text-sm placeholder-gray-400 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-lg transition-all duration-200 active:scale-[0.99] shadow-sm shadow-purple-200 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
