import React from 'react'

import { products, assets } from '../assets/assets.js'
import Product from '../components/product.jsx'
import { NavLink } from 'react-router-dom'
import Footer from '../components/footer.jsx'
const AllCollection = () => {
   const data = products || []

   return (
      <>
         <main className="container mx-auto px-2 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 ml-2 mb-6">
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
                  <img src={assets.hero_img} alt="Shop hero" className="w-full h-48 lg:h-56 object-cover rounded-md shadow-sm" />
               </div>
            </div>



         <div className="flex flex-col md:flex-row gap-6 mb-6 container mx-auto px-4 pb-12">
            <aside className="w-full md:w-64 bg-white border border-gray-100 rounded-md p-4 space-y-4">
               <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-800">Filter</h2>

               <div className="space-y-3">
                  <div className="border border-gray-300 rounded-sm p-3">
                     <h3 className="text-xs font-bold uppercase text-gray-700 mb-2">Categories</h3>
                     <div className="flex flex-col gap-2 text-sm text-gray-600">
                        <label className="inline-flex items-center gap-2">
                           <input type="checkbox" name="category" value="Men" className="h-4 w-4 text-black border-gray-300 rounded" />
                           <span>Men</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                           <input type="checkbox" name="category" value="Women" className="h-4 w-4 text-black border-gray-300 rounded" />
                           <span>Women</span>
                        </label>
                     </div>
                  </div>

                  <div className="border border-gray-300 rounded-sm p-3">
                     <h3 className="text-xs font-bold uppercase text-gray-700 mb-2">Sizes</h3>
                     <div className="flex flex-col gap-2 text-sm text-gray-600">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                           <label key={size} className="inline-flex items-center gap-2">
                              <input type="checkbox" name="size" value={size} className="h-4 w-4 text-black border-gray-300 rounded" />
                              <span>{size}</span>
                           </label>
                        ))}
                     </div>
                  </div>
               </div>
            </aside>

            <section className="flex-1">
               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data.map((item) => (
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
