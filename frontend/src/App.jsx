import './index.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import AllCollection from './pages/allCollection.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Cart from './pages/cart.jsx'
import Product from './pages/product.jsx'
import Login from './pages/login.jsx'
import PlaceOrder from './pages/placeOrder.jsx'
import Orders from './pages/order.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<AllCollection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order' element={<Orders />} />
      </Routes>
    </>
  )
}

export default App
