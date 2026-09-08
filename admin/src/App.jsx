import React, { useState, useEffect } from 'react'
import SideBar from './components/sidebar.jsx'
import Navbar from './components/navbar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/add.jsx'
import List from './pages/list.jsx'
import Order from './pages/order.jsx'
import Login from './components/login.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// get the backend url
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || "")

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token)
    } else {
      localStorage.removeItem('adminToken')
    }
  }, [token])

  return (
    <>
      <ToastContainer />
      {!token ? (
        <Routes>
          <Route path='*' element={<Login setToken={setToken} />} />
        </Routes>
      ) : (
        <div className="bg-gray-50/50 min-h-screen">
          <Navbar setToken={setToken} />
          <hr className="border-gray-200" />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path='/' element={<Navigate to="/add" replace />} />
                <Route path='/admin' element={<Navigate to="/add" replace />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/order' element={<Order token={token} />} />
                <Route path='*' element={<Navigate to="/add" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
