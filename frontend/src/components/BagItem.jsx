import React from 'react'

import { RiDeleteBin6Line } from "react-icons/ri";

const BagItem = ({data}) => {

  return (
   <div className="container">

      <div className="flex gap-5 border-t border-gray-400 py-6">
  {/* Product Image */}
  <div className="w-28 h-32 bg-gray-100 shrink-0">
    <img
      src={data.image}
      alt={data.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Product Info */}
  <div className="flex flex-1 flex-col justify-between">
    <div>
      <h2 className="text-base font-medium text-gray-900">
        {data.name}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Size: M
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Color: Black
      </p>
    </div>

    <div className="flex items-center justify-between mt-4">
      {/* Quantity */}
      <div className="flex items-center border border-gray-300">
        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
          −
        </button>

        <span className="px-4 py-1 text-sm">
          1
        </span>

        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
          +
        </button>
      </div>

      {/* Remove */}
      <button className="text-sm text-gray-500 underline hover:text-black">
      <RiDeleteBin6Line size={25}/>
      </button>
    </div>
  </div>

  {/* Price */}
  <div className="text-right">
    <p className="text-base font-medium">
      {`${data.price}$`}
    </p>

    <p className="mt-2 text-xs text-gray-500">
      Delivery by 24–27 Aug
    </p>
  </div>
</div>
   </div>
  )
}

export default BagItem