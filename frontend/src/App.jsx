import './index.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import AllCollection from './pages/allCollection.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Cart from './pages/cart.jsx'
import ProductDetail from './pages/productDetail.jsx'
import Login from './pages/login.jsx'
import PlaceOrder from './pages/placeOrder.jsx'
import Orders from './pages/order.jsx'
import SignUp from './pages/SignUp.jsx'
import Search from './components/search.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/slices.jsx";
import { useState } from 'react'
function App() {
  const [token, setToken] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<AllCollection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
        <Route path='/Login' element={<Login setToken={setToken} />} />
        <Route path='/SignUp' element={<SignUp setToken={setToken} />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order' element={<Orders />} />
      </Routes>
    </>
  )
}

export default App
