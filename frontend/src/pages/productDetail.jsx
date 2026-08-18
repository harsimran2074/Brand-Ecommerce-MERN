import React from 'react'
import {products} from '../assets/assets.js'
import star from '../assets/star_icon.png'
import dullStar from '../assets/star_dull_icon.png'
const ProductDetail = () => {
const data = products;

  return (
    <><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

    <div className="bg-gray-50">
      <img
        src={data[0].image}
        alt={data[0].name}
        className="w-full h-full max-h-[650px] object-cover"
      />
    </div>

    <div className="flex flex-col justify-center">

      <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
        T-Shirt
      </p>

      <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900">
        {data[0].name}
      </h1>

      <div className="flex items-center gap-2 mt-4">
        <div className="flex items-center gap-1">
          <img src={star} className="w-5 h-5" />
          <img src={star} className="w-5 h-5" />
          <img src={star} className="w-5 h-5" />
          <img src={star} className="w-5 h-5" />
          <img src={star} className="w-5 h-5" />
        </div>

        <span className="text-sm text-gray-500">
          (200 Reviews)
        </span>
      </div>

      <div className="mt-6">
        <p className="text-2xl font-semibold text-gray-900">
          ${data[0].price}
        </p>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      <p className="text-gray-600 leading-7">
        {data[0].description}
      </p>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">
            Select Size
          </h3>

          <button className="text-sm text-gray-500 underline">
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {data[0].sizes.map((item) => (
            <button
              key={item}
              className="min-w-14 px-5 py-3 border border-gray-300 text-sm hover:border-black transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button className="mt-8 w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition">
        Add to Cart
      </button>

      <div className="mt-6 space-y-3 text-sm text-gray-500">
        <p>✓ Secure payment</p>
        <p>✓ Fast delivery</p>
        <p>✓ Easy returns</p>
      </div>

    </div>
  </div>
</div>
    </>
  )
}

export default ProductDetail;