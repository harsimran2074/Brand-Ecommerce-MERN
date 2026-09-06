import React from 'react'
import Footer from '../components/footer'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/loader'
const Login = ({ setToken }) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      setLoading(false)
      console.log(err)
      toast.error(err.response?.data?.msg || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (


    <>
      {loading ? <Loader /> :
        <div className="h-100 flex items-start justify-center pt-14 px-4">
          <div className="w-full max-w-md">

            <h1 className="text-center text-4xl font-serif text-gray-900 mb-8">
              Login
            </h1>

            <form className="space-y-4" onSubmit={(e) => onSubmitHandler(e)}>

              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border border-gray-800 px-4 text-base outline-none placeholder:text-gray-400 focus:border-black"
              />

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
                  to="/SignUp"
                  className="text-gray-900 hover:underline"
                >
                  Create account
                </NavLink>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-black text-white px-9 py-3 min-w-32 hover:bg-gray-800 transition"
                >
                  Login here
                </button>
              </div>

            </form>
          </div>
        </div>
      }
      <Footer />
    </>
  )
}

export default Login