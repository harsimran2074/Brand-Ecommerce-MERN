import React from 'react'

const Product = ({ item }) => {
  const data = item || {}
  const img = Array.isArray(data.image) ? data.image[0] : data.image

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="w-full h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img src={img} alt={data.name} className="w-full h-full object-contain" />
      </div>
      <div className="p-4">
        <div className="text-sm font-medium text-gray-900 truncate">{data.name}</div>
        <div className="mt-2 text-sm text-gray-500 truncate">{data.description}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">{`${data.price}$`}</div>
        </div>
      </div>

      <div className="px-4 pb-4 mt-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <button
            type="button"
            className="w-full sm:flex-1 inline-flex items-center justify-center h-10 px-4 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 whitespace-nowrap overflow-hidden truncate"
            aria-label={`Add ${data.name} to cart`}
          >
            Add to cart
          </button>

          <button
            type="button"
            className="w-full sm:flex-1 inline-flex items-center justify-center h-10 px-4 bg-white border border-gray-200 text-sm text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 whitespace-nowrap overflow-hidden truncate"
            aria-label={`View details for ${data.name}`}
          >
            View details
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
