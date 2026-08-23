import React from 'react'

import { products, assets } from '../assets/assets.js'
import Product from '../components/product.jsx'
import { NavLink } from 'react-router-dom'
import Footer from '../components/footer.jsx'
import Filter from '../components/filter.jsx'
import { useDispatch, useSelector } from 'react-redux'
const AllCollection = () => {

   const data = useSelector((store) => store.allItemSlice);

   // const data = products || []
   return (
      <>
         <main className="container mx-auto px-2 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 ml-5 mb-6">
               <section className="max-w-2xl">
                  <nav className="text-sm text-gray-500 mb-2">
                     <NavLink to="/" className="hover:underline text-lg lg:text-2xl ">Home</NavLink>
                     <span className="mx-2 text-gray-400         text-lg lg:text-2xl">/</span>
                     <NavLink to="/collection" className="text-gray-700  text-lg lg:text-2xl">Collection</NavLink>
                  </nav>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">SHOP ALL</h1>
                  <p className="mt-3 text-gray-600">Browse our complete collection of premium clothes — curated picks for every season.</p>

               </section>

               <div className="hidden md:block w-1/3">
                  <img src={assets.contact_img} alt="Shop hero" className="w-full h-48 lg:h-56 object-cover rounded-md shadow-sm" />
               </div>
            </div>



         <div className="flex flex-col md:flex-row gap-6 mb-6 container mx-auto px-4 pb-12">
          <Filter/>

            <section className="flex-1">
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data?.map((item) => (
                     <div key={item._id}>
                        <Product item={item} />
                     </div>
                  ))}
               </div>
            </section>
         </div>
         </main>
         
         <Footer />
      </>
   )
}

export default AllCollection
